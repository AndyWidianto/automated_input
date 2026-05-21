"use client";

import useProfile from '@/app/lib/hooks/Profile';
import { User, Mail, Shield, CreditCard, ExternalLink, Camera } from 'lucide-react';
import Link from 'next/link';

const ProfilePage = () => {
  const { formData, setFormData, handleSubmit, loading, user } = useProfile();
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-slate-500 mt-2">Kelola informasi profil dan preferensi akun Anda.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          
          {/* Section 1: Public Profile */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative group">
                  <img 
                    src="/user.png" 
                    alt="Profile" 
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-50 shadow-sm"
                  />
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white border border-slate-200 rounded-xl shadow-lg text-slate-600 hover:text-emerald-600 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
                  {/* <p className="text-slate-500 text-sm">Full-stack Developer • Indonesia</p> */}
                  <div className="mt-3 flex gap-2">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-100">
                      Active User
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      defaultValue={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none text-slate-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email" 
                      defaultValue={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all outline-none text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50/50 px-8 py-4 flex justify-end border-t border-slate-100">
              <button onClick={handleSubmit} disabled={loading} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
                {loading ? 'Processing' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Section 2: Plan & Subscription */}
          {/* <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <CreditCard className="text-indigo-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Current Plan</h3>
                  <p className="text-slate-500 text-sm">Kelola langganan dan metode pembayaran.</p>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <span className="text-indigo-400 font-bold text-xs uppercase tracking-[0.2em]">Free Edition</span>
                    <h4 className="text-3xl font-bold mt-1">Starter Pack</h4>
                    <p className="text-slate-400 text-sm mt-2 max-w-xs">Nikmati fitur dasar otomasi secara gratis selamanya.</p>
                  </div>
                  <Link href="/store/payment" className="bg-white text-slate-900 px-6 py-3 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-xl shadow-black/20">
                    Upgrade to Pro <ExternalLink size={16} />
                  </Link>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              </div>
            </div>
          </div> */}

          {/* Section 3: Security */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
                <Shield className="text-rose-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Security</h3>
                <p className="text-slate-500 text-sm">Jaga keamanan akun Anda dengan password yang kuat.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-100 rounded-2xl bg-slate-50/30">
              <div>
                <p className="text-sm font-bold text-slate-700">Password</p>
                {/* <p className="text-xs text-slate-400">Terakhir diperbarui 2 bulan yang lalu</p> */}
              </div>
              <button className="mt-4 sm:mt-0 text-sm font-bold text-emerald-600 hover:text-emerald-700 underline-offset-4 hover:underline">
                Update Password
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;