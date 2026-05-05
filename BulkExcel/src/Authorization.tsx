import { useState } from "react";


export default function Authorization({ children }: { children: React.ReactNode }) {
  // const chrome = (window as any).chrome;
  // const baseUrl = import.meta.env.VITE_BASE_URL;

  const [showLoginModal, _setShowLoginModal] = useState(false);

  // const getTokenFromWeb = async () => {
  //   const allCookies = await new Promise((resolve) => {
  //     chrome.cookies.getAll({ domain: "anstoreautomated.biz.id" }, (cookies: any[]) => {
  //       resolve(cookies);
  //     });
  //   });
  //   const targetCookie = (allCookies as any[]).find(c => c.name === "refreshToken");
  //   if (targetCookie) {
  //     await chrome.storage.local.set({ refreshToken: targetCookie.value });
  //     return targetCookie.value;
  //   } else {
  //     console.log("Token tidak ditemukan di storage.");
  //     return null;
  //   }
  // };
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = await getTokenFromWeb();
  //     if (!token) {
  //       setShowLoginModal(true);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // const handleLoginRedirect = () => {
  //   chrome.tabs.create({ url: `${baseUrl}/login` });
  //   window.close();
  // };
  return (
    <div>
      {showLoginModal ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          {/* Overlay Gelap Transparan */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"></div>

          {/* Card Modal */}
          <div className="relative bg-white w-full max-w-sm rounded-[2rem] shadow-2xl border border-slate-100 p-8 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-300">

            {/* Icon Animasi */}
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
              <span className="text-4xl">🔐</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Akses Terbatas
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Sesi Anda tidak ditemukan. Silakan login ke akun <span className="text-blue-600 font-bold">Automate.</span> Anda untuk mulai menggunakan fitur broadcast.
              </p>
            </div>

            <div className="w-full space-y-3">
              <button
                onClick={() => { /*handleLoginRedirect*/}}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Login Sekarang
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <p className="text-[10px] text-slate-400 font-medium italic">
                Belum punya akun? Daftar di website kami.
              </p>
            </div>
          </div>
        </div>
      ) : children}
    </div>
  );
}