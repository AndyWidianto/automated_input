import { handleError } from "@/app/lib/ErrorHandle";
import { compressAnyImage } from "@/app/lib/services/documentService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData(); 
    const imageFile = formData.get('image') as File;
    const quality = parseInt(formData.get('quality') as string) || 80;
    const format = (formData.get('format') as string) || 'jpeg';
    const maxWidth = parseInt(formData.get('maxWidth') as string) || 1920;

    if (!imageFile) {
        return NextResponse.json({ success: false, message: 'Tidak ada gambar yang diunggah.' }, { status: 400 });
    }
    try {
        const base64String = await compressAnyImage(imageFile, { quality, maxWidth: maxWidth, pngCompressionLevel: 7, format: format as any });
        return NextResponse.json({ success: true, message: 'Gambar berhasil dikompres.', data: base64String });
    } catch (err) {
        console.error('Compression error:', err);
        return handleError(err);
    }
}