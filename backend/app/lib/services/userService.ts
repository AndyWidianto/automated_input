import { createClient } from "@supabase/supabase-js";
import { AppError, UnauthorizedError } from "../errors";
import { prisma } from "../prisma";
import { verifyAccessToken } from "../token.service";
import { UpdateUser } from "../types";
import bcrypt from "bcryptjs";


// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.SUPABASE_SERVICE_ROLE_KEY!
// );


export async function updateUser(token: string, data: UpdateUser) {
    const allowedFields = ["name", "email", "password"];
    Object.keys(data).forEach((key) => {
        if (!allowedFields.includes(key)) {
            delete data[key as keyof UpdateUser];
        }
    });

    const verifyToken = verifyAccessToken(token);
    if (!verifyToken) {
        throw new UnauthorizedError("Unauthorized");
    }

    const userId = (verifyToken as any).userId;
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
    }

    let query = { ...data };

    await prisma.user.update({
        where: { id: userId },
        data: query
    });

    return { success: true, message: "User updated successfully" };
}


export async function getProfile(token: string) {
    const verifyToken = verifyAccessToken(token);
    const existing = await prisma.user.findUnique({
        where: { id: verifyToken.userId },
        select: {
            id: true,
            name: true,
            email: true,
            plan: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        }
    });
    return existing;
}

// export async function uploadProfile(token: string, file: File) {
//     const verifyToken = verifyAccessToken(token);
//     const existing = await prisma.user.findUnique({
//         where: { id: verifyToken.userId }
//     });
//     if (!existing) {
//         throw new AppError("User not found", 404);
//     }
//     const fileExt = file.name.split('.').pop();
//     const fileName = `${existing.id}/${Date.now()}.${fileExt}`;
//     const filePath = `profiles/${fileName}`;

//     const arrayBuffer = await file.arrayBuffer();
//     const { data: storageData, error: storageError } = await supabase.storage
//         .from('avatars') // Pastikan nama bucket ini sudah ada di Supabase Console
//         .upload(filePath, arrayBuffer, {
//             contentType: file.type,
//             upsert: true,
//         });

//     if (storageError) throw storageError;

//     // 3. Ambil Public URL dari file yang baru diupload
//     const { data: { publicUrl } } = supabase.storage
//         .from('avatars')
//         .getPublicUrl(filePath);

//     /* 4. Update Database (Opsional di sini atau dikembalikan ke frontend)
//        Jika kamu menggunakan Prisma, bisa update di sini:
//        await prisma.user.update({
//           where: { id: userId },
//           data: { url_profile: publicUrl }
//        });
//     */
// }