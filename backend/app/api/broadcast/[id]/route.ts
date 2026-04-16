import { handleError } from "@/app/lib/ErrorHandle";
import { deleteBroadcast, updateBroadcast } from "@/app/lib/services/broadcastService";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const headers = request.headers;
        const authHeader = headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.substring(7);
        await deleteBroadcast(token, id);
        return NextResponse.json({ success: true, message: "Broadcast deleted successfully" }, { status: 200 });
    } catch (error) {
        return handleError(error);

    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const headers = request.headers;
        const data = await request.json();
        const authHeader = headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.substring(7); // Remove "Bearer " prefix
        const update = await updateBroadcast(token, id, data);
        return NextResponse.json({ success: true, message: "Broadcast updated successfully", update }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}