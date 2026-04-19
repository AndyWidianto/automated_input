import MidtransClient from "midtrans-client";

const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
const clientKey = process.env.MIDTRANS_CLIENT_KEY || "";

const snap = new MidtransClient.Snap({
    isProduction: false,
    serverKey: serverKey,
    clientKey: clientKey
})

export async function createTransaction(planId: "pro" | "enterpise") {
    const plans = {
        pro: 49000,
        enterpise: 99000
    }

    const basePrice = plans[planId];
    const tax = basePrice * 0.11;
    const adminFee = 2500;
    const total = basePrice + tax + adminFee;

    const parameter = {
        transaction_details: {
            order_id: `ORDER-${Date.now()}-1213321`,
            gross_amount: total
        },
        customer_details: {
            first_name: "Andy",
            email: "andywidianto@gmail.com"
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