import { handleError } from "@/app/lib/ErrorHandle";
import { Register } from "@/app/lib/services/authService";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
    const { username, email, password, otp } = await request.json();
    try {
        const { success, message } = await Register(username, email, password, otp);
        if (!success) {
            return NextResponse.json({ success, message }, { status: 400 });
        }

        return NextResponse.json({ success, message }, { status: 201 });
    } catch (error) {
        return handleError(error);
    }
}