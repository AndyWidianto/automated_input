"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useAxios from "./Axios";


interface FormDataToInput {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function useSignup() {

    const { apiPublic } = useAxios();
    const [formData, setFormData] = useState<FormDataToInput>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<FormDataToInput>>({});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let errors: Partial<FormDataToInput> = {};
        if (!formData.username.trim()) {
            errors.username = "Username is required";
        }
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match!";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;
        setLoading(true);

        try {
            const res = await apiPublic.post('/api/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            toast.success('Registration successful!');
            console.log('Registration successful:', res.data);
            router.push('/login');
        } catch (error) {
            toast.error('Registration failed!');
            console.error('Registration failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!formData.email.trim()) return;
        try {
            const res = await apiPublic.post("/api/otp-send", {
                email: formData.email
            });

            // Beri feedback kalau email berhasil terkirim
            toast.success("Verification code sent to your email!");
            console.log(res.data);

            // Pindah ke tahap input OTP
            setStep(2);
        } catch (err: any) {
            console.error("OTP Send Error:", err);
            const errorMessage = err?.response?.data?.message || err?.response?.data?.error || "Failed to send OTP. Please try again.";

            toast.error(errorMessage);
        }
    }

    return {
        setErrors,
        handleRegister,
        errors,
        handleChange,
        formData,
        loading,
        setStep,
        step,
        otp,
        setOtp,
        handleVerifyOtp
    }
}