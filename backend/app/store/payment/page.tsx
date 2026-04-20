"use client";


import usePayment from '@/app/lib/hooks/Payment';
import { CheckIcon, ArrowRightIcon, ShieldCheck } from 'lucide-react';


const PaymentPage = () => {
  const { plans, selectedPlan, setSelectedPlan, handleCheckout } = usePayment();

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.2em] bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
          Pricing Plans
        </span>
        <h2 className="mt-6 text-4xl font-black text-slate-900 sm:text-5xl tracking-tight">
          Pilih Paket Masa Depanmu <span className="text-emerald-500">.</span>
        </h2>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          Tingkatkan produktivitas otomasi Anda dengan fitur premium yang dirancang untuk skala bisnis.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative p-10 rounded-[2.5rem] transition-all duration-500 group overflow-hidden ${selectedPlan === plan.id
                ? 'bg-white border-2 border-emerald-500 shadow-[0_20px_50px_rgba(16,185,129,0.1)] scale-105 z-10'
                : 'bg-white/60 border border-slate-200 hover:border-slate-300 hover:bg-white scale-100 shadow-sm'
              }`}
          >
            {/* Dekorasi Background */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl transition-opacity ${selectedPlan === plan.id ? 'bg-emerald-100 opacity-60' : 'bg-slate-100 opacity-0'
              }`}></div>

            {/* Badge Popular (Hanya untuk Paket Pro) */}
            {plan.id === 'pro' && (
              <div className="absolute top-6 right-8 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-emerald-200">
                Most Popular
              </div>
            )}

            {/* Icon & Name */}
            <div className="relative z-10">
              <h3 className={`text-2xl font-black ${selectedPlan === plan.id ? 'text-slate-900' : 'text-slate-700'}`}>
                {plan.name}
              </h3>
              <p className="mt-3 text-slate-500 text-sm leading-relaxed font-medium">
                {plan.description}
              </p>
            </div>

            {/* Price Section */}
            <div className="mt-8 flex items-baseline gap-1 relative z-10">
              <span className="text-sm font-bold text-slate-400">Rp</span>
              <span className="text-5xl font-black text-slate-900 tracking-tighter">
                {new Intl.NumberFormat('id-ID').format(plan.price)}
              </span>
              <span className="text-slate-400 font-semibold text-sm">/{plan.period}</span>
            </div>

            {/* Features List */}
            <ul className="mt-10 space-y-4 relative z-10">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-[15px] font-medium text-slate-600">
                  <div className={`mr-4 p-1 rounded-full ${selectedPlan === plan.id ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                    <CheckIcon className={`h-3.5 w-3.5 ${selectedPlan === plan.id ? 'text-emerald-600' : 'text-slate-400'}`} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Action Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Biar gak ke-trigger onClick div-nya
                handleCheckout(plan);
              }}
              className={`mt-12 w-full flex items-center justify-center px-8 py-4 text-sm font-black rounded-2xl transition-all duration-300 group-hover:gap-3 ${plan.id === 'pro'
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-xl shadow-emerald-200'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200'
                } active:scale-95`}
            >
              Upgrade Sekarang
              <ArrowRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </button>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-16 flex flex-col items-center gap-6">
        <div className="flex items-center gap-6 grayscale opacity-50">
          <img src="/api/placeholder/100/30" alt="Midtrans" className="h-5" />
          <img src="/api/placeholder/100/30" alt="Stripe" className="h-5" />
        </div>
        <p className="text-slate-400 text-xs font-medium flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Pembayaran terenkripsi & aman. Batalkan kapan saja.
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;