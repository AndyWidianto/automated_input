import { handleError } from "@/app/lib/ErrorHandle";
import { createTransaction } from "@/app/lib/services/transactionService";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const headers = req.headers;
        const authHeader = headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.substring(7);
        const { planId } = await req.json();
        const transaction = await createTransaction(token, planId);
        return NextResponse.json(transaction);
    } catch (err) {
        console.error(err);
        return handleError(err);
    }
}