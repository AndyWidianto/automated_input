"use client";

import { useEffect, useState } from "react";
import type { Plan } from "../types";
import { useRouter } from "next/navigation";
import useAxios from "./Axios";
import { toast } from "sonner";


export default function usePayment() {
    const { apiPrivate } = useAxios();
    const [selectedPlan, setSelectedPlan] = useState<string>('pro');
    const [plans, setPlans] = useState<Plan[]>([]);
    const router = useRouter();

    const handleCheckout = (plan: Plan) => {
        router.push(`/store/checkout/${plan.id}`)
    }

    const fetchPlans = async () => {
        try {
            const res = await apiPrivate.get("/api/plans");
            console.log(res.data);
            const data = res.data;
            setPlans(data);
        } catch (err) {
            console.error(err);
            toast.error("Maaf terjadi kesalahan mohon periksa jaringan ada!");
        }
    }

    useEffect(() => {
        fetchPlans();
    }, []);

    return {
        plans,
        selectedPlan,
        setSelectedPlan,
        handleCheckout
    }
}