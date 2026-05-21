import { handleError } from "@/app/lib/ErrorHandle";
import { createBroadcast, getBroadcasts } from "@/app/lib/services/broadcastService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { title, totalRows } = await request.json();
    try {
        const headers = request.headers;
        const authHeader = headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.substring(7); // Remove "Bearer " prefix
        const broadcast = await createBroadcast(token, { title, totalRows });
        return NextResponse.json({ success: true, message: "Broadcast created successfully", broadcast }, { status: 201 });
    } catch (error) {
        return handleError(error);
    }
}

export async function GET(request: Request) {
    try {
        const headers = request.headers;
        const authHeader = headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.substring(7); // Remove "Bearer " prefix
        const broadcasts = await getBroadcasts(token);
        return NextResponse.json({ success: true, message: "Broadcasts retrieved successfully", broadcasts }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
