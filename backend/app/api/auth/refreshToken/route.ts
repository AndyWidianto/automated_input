import { handleError } from "@/app/lib/ErrorHandle";
import { refreshToken } from "@/app/lib/services/authService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const cookieStore = await cookies();
        const refToken = cookieStore.get("refreshToken")?.value;

        if (!refToken) {
            return NextResponse.json({ success: false, message: "Refresh token not found" }, { status: 400 });
        }

        const result = await refreshToken(refToken);
        if (!result.success) {
            return NextResponse.json({ success: false, message: result.message }, { status: 401 });
        }

        return NextResponse.json(result.accessToken, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}

export async function POST(req: Request) {
    try {
        const { refresh_token } = await req.json();
        if (!refresh_token) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const result = await refreshToken(refresh_token);
        if (!result.success) {
            return NextResponse.json({ success: false, message: result.message }, { status: 401 });
        }

        return NextResponse.json(result.accessToken, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}