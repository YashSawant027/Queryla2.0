import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from './Nav';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './Authprovider';
import { Lock, User, Loader2, AlertCircle } from 'lucide-react';

function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState({});
  const [loading, setloading] = useState(false);
  const { setislogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userdata = { username, password };

    try {
      setloading(true);
      const response = await axios.post('https://queryla2-0-1.onrender.com/api/v1/LoginPage', userdata);
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      setislogin(true);
      seterror({});
      navigate('/');
    } catch (error) {
      seterror(error.response?.data || { general: "Invalid credentials. Please try again." });
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="bg-[#fcfcfd] min-h-screen flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden relative">
      <Nav />
      
      {/* Decorative Background Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] -z-0 pointer-events-none" />

      {/* Main Container: Centered using Flex-Grow */}
      <main className="flex-grow flex items-center justify-center px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.06)]"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Enter your credentials to access Queryla.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <User size={18} />
                </div>
                <input 
                  autoFocus
                  type="text" 
                  onChange={(e) => setusername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                  placeholder="alex_doe"
                  required
                />
              </div>
              <AnimatePresence>
                {error.username && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-1 text-rose-500 text-xs font-semibold mt-1 ml-1"
                  >
                    <AlertCircle size={12} /> {error.username}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  onChange={(e) => setpassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
              <AnimatePresence>
                {error.Password && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-1 text-rose-500 text-xs font-semibold mt-1 ml-1"
                  >
                    <AlertCircle size={12} /> {error.Password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : "Sign In"}
            </motion.button>

            {/* Error Message */}
            <AnimatePresence>
              {error.general && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-rose-500 text-xs font-bold text-center mt-2 p-2 bg-rose-50 rounded-lg border border-rose-100"
                >
                  {error.general}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-50 mt-4">
              <p className="text-center text-slate-400 font-medium">
                Don't have an account? {' '}
                <Link to="/register" className="text-indigo-600 font-bold hover:underline transition-all">Register</Link>
              </p>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

export default Login;