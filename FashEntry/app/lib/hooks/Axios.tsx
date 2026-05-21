import axios from "axios";

export default function useAxios() {
    const apiPrivate = axios.create({
        timeout: 40000
    });


    const apiPublic = axios.create({
        timeout: 40000
    });
    apiPrivate.interceptors.request.use(
        async (config) => {
            const token = localStorage.getItem("token");
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
                try {
                    const response = await apiPublic.get("/api/auth/refreshToken", { withCredentials: true });

                    const { accessToken } = response.data;
                    console.log("AccessToken Baru: ", accessToken);

                    localStorage.setItem("token", accessToken);
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return apiPrivate(originalRequest);

                } catch (refreshError) {
                    console.error("Refresh token expired. Logging out...");
                    localStorage.removeItem("token");
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
    return {
        apiPrivate,
        apiPublic
    }
}