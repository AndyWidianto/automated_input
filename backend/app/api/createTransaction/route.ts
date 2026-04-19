import { handleError } from "@/app/lib/ErrorHandle";
import { createTransaction } from "@/app/lib/services/transactionService";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { planId } = await req.json();
        const transaction = await createTransaction(planId);
        return NextResponse.json(transaction);
    } catch (err) {
        console.error(err);
        return handleError(err);
    }
}