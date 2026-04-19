"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiPrivate } from "../axios.service";
import { Plan } from "../types";

export default function useCheckout() {
    const [loading, setLoading] = useState(false);
    const selectedPlan: Plan = JSON.parse(localStorage.getItem("plan") || "");
    const route = useRouter();

    const tax = selectedPlan.price * 0.11;
    const adminFee = 2500;
    const totalPrice = selectedPlan.price + tax + adminFee;

    const handlePayment = async () => {
        setLoading(true);
        try {
            const res = await apiPrivate.post("/createTransaction", { planId: selectedPlan.id });
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
        if (!selectedPlan || !selectedPlan.id) {
            route.push("/app/payment");
        }
    }, []);

    return {
        selectedPlan,
        tax,
        adminFee,
        totalPrice,
        handlePayment,
        loading,
        setLoading
    }
}