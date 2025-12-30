import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, 
  Send, 
  Terminal, 
  LineChart, 
  PieChart as PieChartIcon, 
  Table as TableIcon, 
  Play, 
  Cpu, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Server,
  Zap,
  Sparkles,
  Menu,
  X,
  ChevronDown, 
  ChevronUp,
  Settings,
  Laptop,
  Cloud,
  Eye,
  EyeOff
} from 'lucide-react';

// --- CONFIGURATION ---
const API_BASE_URL = "https://queryla20-production-7245.up.railway.app"; 

// --- HELPER COMPONENTS (Charts & Table) ---
// (Keeping these the same as they work well)

const SimpleLineChart = ({ data, labelKey, valueKey, color = "#8884d8" }) => {
  if (!data || data.length === 0) return <div className="text-gray-400 p-4">No data to chart</div>;
  const values = data.map(d => Number(d[valueKey]) || 0);
  const max = Math.max(...values);
  const min = 0; 
  const range = max - min || 1;
  const getX = (index) => data.length <= 1 ? 50 : (index / (data.length - 1)) * 100;
  const getY = (val) => 100 - (((val - min) / range) * 100); 
  const points = data.map((d, i) => `${getX(i)},${getY(Number(d[valueKey]) || 0)}`).join(' ');
  let ticks = [0, 0.25, 0.5, 0.75, 1].map(pct => Math.round(min + (range * pct)));
  ticks = [...new Set(ticks)].sort((a, b) => b - a);

  return (
    <div className="w-full h-64 sm:h-72 p-2 sm:p-4 border rounded bg-white flex flex-col font-sans">
       <div className="flex flex-1 min-h-0 relative">
           <div className="flex flex-col justify-between text-[8px] sm:text-[10px] text-[#666] pr-2 select-none h-full py-1">
              {ticks.map((tick, i) => <span key={i} className="leading-none text-right w-6 sm:w-8">{tick}</span>)}
           </div>
           <div className="flex-1 relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                {ticks.map((tick) => {
                   const yPos = getY(tick);
                   return <line key={tick} x1="0" y1={yPos} x2="100" y2={yPos} stroke="#ccc" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />;
                })}
                <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="absolute inset-0 pointer-events-none">
                 {data.map((d, i) => (
                   <div key={i} className="absolute bg-white border border-solid rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm pointer-events-auto cursor-pointer group" style={{ left: `${getX(i)}%`, top: `${getY(Number(d[valueKey]) || 0)}%`, borderColor: color, width: '6px', height: '6px', borderWidth: '1.5px' }}>
                      <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 text-gray-600 text-[10px] px-2 py-1 rounded shadow-sm whitespace-nowrap z-20 pointer-events-none transition-opacity duration-200">
                          <span className="font-bold text-[#8884d8]">{d[labelKey]}:</span> {d[valueKey]}
                       </div>
                   </div>
                 ))}
              </div>
           </div>
       </div>
       <div className="flex relative h-6 mt-2 ml-8 sm:ml-10 select-none">
          {data.map((d, i) => (
             <div key={i} className="absolute text-[8px] sm:text-[10px] text-[#666] transform -translate-x-1/2 text-center w-8 sm:w-12 truncate" style={{ left: `${getX(i)}%` }}>{d[labelKey]}</div>
          ))}
       </div>
    </div>
  );
};

