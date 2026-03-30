import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from './Nav';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Mail, Loader2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

function Register() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [error, seterror] = useState({});
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = { username, email, password };

    try {
      setloading(true);
      await axios.post('https://queryla2-0-1.onrender.com/api/v1/RegisterPage', userdata);
      seterror({});
      navigate('/login');
    } catch (error) {
      seterror(error.response?.data || { general: "Registration failed. Please try again." });
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="bg-[#FAFAFB] min-h-screen w-full flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      <Nav />

      {/* Main Container: Perfectly Centered */}
      <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden">
        
        {/* Dynamic Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] -z-10 opacity-70" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[440px] bg-white border border-slate-100 rounded-[2.5rem] p-10 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.04)]"
        >
          {/* Header */}
          <div className="text-center mb-10">
            
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Create Account</h1>
            <p className="text-slate-400 font-medium text-sm leading-relaxed px-4">Start your journey toward faster data insights.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Username</label>
              <div className="relative group">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  autoFocus
                  type="text"
                  onChange={(e) => setusername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-300 text-sm font-medium"
                  placeholder="alex_doe"
                  required
                />
              </div>
              <AnimatePresence>
                {error.username && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-rose-500 text-[11px] font-bold mt-1 ml-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {error.username}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Email</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-300 text-sm font-medium"
                  placeholder="alex@example.com"
                  required
                />
              </div>
              <AnimatePresence>
                {error.email && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-rose-500 text-[11px] font-bold mt-1 ml-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {error.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-300 text-sm font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Register Button */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all flex justify-center items-center gap-2 mt-4 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin text-white/50" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>

            {/* Link to Login */}
            <div className="pt-8 text-center">
              <p className="text-sm text-slate-400 font-medium tracking-tight">
                Already have an account? {' '}
                <Link to="/login" className="text-indigo-600 font-black hover:underline transition-all">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
          
          {error.general && (
            <p className="text-rose-500 text-xs font-bold text-center mt-6 p-3 bg-rose-50 rounded-xl border border-rose-100">
              {error.general}
            </p>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default Register;