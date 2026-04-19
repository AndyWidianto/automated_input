

export interface Plan {
    id: "pro" | "enterprise";
    name: string;
    price: number;
    period: string;
    description: string;
    features: string[];
    color: string;
}
