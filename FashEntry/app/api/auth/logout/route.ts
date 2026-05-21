

import { handleError } from "@/app/lib/ErrorHandle";
import { Logout } from "@/app/lib/services/authService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value || "";

        if (!refreshToken) {
            console.log("Token revoked dari DB");
        }
        await Logout(refreshToken);
        const response = NextResponse.json({
            success: true,
            message: "Sip, kamu sudah berhasil logout. Sampai jumpa lagi!"
        });
        response.cookies.set("refreshToken", "", { expires: new Date(0) });
        return response;

    } catch (error) {
        return handleError(error);
    }
}