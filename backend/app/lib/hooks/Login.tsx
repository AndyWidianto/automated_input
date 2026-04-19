import { toast } from "sonner";
import useAxios from "./Axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useLogin() {
    const { apiPublic } = useAxios();
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
        try {
            const res = await apiPublic.post('/api/auth/login', {
                email,
                password
            }, { withCredentials: true });
            if (res.data.accessToken) {
                localStorage.setItem("token", res.data.accessToken);
            }
            toast.success('Login successful!');
            console.log('Login successful:', res.data);
            router.push('/store');
        } catch (error) {
            toast.error((error as any).response?.data?.message || 'Login failed!');
            console.error('Login failed:', error);
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
        errors
    }
}