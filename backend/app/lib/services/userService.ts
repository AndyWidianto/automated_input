import { AppError, UnauthorizedError } from "../errors";
import { prisma } from "../prisma";
import { verifyAccessToken } from "../token.service";
import { UpdateUser } from "../types";
import bcrypt from "bcryptjs";


export async function updateUser(token: string, data: UpdateUser) {
    const allowedFields = ["name", "email", "password", "usedExcel"];
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
    if (data.usedExcel) {
        query = {
            ...query,
            usedExcel: user.usedExcel + data.usedExcel,
        }
    }

    await prisma.user.update({
        where: { id: userId },
        data: query
    });

    return { success: true, message: "User updated successfully" };
}