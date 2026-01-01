import os
import json
import re
from typing import List, Optional, Any, Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits import create_sql_agent
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import sqlalchemy
from sqlalchemy import text
import pymongo
from pymongo import MongoClient
import datetime
from decimal import Decimal

load_dotenv()

app = FastAPI(title="Universal Text-to-SQL/NoSQL API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_instance = None
mongo_client = None
mongo_db_name = None
agent_executor = None
current_dialect = "postgresql" 

CONNECTION_EXAMPLES = {
    "PostgreSQL": "postgres://user:password@localhost:5432/dbname",
    "MySQL": "mysql://user:password@localhost:3306/dbname",
    "MariaDB": "mariadb://user:password@localhost:3306/dbname",
    "Oracle": "oracle://user:password@localhost:1521/service_name",
    "SQL Server": "mssql://user:password@localhost:1433/dbname",
    "MongoDB (Standard)": "mongodb://user:password@localhost:27017/dbname",
    "MongoDB (Atlas)": "mongodb+srv://user:password@cluster0.abcde.mongodb.net/dbname?retryWrites=true&w=majority"
}

class ConnectRequest(BaseModel):
    connection_string: str

class QueryRequest(BaseModel):
    text: str

class QueryResponse(BaseModel):
    answer: str
    sql_query: Optional[str] = None 
    data: Optional[List[Dict[str, Any]]] = None
    chart_config: Optional[Dict[str, Any]] = None

def get_mongo_schema(client, db_name):
    """Infers a simple schema from MongoDB by taking a sample document from each collection."""
    db = client[db_name]
    schema_info = []
    for collection_name in db.list_collection_names():
        # Skip system collections
        if collection_name.startswith("system."):
            continue
            
        doc = db[collection_name].find_one()
        if doc:
            doc_str = str(doc)
            schema_info.append(f"Collection: '{collection_name}'\nSample Document: {doc_str}")
    return "\n\n".join(schema_info)

def extract_json_from_text(text_content: str):
    """
    Robustly extracts JSON object from a string that might contain other text.
    """
    try:
        json_match = re.search(r"```json\s*(\{.*?\})\s*```", text_content, re.DOTALL)
        if json_match:
            return json.loads(json_match.group(1))
            
        json_match = re.search(r"(\{.*\})", text_content, re.DOTALL)
        if json_match:
            return json.loads(json_match.group(1))
            
        return json.loads(text_content.strip())
        
    except json.JSONDecodeError as e:
        print(f"Failed to parse JSON: {e}")
        print(f"Content was: {text_content}")
        return None

def json_serial(obj):
    if isinstance(obj, (datetime.date, datetime.datetime)):
        return obj.isoformat()
    if isinstance(obj, Decimal):
        return float(obj)
    return str(obj)

def generate_chart_config_heuristic(data: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    """
    Fallback deterministic logic if AI fails to suggest a chart.
    """
    if not data or len(data) == 0:
        return None
        
    first_row = data[0]
    keys = list(first_row.keys())
    
    label_key = None
    for k, v in first_row.items():
        if isinstance(v, (str, datetime.date, datetime.datetime)):
            if k.lower() not in ['id', '_id', 'uuid', 'guid']:
                label_key = k
                break
    if not label_key and keys:
        label_key = keys[0]

    value_key = None
    for k, v in first_row.items():
        if isinstance(v, (int, float, Decimal)):
            k_lower = k.lower()
            if not (k_lower == 'id' or k_lower.endswith('_id') or k_lower.endswith('id')):
                value_key = k
                break

    if label_key and value_key:
        chart_type = "bar"
        
        is_time = False
        val = first_row.get(label_key)
        if isinstance(val, (datetime.date, datetime.datetime)):
            is_time = True
        elif isinstance(val, str) and (len(val) == 4 and val.isdigit() and int(val) > 1900):
             is_time = True
        elif label_key.lower() in ["date", "time", "year", "month", "day"]:
             is_time = True
             
        if is_time:
            chart_type = "line"
        elif len(data) <= 6:
            chart_type = "pie"
            
        return {
            "type": chart_type,
            "labelKey": label_key,
            "valueKey": value_key,
            "color": "#8884d8"
        }
    return None

async def generate_chart_config_ai(user_question: str, data: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    if not data or len(data) == 0:
        return None
    
    data_sample = {
        "columns": list(data[0].keys()),
        "first_row_sample": data[0]
    }
    
    try:
        llm = ChatGroq(temperature=0, model_name="llama-3.1-8b-instant")
        
        prompt = f"""
        You are a Data Visualization Expert.
        
        User Question: "{user_question}"
        Data Schema/Sample: {json.dumps(data_sample, default=json_serial)}
        
        Task: 
        Determine the best chart type to visualize this data.
        
        CRITICAL RULES:
        1. ALWAYS generate a chart config if there is at least one categorical/date column and one numeric column (that isn't an ID).
        2. Use "line" for trends/dates.
        3. Use "pie" for distributions (only if <= 8 items).
        4. Use "bar" for comparisons.
        5. Ignore ID columns ('id', '_id') for the Value axis.
        
        Output JSON Format:
        {{
            "type": "bar" | "line" | "pie",
            "labelKey": "key_for_x_axis",
            "valueKey": "key_for_y_axis",
            "color": "#8884d8"
        }}
        
        Return ONLY valid JSON. No markdown. If absolutely no chart is possible, return 'null'.
        """
        
        response = llm.invoke(prompt)
        config = extract_json_from_text(response.content)
        
        if not config:
            return None
            
        first_row_keys = data[0].keys()
        if config.get("labelKey") not in first_row_keys or config.get("valueKey") not in first_row_keys:
            return None 
            
        return config
        
    except Exception as e:
        print(f"AI Chart Config Error: {e}")
        return None 

@app.get("/health")
def health_check():
    connected = (db_instance is not None) or (mongo_client is not None)
    return {"status": "ok", "connected": connected, "dialect": current_dialect}

@app.get("/examples")
def get_connection_examples():
    """Returns example connection strings for supported databases."""
    return CONNECTION_EXAMPLES

@app.post("/connect")
async def connect_database(request: ConnectRequest):
    global db_instance, agent_executor, current_dialect, mongo_client, mongo_db_name
    
    if not os.getenv("GROQ_API_KEY"):
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not found in environment variables.")

    db_instance = None
    mongo_client = None
    agent_executor = None
    
    try:
        connection_str = request.connection_string.strip()
        
        if connection_str.startswith("mongodb://") or connection_str.startswith("mongodb+srv://"):
            current_dialect = "mongodb"
            try:
                mongo_client = MongoClient(connection_str)
                mongo_client.admin.command('ping')
                
                try:
                    mongo_db_name = pymongo.uri_parser.parse_uri(connection_str)['database']
                except:
                    mongo_db_name = None
                
                if not mongo_db_name:
                    dbs = mongo_client.list_database_names()
                    mongo_db_name = next((db for db in dbs if db not in ['admin', 'local', 'config']), 'test')

                tables = mongo_client[mongo_db_name].list_collection_names()
                return {
                    "status": "success", 
                    "tables": tables, 
                    "dialect": "mongodb",
                    "message": f"Connected to MongoDB ({mongo_db_name})! Found collections: {', '.join(tables)}"
                }
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"MongoDB Connection Failed: {str(e)}")

        if connection_str.startswith("postgres://"):
            connection_str = connection_str.replace("postgres://", "postgresql+psycopg2://", 1)
        elif connection_str.startswith("postgresql://") and "+" not in connection_str:
            connection_str = connection_str.replace("postgresql://", "postgresql+psycopg2://", 1)
        elif connection_str.startswith("mysql://"):
            connection_str = connection_str.replace("mysql://", "mysql+pymysql://", 1)
        elif connection_str.startswith("mariadb://"):
            connection_str = connection_str.replace("mariadb://", "mysql+pymysql://", 1)
        elif connection_str.startswith("oracle://"):
            connection_str = connection_str.replace("oracle://", "oracle+oracledb://", 1)
        elif connection_str.startswith("mssql://"):
            connection_str = connection_str.replace("mssql://", "mssql+pyodbc://", 1)

        print(f"Connecting to SQL: {connection_str.split('@')[-1]}") 

        db_instance = SQLDatabase.from_uri(connection_str)
        current_dialect = db_instance.dialect
        
        llm = ChatGroq(temperature=0, model_name="llama-3.1-8b-instant")
        
        agent_executor = create_sql_agent(
            llm=llm,
            db=db_instance,
            agent_type="openai-tools",
            verbose=True
        )
        
        tables = db_instance.get_usable_table_names()
        
        return {
            "status": "success", 
            "tables": tables, 
            "dialect": current_dialect,
            "message": f"Connected to {current_dialect.upper()}! Found tables: {', '.join(tables)}"
        }
        
    except Exception as e:
        print(f"Connection Error: {e}")
        msg = str(e)
        if "No module named" in msg:
            msg += " (Make sure the required database driver is installed via pip)"
        
        examples_text = "\n".join([f"- {k}: {v}" for k, v in CONNECTION_EXAMPLES.items()])
        detail_msg = f"Failed to connect: {msg}\n\nSupported Formats:\n{examples_text}"
        
        raise HTTPException(status_code=400, detail=detail_msg)

@app.post("/query", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    global agent_executor, db_instance, current_dialect, mongo_client, mongo_db_name
    
    if (not agent_executor and not mongo_client):
        raise HTTPException(status_code=400, detail="Database not connected. Please call /connect first.")
    
    try:
        llm = ChatGroq(temperature=0, model_name="llama-3.1-8b-instant")
        sql_query = ""
        data = []

        if current_dialect == "mongodb":
            schema_context = get_mongo_schema(mongo_client, mongo_db_name)
            
            prompt = f"""
            You are an expert MongoDB Data Analyst.
            Context (Collection Samples):
            {schema_context}
            
            User Question: "{request.text}"
            
            Task:
            1. Construct a MongoDB Aggregation Pipeline to answer the question.
            2. Return ONLY a valid JSON object with two keys: 
               - "collection": name of the collection to query
               - "pipeline": the aggregation pipeline list (array of objects)
            
            Example Output Format:
            {{
                "collection": "sales",
                "pipeline": [
                    {{"$match": {{"status": "completed"}}}},
                    {{"$group": {{"_id": "$product", "total": {{"$sum": "$amount"}}}}}}
                ]
            }}
            
            Do not include markdown formatting (like ```json). Return raw JSON only.
            """
            
            response = llm.invoke(prompt)
            # Safe extraction
            query_spec = extract_json_from_text(response.content)
            
            if not query_spec:
                raise ValueError("Could not parse JSON from AI response")

            try:
                collection_name = query_spec["collection"]
                pipeline = query_spec["pipeline"]
                sql_query = json.dumps(query_spec, indent=2) 
                
                db = mongo_client[mongo_db_name]
                cursor = db[collection_name].aggregate(pipeline)
                
                for doc in cursor:
                    if '_id' in doc:
                        doc['_id'] = str(doc['_id'])
                    data.append(doc)
                
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"MongoDB Execution Error: {str(e)}")

        # --- SQL QUERY PATH ---
        else:
            table_info = db_instance.get_table_info()
            
            prompt = f"""
            You are an expert {current_dialect.upper()} Data Analyst.
            Context: {table_info}
            
            Question: "{request.text}"
            
            Task:
            1. Generate a valid {current_dialect.upper()} SQL query.
            2. Return ONLY the SQL query. No markdown.
            3. STRICT RULE: Do NOT use 'UNION' or 'UNION ALL'. Do NOT try to combine multiple tables into one result set unless schemas are identical.
            4. If the user asks for "everything" or "all data", select from the SINGLE most relevant table.
            """
            
            response = llm.invoke(prompt)
            sql_query = response.content.strip().replace("```sql", "").replace("```", "")
            
            with db_instance._engine.connect() as connection:
                result_proxy = connection.execute(text(sql_query))
                if result_proxy.returns_rows:
                    keys = result_proxy.keys()
                    data = [dict(zip(keys, row)) for row in result_proxy.fetchall()]
                else:
                    data = [{"status": "Query executed successfully, no rows returned"}]

        chart_config = await generate_chart_config_ai(request.text, data)
        
        if not chart_config:
            chart_config = generate_chart_config_heuristic(data)

        return QueryResponse(
            answer="Query executed successfully.",
            sql_query=sql_query,
            data=data,
            chart_config=chart_config
        )

    except Exception as e:
        print(f"Query Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)