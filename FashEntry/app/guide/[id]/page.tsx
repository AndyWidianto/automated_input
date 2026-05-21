'use client';


export default function GuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* --- SECTION 1: HEADER (TITLE & DESCRIPTION) --- */}
        <header className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">
            Cara Penggunaan Layanan Mandiri Desa
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ikuti panduan di bawah ini untuk memahami cara mengajukan surat pelayanan, 
            mengecek status permohonan, dan menggunakan chatbot pintar kami.
          </p>
        </header>

        {/* --- SECTION 2: FEATURE IMAGE --- */}
        <div className="mb-16">
          <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white border border-slate-200">
            {/* Placeholder untuk Gambar Utama Anda */}
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" 
              alt="Dashboard Preview" 
              className="w-full h-auto object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Antarmuka Pengguna yang Intuitif</h2>
              <p className="text-slate-600 leading-relaxed">
                Halaman dashboard kami dirancang untuk memudahkan Anda dalam mengakses semua fitur hanya dengan beberapa klik. 
                Pastikan Anda sudah login menggunakan akun yang terverifikasi untuk mulai menggunakan layanan.
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: VIDEO TUTORIAL --- */}
        <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Video Tutorial</h2>
          </div>

          {/* Video Player Container */}
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 shadow-inner">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Ganti dengan URL video tutorial Anda
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
            <p className="text-sm text-amber-800">
              <strong>Tips:</strong> Pastikan koneksi internet Anda stabil saat memutar video untuk mendapatkan kualitas gambar terbaik.
            </p>
          </div>
        </section>

        {/* --- FOOTER / CTA --- */}
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© 2026 Evolve WA Platform - Informatics Engineering Project</p>
        </footer>

      </div>
    </div>
  );
}