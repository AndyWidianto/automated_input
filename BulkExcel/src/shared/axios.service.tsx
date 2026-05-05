declare const chrome: any;

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";


export default function useAxios() {
    const navigate = useNavigate();
    const apiPrivate = axios.create({
        baseURL: baseUrl,
        timeout: 20000
    });


    const apiPublic = axios.create({
        baseURL: baseUrl,
        timeout: 20000
    });
    apiPrivate.interceptors.request.use(
        async (config) => {
            const result = await new Promise((resolve) => {
                chrome.storage.local.get(['token'], (res: any) => resolve(res));
            });

            const token = (result as any)?.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );


    apiPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            let message = "";
            if (!error.response) {
                if (error.code === 'ECONNABORTED') {
                    console.error("Request Timeout - Server terlalu lama merespons");
                    message = "Request Timeout - Server terlalu lama merespons";
                } else {
                    console.error("Network Error - Pastikan internet Anda aktif");
                    message = "Network Error - Pastikan internet Anda aktif";
                }

                toast.error(message.trim() || "Gagal terhubung ke server. Periksa koneksi internet Anda.");

                return Promise.reject({
                    message: "Gagal terhubung ke server. Periksa koneksi internet Anda.",
                    code: "NETWORK_ERROR"
                });
            }
            const originalRequest = error.config;


            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                const stat = await chrome.storage.local.get(["refreshToken"]);
                const refreshToken = stat.refreshToken;
                if (!refreshToken) {
                    console.log("Tidak ada refresh token, silakan login ulang");
                    chrome.tabs.create({ url: `${baseUrl}/login` });
                    await chrome.storage.local.remove("token");
                    await chrome.storage.local.remove("broadcast_state");
                    await chrome.storage.local.remove("refreshToken");
                    window.close();
                    return;
                }
                try {
                    const response = await apiPublic.post("/api/auth/refreshToken", { refresh_token: refreshToken }, { withCredentials: true });

                    const { accessToken } = response.data;
                    console.log("AccessToken Baru: ", accessToken);

                    await chrome.storage.local.set({
                        token: accessToken
                    });
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return apiPrivate(originalRequest);

                } catch (refreshError) {
                    console.error("Refresh token expired. Logging out...");
                    navigate("/login");
                    await chrome.storage.local.remove("token");
                    await chrome.storage.local.remove("broadcast_state");
                    await chrome.storage.local.remove("refreshToken");
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
    return { apiPrivate, apiPublic };
}