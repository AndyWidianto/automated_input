"use client";

import { useEffect, useState } from "react";
import useAxios from "./Axios";
import { toast } from "sonner";
import useAuthStore from "../store/authStore";


interface Profile {
    name: string;
    email: string;
}
export default function useProfile() {
    const { apiPrivate } = useAxios();
    const { user } = useAuthStore();
    const [formData, setFormData] = useState<Profile>({
        name: "",
        email: ""
    });
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [file, setFile] = useState<File | null>(null);

    // const fetchProfile = async () => {
    //     try {
    //         const res = await apiPrivate.get("/api/users");
    //         console.log(res.data);
    //         const data = res.data.user;
    //         setProfile(data);
    //         setFormData({
    //             name: data.name,
    //             email: data.email
    //         })
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    const handleUploadProfile = async () => {
        if (!file) return;
        try {
            const dataToSend = new FormData();
            dataToSend.append("images", file);
            await apiPrivate.patch("/api/users/upload", dataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success("Successfully update profile")
        } catch (err) {
            console.error(err);
        }
    }

    const handleUpdateProfile = async () => {
        if (!profile) return;
        try {
            const dataToSend: Partial<Profile> = {};
            Object.entries(formData).forEach(([key, val]) => {
                const k = key as keyof Profile;

                if (val !== profile[k]) {
                    (dataToSend as any)[k] = val;
                    profile[k] = val;
                }
            });

            if (Object.keys(dataToSend).length === 0) {
                console.log("Tidak ada perubahan data.");
                return;
            }
            await apiPrivate.patch("/api/users", dataToSend);
            toast.success("Successfully update profile")
        } catch (err) {
            console.error(err);
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        await handleUpdateProfile();
        await handleUploadProfile();
        setLoading(false);
    }

    useEffect(() => {
        // fetchProfile();
        if (user) {
            setFormData({
                name: user.name,
                email: user.email
            })
        }
    }, [user])

    return {
        setFormData,
        formData,
        profile,
        file,
        setFile,
        handleUpdateProfile,
        setLoading,
        loading,
        handleSubmit,
        user
    }
}