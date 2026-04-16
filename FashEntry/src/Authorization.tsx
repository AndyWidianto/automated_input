import { useEffect } from "react";


export default function Authorization({ children }: { children: React.ReactNode }) {
    const chrome = (window as any).chrome;

    useEffect(() => {
        const checkAuth = async () => {
            const result = await new Promise((resolve) => {
                chrome.storage.local.get(['token'], (res: any) => resolve(res));
            });
            const token = (result as any)?.token;
            if (!token) {
                window.location.href = '#/login';
            }
        };
        checkAuth();
    }, [])
  return (
    <div>
      {children}
    </div>
  );
}