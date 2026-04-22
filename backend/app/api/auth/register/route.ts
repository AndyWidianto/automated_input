import { handleError } from "@/app/lib/ErrorHandle";
import { Register } from "@/app/lib/services/authService";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
    const { name, email, password, otp } = await request.json();
    try {
        const { success, message } = await Register(name, email, password, otp);
        if (!success) {
            return NextResponse.json({ success, message }, { status: 400 });
        }

        return NextResponse.json({ success, message }, { status: 201 });
    } catch (error) {
        return handleError(error);
    }
}