const SimplePieChart = ({ data, labelKey, valueKey }) => {
  if (!data || data.length === 0) return <div className="text-gray-400 p-4">No data to chart</div>;
  const total = data.reduce((acc, curr) => acc + (Number(curr[valueKey]) || 0), 0);
  let cumulativePercent = 0;
  const getCoordinatesForPercent = (percent) => [Math.cos(2 * Math.PI * percent), Math.sin(2 * Math.PI * percent)];
  const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658', '#8884d8'];

  return (
    <div className="w-full h-64 flex flex-col sm:flex-row items-center justify-center p-4 border rounded bg-white">
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0">
        <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full">
          {data.map((slice, i) => {
            const value = Number(slice[valueKey]) || 0;
            const percent = value / total;
            const start = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += percent;
            const end = getCoordinatesForPercent(cumulativePercent);
            const largeArcFlag = percent > 0.5 ? 1 : 0;
            const pathData = [`M 0 0`, `L ${start[0]} ${start[1]}`, `A 1 1 0 ${largeArcFlag} 1 ${end[0]} ${end[1]}`, `Z`].join(' ');
            return <path key={i} d={pathData} fill={colors[i % colors.length]} stroke="white" strokeWidth="0.02" className="hover:opacity-80 transition-opacity cursor-pointer"><title>{slice[labelKey]}: {value} ({Math.round(percent * 100)}%)</title></path>;
          })}
        </svg>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-8 text-xs space-y-1 w-full sm:w-auto max-h-32 sm:max-h-48 overflow-y-auto">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: colors[i % colors.length] }}></div>
            <span className="text-slate-600 font-medium truncate max-w-[120px]">{item[labelKey]}</span>
            <span className="text-slate-400">({Math.round((Number(item[valueKey])/total)*100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DataTable = ({ data }) => {
  if (!data || data.length === 0) return <div className="text-gray-500 italic">No results found.</div>;
  const columns = Object.keys(data[0]);
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm text-left text-gray-700 whitespace-nowrap">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>{columns.map(col => <th key={col} className="px-4 py-3">{col}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="bg-white border-b hover:bg-gray-50">
              {columns.map(col => <td key={`${idx}-${col}`} className="px-4 py-3">{typeof row[col] === 'object' ? JSON.stringify(row[col]) : row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ChartContainer = ({ data, config }) => {
  const defaultType = config.type === 'bar' ? 'pie' : (config.type || 'pie');
  const [chartType, setChartType] = useState(defaultType);
  const activeType = (chartType === 'bar' || chartType === 'area') ? 'pie' : chartType; 

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          {activeType === 'line' ? <LineChart className="w-4 h-4 text-indigo-500"/> : 
           activeType === 'pie' ? <PieChartIcon className="w-4 h-4 text-indigo-500"/> :
           <TableIcon className="w-4 h-4 text-indigo-500"/>}
          Visual Insight
        </div>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
          <button onClick={() => setChartType('line')} className={`p-1.5 rounded-md transition-all ${activeType === 'line' ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`} title="Line Chart">
            <LineChart className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setChartType('pie')} className={`p-1.5 rounded-md transition-all ${activeType === 'pie' ? 'bg-white shadow text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`} title="Pie Chart">
            <PieChartIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="p-4 border-b border-slate-100">
        {activeType === 'line' && <SimpleLineChart data={data} labelKey={config.labelKey} valueKey={config.valueKey} color="#8884d8" />}
        {activeType === 'pie' && <SimplePieChart data={data} labelKey={config.labelKey} valueKey={config.valueKey} />}
      </div>
      <div className="p-4 max-h-60 overflow-y-auto">
        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Source Data</h4>
        <DataTable data={data} />
      </div>
    </div>
  );
};

// --- NEW COMPONENT: CONNECTION FORM ---
const ConnectionForm = ({ onConnect, isConnecting, isConnected, onDisconnect }) => {
  const [dbType, setDbType] = useState('postgresql');
  const [formData, setFormData] = useState({
    host: '',
    port: '5432',
    database: '',
    username: '',
    password: '',
    service: '' // For Oracle
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rawString, setRawString] = useState('');
  const [useRaw, setUseRaw] = useState(false);

  // Update default port when DB type changes
  useEffect(() => {
    const ports = {
      postgresql: '5432',
      mysql: '3306',
      mongodb: '27017',
      oracle: '1521',
      mssql: '1433'
    };
    setFormData(prev => ({ ...prev, port: ports[dbType] || '' }));
  }, [dbType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateConnectionString = () => {
    const { host, port, database, username, password, service } = formData;
    const userPass = username ? `${username}:${password}@` : '';
    
    switch (dbType) {
      case 'postgresql':
        return `postgresql://${userPass}${host}:${port}/${database}`;
      case 'mysql':
        return `mysql://${userPass}${host}:${port}/${database}`;
      case 'mongodb':
        return `mongodb://${userPass}${host}:${port}/${database}?authSource=admin`; // Common default
      case 'oracle':
        return `oracle://${userPass}${host}:${port}/${service}`;
      case 'mssql':
        return `mssql://${userPass}${host}:${port}/${database}`;
      default:
        return '';
    }
  };

  const finalConnectionString = useRaw ? rawString : generateConnectionString();

  const handleSubmit = () => {
    onConnect(finalConnectionString);
  };

  if (isConnected) {
    return (
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-green-800">Connected Successfully</h3>
            <p className="text-xs text-green-600 mt-1 break-all px-2 opacity-80">
              {finalConnectionString.replace(/:[^:]*@/, ':****@')} 
            </p>
          </div>
        </div>
        <button 
          onClick={onDisconnect}
          className="w-full py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex justify-end">
        <button 
          onClick={() => setUseRaw(!useRaw)}
          className="text-[10px] text-indigo-600 hover:underline font-medium"
        >
          {useRaw ? "Use Form Wizard" : "Enter Raw Connection String"}
        </button>
      </div>

      {useRaw ? (
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">Connection String</label>
          <input 
            type="text" 
            value={rawString}
            onChange={(e) => setRawString(e.target.value)}
            placeholder="postgresql://user:pass@host:5432/db"
            className="w-full text-xs p-2 border border-slate-300 rounded bg-slate-50 font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      ) : (
        <div className="space-y-3">
          {/* DB Selector */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Database Type</label>
            <select 
              value={dbType} 
              onChange={(e) => setDbType(e.target.value)}
              className="w-full text-sm p-2 border border-slate-300 rounded bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="mongodb">MongoDB</option>
              <option value="oracle">Oracle</option>
              <option value="mssql">SQL Server</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-medium text-slate-500 mb-1 block">Host</label>
              <input name="host" value={formData.host} onChange={handleChange} placeholder="localhost" className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="text-[10px] font-medium text-slate-500 mb-1 block">Port</label>
              <input name="port" value={formData.port} onChange={handleChange} placeholder="5432" className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:border-indigo-500" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-500 mb-1 block">{dbType === 'oracle' ? 'Service Name / SID' : 'Database Name'}</label>
            <input name={dbType === 'oracle' ? 'service' : 'database'} value={dbType === 'oracle' ? formData.service : formData.database} onChange={handleChange} placeholder="mydb" className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:border-indigo-500" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-medium text-slate-500 mb-1 block">Username</label>
              <input name="username" value={formData.username} onChange={handleChange} placeholder="user" className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="relative">
              <label className="text-[10px] font-medium text-slate-500 mb-1 block">Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="****" 
                className="w-full text-xs p-2 border border-slate-300 rounded focus:outline-none focus:border-indigo-500 pr-7" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-[22px] text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            </div>
          </div>
          
          {/* Preview */}
          <div className="bg-slate-100 p-2 rounded text-[10px] text-slate-500 break-all font-mono">
            {generateConnectionString() || "Complete the form..."}
          </div>
        </div>
      )}

      <button 
        onClick={handleSubmit}
        disabled={isConnecting}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mt-4"
      >
        {isConnecting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
        {isConnecting ? "Connecting..." : "Connect Database"}
      </button>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function SQLAssistant() {
  const [apiBaseUrl, setApiBaseUrl] = useState("https://queryla20-production-7245.up.railway.app");
  const [showSettings, setShowSettings] = useState(false);
  
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [dbTables, setDbTables] = useState([]);
  const [input, setInput] = useState("");
  const [isConnectionExpanded, setIsConnectionExpanded] = useState(true); 
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "Hello! I am ready to connect to your Database. Fill in the connection details above to begin." 
    }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateId = () => Date.now() + Math.random();

  const addBotMessage = (text, sql = null, data = null, chartConfig = null) => {
    setMessages(prev => [...prev, { id: generateId(), type: 'bot', text, sql, data, chartConfig }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { id: generateId(), type: 'user', text }]);
  };

  const handleConnect = async (connString) => {
    setIsConnecting(true);
    try {
      const response = await fetch(`${apiBaseUrl}/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connection_string: connString })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.detail || "Failed to connect");
      }

      setIsConnected(true);
      setDbTables(result.tables || []);
      addBotMessage(result.message || "Connected successfully! You can now ask questions about your data.");
      if (window.innerWidth < 768) {
        setIsConnectionExpanded(false);
      }
      
    } catch (error) {
      console.error("Connection failed", error);
      addBotMessage(`Error: ${error.message}. Make sure the backend is running and the credentials are correct.`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setDbTables([]);
    addBotMessage("Disconnected. Connect to another database to continue.");
  };

  const processQuery = async (query) => {
    addBotMessage("Thinking...");
    
    try {
      const response = await fetch(`${apiBaseUrl}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query })
      });

      const result = await response.json();
      
      setMessages(prev => prev.filter(m => !(m.type === 'bot' && m.text === "Thinking...")));

      if (!response.ok) throw new Error(result.detail || "Query failed");

      let finalChartConfig = result.chart_config;
      
      if (!finalChartConfig && result.data && result.data.length > 0) {
        const firstRow = result.data[0];
        const keys = Object.keys(firstRow);
        const lowerQuery = query.toLowerCase();

        const labelKey = keys.find(k => {
            const val = firstRow[k];
            if (typeof val === 'string' || val instanceof Date) return true;
            if (typeof val === 'number' && val > 1900 && val < 2100 && k.toLowerCase().includes('year')) return true;
            return false;
        }) || keys[0];

        const valueKey = keys.find(k => {
            if (typeof firstRow[k] !== 'number') return false;
            const keyLower = k.toLowerCase();
            const isId = keyLower === 'id' || keyLower.endsWith('_id') || keyLower.endsWith('id') || keyLower === 'pk';
            const isCode = keyLower.includes('code') || keyLower.includes('zip') || keyLower.includes('phone') || keyLower.includes('serial') || keyLower.includes('number') || keyLower.includes('no.');
            if (isId || isCode) return false;
            return true;
        });

        const explicitChartIntent = ['chart', 'graph', 'plot', 'visual', 'trend', 'diagram'].some(w => lowerQuery.includes(w));
        const aggregateIntent = ['count', 'sum', 'avg', 'average', 'total', 'max', 'min', 'group by', 'compare', 'vs', 'breakdown', 'distribution'].some(w => lowerQuery.includes(w));
        
        let shouldChart = false;
        
        if (labelKey && valueKey) {
            if (explicitChartIntent || aggregateIntent) {
                shouldChart = true;
            } else {
                const metricKeywords = ['mark', 'score', 'grade', 'point', 'sales', 'revenue', 'profit', 'amount', 'qty', 'quantity', 'price', 'cost', 'salary'];
                if (metricKeywords.some(w => valueKey.toLowerCase().includes(w))) {
                    shouldChart = true;
                }
            }
        }

        if (shouldChart && labelKey && valueKey) {
          const isDateLike = (val) => !isNaN(Date.parse(val)) && isNaN(val);
          const lowerLabel = labelKey.toLowerCase();
          const isTimeDimension = lowerLabel.includes('date') || lowerLabel.includes('time') || lowerLabel.includes('year') || isDateLike(firstRow[labelKey]);
          
          let type = 'pie';
          if (isTimeDimension) type = 'line';

          finalChartConfig = {
            type: type,
            labelKey,
            valueKey,
            color: '#8884d8'
          };
        }
      }

      addBotMessage(
        result.answer || "Query processed successfully.",
        result.sql_query,
        result.data,
        finalChartConfig
      );

    } catch (error) {
       setMessages(prev => prev.filter(m => !(m.type === 'bot' && m.text === "Thinking...")));
       addBotMessage(`Error: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!isConnected) {
      addBotMessage("Please connect to your database first.");
      if (window.innerWidth < 768) {
        setIsConnectionExpanded(true);
      }
      return;
    }
    addUserMessage(input);
    const currentInput = input;
    setInput("");
    await processQuery(currentInput);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* CONNECTION PANEL */}
      <div className={`
        w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shadow-sm z-20 flex-shrink-0 transition-all duration-300 ease-in-out
        ${isConnectionExpanded ? 'h-[60vh] md:h-full' : 'h-14 md:h-full'}
      `}>
        <div 
          className="p-4 md:p-5 border-b border-slate-100 flex items-center justify-between cursor-pointer md:cursor-default"
          onClick={() => {
            if (window.innerWidth < 768) {
              setIsConnectionExpanded(!isConnectionExpanded);
            }
          }}
        >
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <Database className="w-6 h-6" />
            <span>DataLingo AI</span>
          </div>
          
          <div className="flex items-center gap-2">
             <div className="relative">
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }}
                  className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                  title="Server Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
                {showSettings && (
                  <div className="absolute top-8 right-0 w-48 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-50">
                    <p className="text-[10px] text-slate-400 font-bold mb-2 px-2 uppercase">Backend Server</p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setApiBaseUrl("https://queryla20-production-7245.up.railway.app"); setShowSettings(false); }}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded mb-1 ${apiBaseUrl.includes('railway') ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                      <Cloud className="w-3 h-3" /> Cloud (Railway)
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setApiBaseUrl("http://localhost:8000"); setShowSettings(false); }}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded ${apiBaseUrl.includes('localhost') ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                      <Laptop className="w-3 h-3" /> Local (Port 8000)
                    </button>
                  </div>
                )}
             </div>
             <button className="md:hidden text-slate-400 hover:text-indigo-600 transition-colors p-1">
               {isConnectionExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
             </button>
          </div>
        </div>
        
        {/* Connection Content */}
        <div className={`
          flex-1 overflow-y-auto p-4 md:p-5
          ${isConnectionExpanded ? 'block' : 'hidden md:block'}
        `}>
          <ConnectionForm 
            onConnect={handleConnect} 
            isConnecting={isConnecting}
            isConnected={isConnected}
            onDisconnect={handleDisconnect}
          />

          {isConnected && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <TableIcon className="w-4 h-4" /> Tables Found
              </h3>
              <div className="space-y-2">
                {dbTables.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No tables found.</p>
                ) : (
                    dbTables.map(table => (
                        <div key={table} className="bg-slate-50 p-2 border border-slate-200 rounded text-xs font-mono text-slate-600 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                            {table}
                        </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
              
              <div 
                className={`max-w-[90%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                {msg.type === 'bot' && (
                  <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                    <Cpu className="w-3 h-3" /> AI Assistant
                  </div>
                )}
                {msg.text}
              </div>

              {msg.sql && (
                <div className="mt-2 w-full max-w-[90%] sm:max-w-[80%] animate-in fade-in zoom-in-95 duration-300">
                  <div className="bg-slate-900 rounded-lg overflow-hidden shadow-md">
                    <div className="bg-slate-800 px-3 py-1.5 flex items-center justify-between border-b border-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-mono">Generated Query</span>
                        <Zap className="w-3 h-3 text-yellow-500" />
                      </div>
                    </div>
                    <div className="p-3 font-mono text-xs sm:text-sm text-green-400 overflow-x-auto whitespace-pre-wrap">
                      {msg.sql}
                    </div>
                  </div>
                </div>
              )}

              {(msg.data || msg.chartConfig) && (
                <div className="mt-4 w-full max-w-[100%] sm:max-w-[80%]">
                  <ChartContainer data={msg.data} config={msg.chartConfig || {}} />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex-none">
          <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isConnected ? "Query your database (e.g. 'Show total sales by region')..." : "Connect to start chatting..."}
              disabled={!isConnected}
              className="w-full pl-4 sm:pl-5 pr-12 py-3 sm:py-3.5 bg-slate-100 border-transparent focus:bg-white border focus:border-indigo-500 rounded-full shadow-sm text-sm focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!input.trim() || !isConnected}
              className="absolute right-2 top-1.5 sm:top-2 p-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}