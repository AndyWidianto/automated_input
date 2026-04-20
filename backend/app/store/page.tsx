import { FileSpreadsheet, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4">

        {/* Card Extension: Broadcast Excel */}
        <div className="group relative bg-white rounded-[2rem] border border-slate-200 p-8 hover:border-emerald-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-hidden">
          {/* Background Decor (Subtle) */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50 rounded-full blur-3xl group-hover:bg-emerald-100 transition-colors"></div>

          <div className="relative z-10 group">
            {/* Header: Img & Badge */}
            <div className="flex flex-col gap-y-6 mb-6">
              <div className="flex justify-between items-start">
                {/* Gambar dibuat jauh lebih besar (w-24 h-24) */}
                <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center shadow-md shadow-emerald-100/50 group-hover:scale-105 transition-transform duration-500 overflow-hidden border border-emerald-100">
                  <img
                    src="/automated_excel.png"
                    alt="automated"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-emerald-100">
                  Productivity
                </span>
              </div>
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors tracking-tight">
                Broadcast from Excel
              </h2>

              {/* Description dengan line-clamp agar minimal & maksimal 2 baris */}
              <p className="text-slate-600 leading-relaxed mb-8 text-[15px] line-clamp-2 min-h-[3rem]">
                Otomatisasi pengiriman pesan massal langsung dari file Excel. Hemat waktu hingga 90% tanpa perlu input manual satu per satu ke banyak tujuan sekaligus.
              </p>
            </div>

            {/* Footer: Stats & Button */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              {/* <div className="flex items-center gap-x-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-xs text-slate-400 font-semibold tracking-tight">+120 installs</span>
              </div> */}

              <Link
                href="/app/broadcast"
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-white text-sm font-bold hover:bg-emerald-600 shadow-lg shadow-slate-200 hover:shadow-emerald-200 transition-all active:scale-95 group/btn"
              >
                Install
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
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