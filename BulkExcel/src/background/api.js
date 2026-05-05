import axios from "axios";


const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
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
            chrome.storage.local.get(['token'], (res) => resolve(res));
        });

        const token = result?.token;
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

            const stat = await chrome.storage.local.get(["refreshToken"]);
            const refreshToken = stat.refreshToken;
            if (!refreshToken) {
                console.log("Tidak ada refresh token, silakan login ulang");
                chrome.tabs.create({ url: `${baseUrl}/login` });
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
                chrome.runtime.sendMessage({
                    action: "LOGOUT_REQUIRED"
                })
                await chrome.storage.local.remove("token");
                await chrome.storage.local.remove("refreshToken");
                await chrome.storage.local.remove("broadcast_state");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);