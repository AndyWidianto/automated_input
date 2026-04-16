declare const chrome: any;

import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";


export const apiPrivate = axios.create({
    baseURL: baseUrl,
    timeout: 20000
});


export const apiPublic = axios.create({
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
        const originalRequest = error.config;


        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const state = await chrome.storage.local.get(["refresh_token"]);
            const refreshToken = state.refresh_token;
            if (!refreshToken) {
                console.log("Tidak ada refresh token, silakan login ulang");
                window.location.href = "/#/login"; 
                return;
            }
            try {
                const response = await apiPublic.post("/auth/refreshToken", { refresh_token: refreshToken }, { withCredentials: true });

                const { accessToken } = response.data;

                await chrome.storage.local.set({
                    token: accessToken
                });
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return apiPrivate(originalRequest);

            } catch (refreshError) {
                console.error("Refresh token expired. Logging out...");
                await chrome.storage.local.clear();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);