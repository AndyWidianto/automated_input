import { handleError } from "@/app/lib/ErrorHandle";
import { createPlan, getPlans } from "@/app/lib/services/PlanService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const headers = req.headers;
        const authHeader = headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.substring(7);
        const data = await req.json();
        const plan = await createPlan(token, data);
        return NextResponse.json(plan, { status: 201 });
    } catch (err) {
        console.error(err);
        return handleError(err);
    }
}

export async function GET() {
    try {
        const plans = await getPlans();
        return NextResponse.json(plans);
    } catch (err) {
        console.error(err);
        return handleError(err);
    }
}