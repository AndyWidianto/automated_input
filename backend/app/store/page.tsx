"use client";

import { FileSpreadsheet, ArrowRight, Plus, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-10">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Extension Store <span className="text-emerald-500">.</span>
            </h1>
            <p className="text-slate-500 mt-3 text-lg max-w-2xl">
              Pilih dan instal ekstensi otomasi untuk mempercepat workflow bisnis Anda.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-sm font-medium text-slate-400">Total: 1 Available</span>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">

        {/* Card Extension: Broadcast Excel */}
        <div className="group relative bg-white rounded-[2rem] border border-slate-200 p-8 hover:border-emerald-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden">
          {/* Background Decor (Subtle) */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50 rounded-full blur-3xl group-hover:bg-emerald-100 transition-colors"></div>

          <div className="relative z-10 group p-2">
            {/* Header: Icon & Badge */}
            <div className="relative mb-8">
              {/* Dekoratif Glow di belakang gambar (muncul saat hover) */}
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between">
                <div className="relative">
                  <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:border-emerald-100 transition-colors">
                    <img
                      src="/automated_excel.png"
                      alt="automated"
                      className="w-14 h-14 object-contain transform group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>

                {/* Badge "New" atau "Popular" untuk pemanis */}
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-100">
                  Excel Core
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3 mb-8">
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors tracking-tight flex items-center gap-2">
                Broadcast from Excel
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>

              <p className="text-slate-500 leading-relaxed text-[14px] line-clamp-2 min-h-[2.5rem] group-hover:text-slate-600 transition-colors">
                Otomatisasi pengiriman pesan massal langsung dari file Excel. Hemat waktu hingga 90% tanpa perlu input manual.
              </p>
            </div>

            {/* Footer: Action Buttons */}
            <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
              <Link
                href="/app/broadcast"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-[13px] font-medium transition-all"
              >
                <FileText className="w-4 h-4" />
                Document
              </Link>

              <Link
                href="/app/broadcast"
                className="flex-[1.5] flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-white text-[13px] font-bold hover:bg-emerald-600 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-emerald-200/50 transition-all active:scale-95 group/btn overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Install Extension
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Placeholder for Next Feature */}
        <div className="rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mb-4 text-slate-400">
            <Plus className="w-6 h-6" />
          </div>
          <p className="text-slate-400 font-medium">Coming Soon</p>
          <p className="text-xs text-slate-300 mt-1 max-w-[150px]">Kami sedang menyiapkan fitur otomasi baru.</p>
        </div>

      </div>

      {/* Footer Note */}
      {/* <div className="max-w-7xl mx-auto mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <p className="text-xs font-medium text-slate-500">Membutuhkan bantuan? Hubungi tim support kami.</p>
        </div>
      </div> */}
    </div>
  );
}