import { NextRequest, NextResponse } from 'next/server';


// export async function POST(request: NextRequest) {
//     try {
//         const headers = request.headers;
//         const authHeader = headers.get("Authorization");
//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
//         }
//         const token = authHeader.substring(7);
//         const formData = await request.formData();
//         const file = formData.get('file');

//         if (!file) {
//             return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//         }

//         return NextResponse.json({
//             message: "Upload success",
//             url: publicUrl
//         }, { status: 200 });

//     } catch (error) {
//         console.error("Upload Error:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }