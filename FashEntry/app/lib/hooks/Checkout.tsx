"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plan } from "../types";
import useAxios from "./Axios";
import { toast } from "sonner";

export default function useCheckout(plan: string) {
    const { apiPrivate } = useAxios();
    const [loading, setLoading] = useState(false);
    const [stat, setStat] = useState({
        tax: 0,
        adminFee: 0,
        totalPrice: 0
    })
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const route = useRouter();

    const fetchPlan = async () => {
        try {
            const res = await apiPrivate.get(`/api/plans/${plan}`);
            console.log(res.data);
            const data = res.data;
            setSelectedPlan(res.data);
            const basePrice = Number(data.price);
            const tax = basePrice * 0.11;
            const adminFee = 2500;
            const totalPrice = basePrice + tax + adminFee;
            setStat({
                tax,
                adminFee,
                totalPrice
            });
        } catch (err) {
            console.log("Terjadi kesalahan:", err);
            toast.error("Plan tidak tersedia!");
        }
    }

    const handlePayment = async () => {
        if (!selectedPlan) return;
        setLoading(true);
        try {
            const res = await apiPrivate.post("/api/createTransaction", { planId: selectedPlan.id });
            console.log(res.data);
            const data = res.data;
            setTimeout(() => {
                (window as any).snap.pay(data.token, {
                    onSuccess: (result: any) => {
                        console.log('Sukses!', result);
                    },
                    onPending: (result: any) => {
                        console.log('Menunggu pembayaran...', result);
                    },
                    onError: (result: any) => {
                        console.error('Pembayaran gagal!', result);
                    },
                    onClose: () => {
                        console.log('User menutup pop-up sebelum selesai');
                    }
                })
            }, 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPlan();
    }, []);

    return {
        selectedPlan,
        stat,
        handlePayment,
        loading,
        setLoading
    }
}