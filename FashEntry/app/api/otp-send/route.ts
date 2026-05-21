import { handleError } from "@/app/lib/ErrorHandle";
import { sendOtpVerification } from "@/app/lib/services/authService";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        const otp = await sendOtpVerification(email);
        return NextResponse.json(otp);
    } catch (err) {
        console.error(err);
        return handleError(err);
    }
}