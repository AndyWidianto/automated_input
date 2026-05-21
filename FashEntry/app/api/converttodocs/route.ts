import { convertFile } from "@/app/lib/services/documentService";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;
    try {
        // Proses konversi file menggunakan layanan eksternal atau library internal
        const convertedFileUrl = await convertFile(file);
        return NextResponse.json({ document: convertedFileUrl});
    } catch (error) {
        console.error("Error converting file:", error);
        return new Response(JSON.stringify({ error: "Terjadi kesalahan saat mengonversi file." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}