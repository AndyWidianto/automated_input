import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../token.service";
import { AppError, BadRequestError } from "../errors";


export async function Login(email: string, password: string, deviceId?: string) {
    const existing = await prisma.user.findUnique({
        where: { email }
    });

    if (!existing) {
        throw new BadRequestError("Email atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(password, existing.password);
    if (!isPasswordValid) {
        throw new BadRequestError("Email atau password salah");
    }

    await prisma.refreshToken.deleteMany({
        where: {
            userId: existing.id,
            expiresAt: { lt: new Date() }
        }
    });

    const accessToken = createAccessToken({ userId: existing.id, role: existing.role, email: existing.email });
    const refreshToken = createRefreshToken({ userId: existing.id, role: existing.role, email: existing.email });

    const activeSessions = await prisma.refreshToken.count({
        where: { userId: existing.id }
    });

    const limits: Record<string, number> = { FREE: 1, PRO: 5, ENTERPISE: 5 };
    const maxLimit = limits[existing.plan] || 1;

    if (activeSessions >= maxLimit) {
        throw new AppError(`Limit login tercapai (${maxLimit} perangkat). Silakan logout dari perangkat lain.`, 409);
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
        data: {
            userId: existing.id,
            token: refreshToken,
            deviceId: deviceId || "Web Browser",
            expiresAt
        }
    });

    return { success: true, message: "Login berhasil", accessToken, refreshToken };
}

export async function Register(name: string, email: string, password: string) {
    const existing = await prisma.user.findUnique({
        where: { email },
    });

    if (existing) {
        throw new BadRequestError("Email sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: "USER",
        },
    });

    return { success: true, message: "Registrasi berhasil", user: { id: newUser.id, email: newUser.email } };
}

export async function refreshToken(token: string) {
    const payload = verifyRefreshToken(token);
    console.log("Payload token: ", payload);
    if (!payload) {
        throw new AppError("Refresh token tidak valid", 401);
    }
    const accessToken = createAccessToken({ userId: payload.userId, role: payload.role, email: payload.email });

    return { success: true, message: "Token refreshed successfully", accessToken };
}


export async function Logout(token: string) {
    const payload = verifyRefreshToken(token);
    if (!payload) {
        throw new AppError("Refresh token tidak valid", 401);
    }
    await prisma.refreshToken.delete({
        where: {
            userId: payload.userId,
            token: token
        }
    });
    return true;
}


