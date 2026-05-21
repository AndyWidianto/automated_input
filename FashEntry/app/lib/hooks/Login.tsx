"use client";

import { toast } from "sonner";
import useAxios from "./Axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/authStore";

export default function useLogin() {
    const { apiPublic } = useAxios();
    const { login } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const router = useRouter();


    const validateForm = () => {
        let errors: Partial<{ email?: string; password?: string }> = {};
        if (!email.trim()) {
            errors.email = "Email is required";
        }
        if (!password.trim()) {
            errors.password = "Password is required";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            const res = await apiPublic.post('/api/auth/login', {
                email,
                password
            }, { withCredentials: true });
            if (res.data.accessToken) {
                localStorage.setItem("token", res.data.accessToken);
            }
            const data = res.data;
            login(data.user, data.accessToken);
            toast.success('Login successful!');
            console.log('Login successful:', data);
            router.push('/store');
        } catch (error) {
            toast.error((error as any).response?.data?.message || 'Login failed!');
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        console.log('Logging in with Google');
    };

    return {
        handleGoogleLogin,
        handleLogin,
        setPassword,
        setEmail, 
        password,
        email,
        setErrors,
        errors,
        loading
    }
}