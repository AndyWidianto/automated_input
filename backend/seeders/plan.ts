import { prisma } from "@/app/lib/prisma";
import { PlanPeriod, Prisma } from "@prisma/client";


export default async function Plans() {
    const newPlans = await prisma.planModel.createMany({
        data: [
            {
                id: 'pro',
                name: 'Pro Plan',
                price: new Prisma.Decimal(25000),
                period: PlanPeriod.MONTHLY,
                description: 'Cocok untuk pengguna aktif yang ingin mengotomatisasi proses input dan broadcast data dengan lebih cepat.',
                features: [
                    '500 Broadcast/day',
                    'Multi User Access maks 5',
                ],
                color: 'blue',
                order: 1,
                isRecommended: false
            },
            {
                id: 'enterprise',
                name: 'Enterprise',
                price: new Prisma.Decimal(100000),
                period: PlanPeriod.MONTHLY,
                description: 'Solusi lengkap untuk tim dan bisnis yang membutuhkan otomatisasi data skala besar dengan kontrol lebih.',
                features: [
                    'Unlimited Broadcast',
                    'Multi User Access maks 5',
                    'Custom Automation Flow',
                ],
                color: 'indigo',
                order: 2,
                isRecommended: true
            }
        ],
        skipDuplicates: true 
    });

    return newPlans;
}