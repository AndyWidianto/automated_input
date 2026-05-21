import { PlanPeriod } from "@prisma/client";


export interface Plan {
    id: string;
    name: string;
    price: number;
    period: string;
    description: string;
    features: string[];
    color: string;
    discount: number;

    isActive: boolean;
    isRecommended: boolean;
    order: number;
}
export interface CreatePlan {
    id: string;
    name: string;
    price: string;
    period: PlanPeriod;
    description: string;
    features: string[];
    color: string;
    discount: number;
    isActive: boolean;
    isRecommended: boolean;
    order: number;
}

export interface UpdatePlan {
    id?: string;
    name?: string;
    price?: string;
    period?: PlanPeriod;
    description?: string;
    features?: string[];
    color?: string;
    discount?: number;
    isActive?: boolean;
    isRecommended?: boolean;
    order?: number;
}
