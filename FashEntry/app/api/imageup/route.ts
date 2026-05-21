import { handleError } from "@/app/lib/ErrorHandle";
import { upscaleImage } from "@/app/lib/services/documentService";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const scale = formData.get("scale") as string;
    try {
        const hdImage = await upscaleImage(file, scale);
        return NextResponse.json({ image: hdImage });
    } catch (err) {
        console.error("Error upscaling image:", err);
        return handleError(err);
    }
}