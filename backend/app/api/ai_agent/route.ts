import { handleError } from "@/app/lib/ErrorHandle";
import { ChatAI, getModels } from "@/app/lib/services/AgentService";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        const res = await ChatAI(prompt);
        return NextResponse.json({
            text: res
        });
    } catch (err) {
        return handleError(err);
    }
}

export async function GET() {
    try {
        const res = await getModels();
        return NextResponse.json({
            text: res
        });
    } catch (err) {
        return handleError(err);
    }
}