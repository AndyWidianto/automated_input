"use client";

import { Mail, Lock, User, CheckCircle } from 'lucide-react';
import useSignup from '../lib/hooks/Signup';
import Loading from '../components/Loading';



const SignUp = () => {
  const {
    handleChange,
    handleRegister,
    errors,
    formData,
    loading,
    step,
    handleVerifyOtp,
    otp,
    setStep,
    setOtp
  } = useSignup();

  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] text-slate-900 flex flex-col justify-center py-12 px-6 lg:px-8">
        {/* Header Section */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="flex items-center justify-center gap-x-3 mb-6">
            <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 rotate-3 group-hover:rotate-0 transition-transform">
              <span className="text-white font-bold text-lg">AN</span>
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">Automate</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Cek Inbox Kamu</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium px-4">
            Kode verifikasi telah dikirim ke <br />
            <span className="text-slate-900 font-bold decoration-emerald-500/30 underline underline-offset-4">{formData.email}</span>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[420px]">
          <div className="bg-white py-10 px-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] sm:rounded-[32px] border border-slate-100/80">
            <form className="space-y-6" onSubmit={handleRegister}>

              {/* OTP Input Section */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 text-center mb-6 uppercase tracking-[0.2em]">
                  6-Digit Verification Code
                </label>

                <div className="relative group">
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    className="block w-full text-center tracking-[0.8em] font-mono text-3xl font-black py-5 bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all duration-300 placeholder:text-slate-200"
                    placeholder="000000"
                    required
                    autoFocus
                  />
                  {/* Dekorasi Garis Bawah Fokus */}
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-emerald-500 transition-all duration-500 rounded-full ${otp.length > 0 ? 'w-1/2' : 'w-0'}`}></div>
                </div>

                <p className="mt-6 text-center text-[13px] text-slate-400">
                  Tidak menerima kode? <span className="text-slate-600 font-semibold cursor-pointer hover:text-emerald-600">Cek folder spam</span>
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full flex justify-center items-center py-4 px-6 rounded-2xl text-[15px] font-bold text-white bg-slate-900 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 shadow-xl shadow-slate-200/50 hover:shadow-emerald-200/40 transition-all duration-300 active:scale-[0.97]"
                >
                  <Loading loading={loading} text='Verifikasi Akun' />
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-3 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Ganti Email
                </button>
              </div>
            </form>

            {/* Resend Timer Section */}
            <div className="mt-8 pt-6 border-t border-slate-50">
              <div className="flex justify-center items-center gap-2 bg-emerald-50/50 py-3 px-4 rounded-xl">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-[13px] text-emerald-700 font-medium">
                  Kirim ulang kode dalam <span className="font-bold underline">59 detik</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 flex flex-col justify-center py-12 px-6 lg:px-8">
      {/* Header Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex items-center justify-center gap-x-3 mb-8">
          <div className="h-12 w-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-white font-bold text-xl">AN</span>
          </div>
          <span className="text-3xl font-black text-slate-900 tracking-tight">Automate</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create account</h2>
        <p className="mt-3 text-slate-500 font-medium">
          Join us and start automating your workflow
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[440px]">
        <div className="bg-white py-10 px-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-[40px] border border-slate-100">
          <form className="space-y-6" onSubmit={handleVerifyOtp}>

            {/* Username Field */}
            <div className="group">
              <label htmlFor="username" className="block text-[13px] font-bold text-slate-700 ml-1 mb-1.5 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" aria-hidden="true" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all"
                  placeholder="johndoe"
                />
              </div>
              {errors.username && <p className="mt-2 text-xs text-red-500 font-medium ml-1">{errors.username}</p>}
            </div>

            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block text-[13px] font-bold text-slate-700 ml-1 mb-1.5 uppercase tracking-wider">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all"
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && <p className="mt-2 text-xs text-red-500 font-medium ml-1">{errors.email}</p>}
            </div>

            {/* Password Fields Row (Opsional: Bisa digabung agar lebih ringkas) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="group">
                <label className="block text-[13px] font-bold text-slate-700 ml-1 mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-[13px] font-bold text-slate-700 ml-1 mb-1.5 uppercase tracking-wider">Confirm</label>
                <div className="relative">
                  <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-4 px-6 rounded-2xl text-sm font-bold text-white bg-slate-900 hover:bg-emerald-600 shadow-xl shadow-slate-200 hover:shadow-emerald-200 transition-all duration-300 active:scale-[0.98]"
              >
                <Loading loading={loading} text='Create Account' />
              </button>
            </div>
          </form>

          <div className="mt-10 flex flex-col items-center gap-4">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{' '}
              <a href="/login" className="text-emerald-600 font-bold hover:underline underline-offset-4">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;