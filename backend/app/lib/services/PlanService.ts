import { AppError } from "../errors";
import { prisma } from "../prisma";
import { verifyAccessToken } from "../token.service";
import { CreatePlan, UpdatePlan } from "../types";


export async function getPlans() {
    const plans = await prisma.planModel.findMany();
    plans.map(plan => ({...plan, price: plan.price.toNumber() }));
    return plans;
}

export async function createPlan(token: string, data: CreatePlan) {
    const verifyToken = verifyAccessToken(token);
    if (verifyToken.role !== "admin") {
        throw new AppError("Anda tidak diizinkan untuk", 403);
    }
    const newPlan = await prisma.planModel.create({
        data: data
    });
    return newPlan;
}

export async function getPlan(id: string) {
    return await prisma.planModel.findUnique({
        where: { id }
    })
};

export async function updatePlan(token: string, id: string, data: UpdatePlan) {
    const verifyToken = verifyAccessToken(token);
    if (verifyToken.role !== "admin") {
        throw new AppError("Anda tidak diizinkan untuk", 403);
    }
    return await prisma.planModel.update({
        where: { id },
        data: data
    });
}

