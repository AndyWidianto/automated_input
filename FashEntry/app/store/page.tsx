"use client";

import { FileSpreadsheet, ArrowRight, Plus, FileText, Image, Sparkles, Shield, FileType, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const features = [
    {
      id: 'ocr-converter',
      title: 'Image to Docs',
      description: 'Ekstrak teks dari gambar secara instan menjadi file Word/Docs yang bisa diedit kembali tanpa ketik ulang.',
      badge: 'Populer',
      icon: <FileText className="text-slate-700" size={22} />,
      iconBg: 'bg-slate-100 border border-slate-200/60',
      url: "/store/converttodocs",
    },
    {
      id: 'upscaler',
      title: 'Image to HD',
      description: 'Ubah resolusi foto yang buram atau pecah menjadi kualitas HD tajam menggunakan optimasi rekonstruksi piksel.',
      badge: 'Terbaru',
      icon: <Image className="text-slate-700" size={22} />,
      iconBg: 'bg-slate-100 border border-slate-200/60',
      url: "/store/upscaler",
    }
  ];
  const featuresExtensions = [
    {
      id: 'broadcast-excel',
      title: "Bulk from Excel",
      description: "Otomatisasi pengiriman pesan massal langsung dari file Excel. Hemat waktu hingga 90% tanpa perlu input manual.",
      icon: <FileSpreadsheet className="w-14 h-14 object-contain" />,
      badge: "Excel Core",
      href: "/app/broadcast",
      gradient: 'from-green-500/20 to-blue-500/5',
      borderColor: 'group-hover:border-green-500/40',
      iconBg: 'bg-green-500/10 text-green-400',
      btnText: 'Tingkatkan Kualitas',
      status: "coming_soon",
    },
  ];
  return (
    <div className="w-full bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <section className="max-w-5xl mx-auto pt-20 pb-12 px-4 sm:px-6">

        {/* Header Section Clean */}
        <div className="max-w-2xl text-left mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 rounded-md">
            Alat Utama
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
            Alat Olah Dokumen & Gambar
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Pilih fungsionalitas di bawah ini untuk mulai memproses berkas secara instan dengan efisiensi performa terbaik.
          </p>
        </div>

        {/* Grid Bento Minimalis */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          {features.map((feature) => (
            <Link
              key={feature.id}
              href={feature.url}
              className="group relative bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-slate-400 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className={`p-3 rounded-xl ${feature.iconBg}`}>
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-500">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-slate-900 transition-colors">
                <span>Buka Aplikasi</span>
                <div className="flex items-center gap-1.5 text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm group-hover:bg-slate-50 transition-all">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= SECTION 2: EKSTENSI ================= */}
      <section className="max-w-5xl mx-auto pt-8 pb-20 px-4 sm:px-6">

        {/* Sub-Header Clean */}
        <div className="max-w-2xl text-left mb-8 space-y-2 border-t border-slate-100 pt-12">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Ekstensi Tambahan
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Otomasi khusus yang dirancang untuk mempermudah manajemen kebutuhan spesifik Anda.
          </p>
        </div>

        {/* Grid Ekstensi Minimalis */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          {featuresExtensions.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-slate-400 hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] cursor-pointer"
            >
              <div>
                {feature.status === "coming_soon" && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-yellow-50 border border-yellow-200 text-yellow-500">
                    Segera Hadir
                  </span>
                )}
                <div className="flex justify-between items-start mb-5">
                  <div className={`p-3 rounded-xl ${feature.iconBg}`}>
                    {feature.icon}
                  </div>
                  {/* <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-500">
                    {feature.badge}
                  </span> */}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-slate-900 transition-colors">
                <span>Integrasi</span>
                <div className="flex items-center gap-1.5 text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm group-hover:bg-slate-50 transition-all">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER BADGE TRUST (Dibuat super minimalis kelabu) */}
        <div className="mt-20 flex items-center gap-6 text-[11px] text-slate-400 font-medium justify-center border-t border-slate-100 pt-6">
          <div className="flex items-center gap-1.5">
            <Shield size={13} className="text-slate-400" />
            <span>Enkripsi Berkas Aman</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <FileType size={13} className="text-slate-400" />
            <span>Mendukung Ragam Format</span>
          </div>
        </div>

      </section>
    </div>
  );
}