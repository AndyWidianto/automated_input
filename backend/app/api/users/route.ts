import { handleError } from "@/app/lib/ErrorHandle";
import { updateUser } from "@/app/lib/services/userService";
import { NextResponse } from "next/dist/server/web/spec-extension/response";


export async function PATCH(request: Request) {
    try {
        const headers = request.headers;
        const data = await request.json();
        const authHeader = headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.substring(7);
        const update = await updateUser(token, data);
        return NextResponse.json({ success: true, message: "User updated successfully", update }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}   