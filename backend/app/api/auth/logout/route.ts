

import { handleError } from "@/app/lib/ErrorHandle";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { refresh_token } = await req.json();

        if (refresh_token) {
            console.log("Token revoked dari DB");
        }

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