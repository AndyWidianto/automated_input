import { handleError } from "@/app/lib/ErrorHandle";
import { Login } from "@/app/lib/services/authService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const { email, password } = await request.json();
    try {
        const cookieStore = await cookies();
        const { success, message, accessToken, refreshToken, user } = await Login(email, password);
        if (!success) {
            return NextResponse.json({ success, message }, { status: 401 });
        }
        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000
        })
        return NextResponse.json({ success, message, accessToken, user }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}