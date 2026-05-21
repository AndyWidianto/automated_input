import { handleError } from "@/app/lib/ErrorHandle";
import { getPlan, updatePlan } from "@/app/lib/services/PlanService";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_req: NextRequest, { params }: { params: Promise<{ plan: string }> }) {
    try {
        const { plan } = await params;
        const getplan = await getPlan(plan);
        return NextResponse.json(getplan);
    } catch (err) {
        console.error(err);
        return handleError(err);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ plan: string }> }) {
    try {
        const { plan } = await params;
        const headers = request.headers;
        const data = await request.json();
        const authHeader = headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.substring(7);
        const update = await updatePlan(token, plan, data);
        return NextResponse.json(update, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}