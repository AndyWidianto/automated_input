"use client";
import React, { useState } from 'react';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulasi integrasi Supabase Auth
    // const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 flex flex-col justify-center py-12 px-6 lg:px-8">
      {/* Header Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex items-center justify-center gap-x-3 mb-8">
          <div className="h-12 w-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 rotate-3">
            <span className="text-white font-bold text-xl">AN</span>
          </div>
          <span className="text-3xl font-black text-slate-900 tracking-tight">Automate</span>
        </div>
        
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {isSent ? 'Check your email' : 'Reset password'}
        </h2>
        <p className="mt-3 text-slate-500 font-medium px-4">
          {isSent 
            ? `Kami telah mengirimkan instruksi pemulihan kata sandi ke ${email}`
            : 'Masukkan alamat email yang terdaftar dan kami akan mengirimkan link untuk mengatur ulang kata sandi Anda.'}
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[420px]">
        <div className="bg-white py-10 px-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-[40px] border border-slate-100">
          
          {!isSent ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="block text-[13px] font-bold text-slate-700 ml-1 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-4 px-6 rounded-2xl text-sm font-bold text-white bg-slate-900 hover:bg-emerald-600 shadow-xl shadow-slate-200 hover:shadow-emerald-200 transition-all duration-300 active:scale-[0.98] disabled:opacity-70"
                >
                  {loading ? (
                    'Sending Link...'
                  ) : (
                    <>
                      <Send size={18} />
                      Send Reset Link
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 text-emerald-600">
                <Send size={30} />
              </div>
              <button 
                onClick={() => setIsSent(false)}
                className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Tidak menerima email? Kirim ulang
              </button>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-8 pt-8 border-t border-slate-50">
            <Link 
              href="/login" 
              className="flex items-center justify-center gap-x-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;