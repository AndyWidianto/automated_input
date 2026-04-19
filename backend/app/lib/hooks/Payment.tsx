import { useState } from "react";
import type { Plan } from "../types";
import { useRouter } from "next/navigation";


export default function usePayment() {
    const [selectedPlan, setSelectedPlan] = useState<'pro' | 'enterprise'>('pro');
    const router = useRouter();

    const plans: Plan[] = [
        {
            id: 'pro',
            name: 'Pro Plan',
            price: 25000,
            period: '/bulan',
            description: 'Cocok untuk pengguna aktif yang ingin mengotomatisasi proses input dan broadcast data dengan lebih cepat.',
            features: [
                '500 Broadcast/day',
                'Multi User Access maks 5',
            ],
            color: 'blue'
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: 100000,
            period: '/bulan',
            description: 'Solusi lengkap untuk tim dan bisnis yang membutuhkan otomatisasi data skala besar dengan kontrol lebih.',
            features: [
                'Unlimited Broadcast',
                'Multi User Access maks 5',
                'Custom Automation Flow',
            ],
            color: 'indigo'
        }
    ];

    const handleCheckout = (plan: Plan) => {
        localStorage.setItem("plan", JSON.stringify(plan));
        router.push("/app/payment/checkout")
    }

    return {
        plans,
        selectedPlan,
        setSelectedPlan,
        handleCheckout
    }
}