import MidtransClient from "midtrans-client";
import { verifyAccessToken } from "../token.service";
import { prisma } from "../prisma";
import { AppError } from "../errors";

const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
const clientKey = process.env.MIDTRANS_CLIENT_KEY || "";

const snap = new MidtransClient.Snap({
    isProduction: false,
    serverKey: serverKey,
    clientKey: clientKey
})

export async function createTransaction(token: string, planId: string) {
    const verifyToken = verifyAccessToken(token);
    const [plan, user] = await prisma.$transaction([
        prisma.planModel.findFirst({
            where: { id: planId }
        }),
        prisma.user.findUnique({
            where: { id: verifyToken.userId }
        })
    ])

    if (!plan) {
        throw new AppError("Plan not found", 404);
    }
    if (!user) {
        throw new AppError("User not found", 404);
    }

    const basePrice = plan.price;
    const taxRate = 0.11;
    const adminFee = 2500;

    const tax = basePrice.times(taxRate);
    const total = basePrice.plus(tax).plus(adminFee);

    const parameter = {
        transaction_details: {
            order_id: `ORDER-${Date.now()}-1213321`,
            gross_amount: total.toNumber()
        },
        customer_details: {
            id: user.id,
            first_name: user.name,
            email: user.email
        },
        item_details: [
            { id: planId, price: basePrice, quantity: 1, name: `${planId} Package` },
            { id: 'tax', price: tax, quantity: 1, name: 'PPN 11%' },
            { id: 'admin', price: adminFee, quantity: 1, name: 'Biaya Admin' }
        ]
    }
    const transactions = await snap.createTransaction(parameter);
    return transactions;
}