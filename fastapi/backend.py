import os
import json
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

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Universal Text-to-SQL/NoSQL API")

# Allow all origins for local testing/generic deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
db_instance = None
mongo_client = None
mongo_db_name = None
agent_executor = None
current_dialect = "postgresql" 

# Define connection examples for user reference
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
    sql_query: Optional[str] = None # Stores SQL or MongoDB Pipeline JSON
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
            # Convert ObjectId and datetime to string for prompt readability
            doc_str = str(doc)
            schema_info.append(f"Collection: '{collection_name}'\nSample Document: {doc_str}")
    return "\n\n".join(schema_info)

# Helper to handle non-serializable objects (dates, decimals) for LLM context
def json_serial(obj):
    if isinstance(obj, (datetime.date, datetime.datetime)):
        return obj.isoformat()
    if isinstance(obj, Decimal):
        return float(obj)
    return str(obj)

async def generate_chart_config_ai(user_question: str, data: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    """
    Uses the LLM to intelligently decide the best chart configuration based on the User's Question 
    and the actual Data Schema returned.
    """
    if not data or len(data) == 0:
        return None
    
    # We send the columns and the first row to the AI so it knows the data shape
    # We avoid sending all data to save tokens and privacy
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
        Recommend the best chart type (bar, line, pie) to visualize this data based on the user's intent and the data type.
        
        Rules:
        1. If the user asks for a trend, over time, or timeline -> Use "line".
        2. If the user asks for distribution, proportion, or breakdown -> Use "pie" (only if <= 8 data points).
        3. If comparing values across categories -> Use "bar".
        4. IGNORE ID columns (like 'id', 'user_id', '_id') for the value axis unless it's a COUNT.
        5. Return 'null' if no chart is appropriate (e.g. single number result, text list).
        
        Output JSON Format:
        {{
            "type": "bar" | "line" | "pie",
            "labelKey": "key_for_x_axis_or_labels",
            "valueKey": "key_for_y_axis_or_values",
            "color": "#8884d8"
        }}
        
        Return ONLY valid JSON. No markdown.
        """
        
        response = llm.invoke(prompt)
        content = response.content.strip().replace("```json", "").replace("```", "")
        
        if content.lower() == "null":
            return None
            
        config = json.loads(content)
        
        # Validate that keys actually exist in data
        first_row_keys = data[0].keys()
        if config["labelKey"] not in first_row_keys or config["valueKey"] not in first_row_keys:
            return None # Fallback if AI hallucinates a key
            
        return config
        
    except Exception as e:
        print(f"AI Chart Config Error: {e}")
        return None # Fail gracefully to no chart

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
    
    # Reset state
    db_instance = None
    mongo_client = None
    agent_executor = None
    
    try:
        connection_str = request.connection_string.strip()
        
        # --- MONGODB HANDLER ---
        # This checks for BOTH standard mongodb:// and Atlas mongodb+srv://
        if connection_str.startswith("mongodb://") or connection_str.startswith("mongodb+srv://"):
            current_dialect = "mongodb"
            try:
                mongo_client = MongoClient(connection_str)
                # Quick check
                mongo_client.admin.command('ping')
                
                # Extract DB name from connection string or default
                try:
                    mongo_db_name = pymongo.uri_parser.parse_uri(connection_str)['database']
                except:
                    mongo_db_name = None
                
                if not mongo_db_name:
                    # Fallback: use the first non-admin/local db
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

        # --- SQL HANDLER (Driver Injection) ---
        # PostgreSQL
        if connection_str.startswith("postgres://"):
            connection_str = connection_str.replace("postgres://", "postgresql+psycopg2://", 1)
        elif connection_str.startswith("postgresql://") and "+" not in connection_str:
            connection_str = connection_str.replace("postgresql://", "postgresql+psycopg2://", 1)
            
        # MySQL / MariaDB
        elif connection_str.startswith("mysql://"):
            connection_str = connection_str.replace("mysql://", "mysql+pymysql://", 1)
        elif connection_str.startswith("mariadb://"):
            connection_str = connection_str.replace("mariadb://", "mysql+pymysql://", 1)
            
        # Oracle
        elif connection_str.startswith("oracle://"):
            connection_str = connection_str.replace("oracle://", "oracle+oracledb://", 1)
            
        # MSSQL
        elif connection_str.startswith("mssql://"):
            connection_str = connection_str.replace("mssql://", "mssql+pyodbc://", 1)

        print(f"Connecting to SQL: {connection_str.split('@')[-1]}") 

        # Initialize SQL Connection
        db_instance = SQLDatabase.from_uri(connection_str)
        current_dialect = db_instance.dialect
        
        # Initialize LLM
        llm = ChatGroq(temperature=0, model_name="llama-3.1-8b-instant")
        
        # Create SQL Agent
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
        
        # Add examples to the error message for better UX
        examples_text = "\n".join([f"- {k}: {v}" for k, v in CONNECTION_EXAMPLES.items()])
        detail_msg = f"Failed to connect: {msg}\n\nSupported Formats:\n{examples_text}"
        
        raise HTTPException(status_code=400, detail=detail_msg)

@app.post("/query", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    global agent_executor, db_instance, current_dialect, mongo_client, mongo_db_name
    
    if (not agent_executor and not mongo_client):
        raise HTTPException(status_code=400, detail="Database not connected. Please call /connect first.")
    
    try:
        # Initialize LLM
        llm = ChatGroq(temperature=0, model_name="llama-3.1-8b-instant")

        sql_query = ""
        data = []

        # --- MONGODB QUERY PATH ---
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
            result_str = response.content.strip().replace("```json", "").replace("```", "")
            
            try:
                query_spec = json.loads(result_str)
                collection_name = query_spec["collection"]
                pipeline = query_spec["pipeline"]
                sql_query = json.dumps(query_spec, indent=2) # Display format
                
                # Execute Mongo Query
                db = mongo_client[mongo_db_name]
                cursor = db[collection_name].aggregate(pipeline)
                
                # Convert BSON results to JSON-serializable list
                for doc in cursor:
                    if '_id' in doc:
                        doc['_id'] = str(doc['_id'])
                    data.append(doc)
                
            except json.JSONDecodeError:
                raise HTTPException(status_code=500, detail="AI generated invalid JSON for MongoDB query.")
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

        # --- GENERATE SMART CHART CONFIG ---
        # Now we use the AI to decide the chart type based on the user's intent + actual data
        chart_config = await generate_chart_config_ai(request.text, data)

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
    # Use the PORT environment variable provided by Railway, or default to 8080
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)