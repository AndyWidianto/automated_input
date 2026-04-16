import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../token.service";
import { AppError, BadRequestError } from "../errors";


export async function Login(email: string, password: string) {
    const existing = await prisma.user.findUnique({
        where: { email },
    });

    if (!existing) {
        throw new BadRequestError("Email atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(password, existing.password);
    if (!isPasswordValid) {
        throw new BadRequestError("Email atau password salah");
    }

    const accessToken = createAccessToken({ userId: existing.id, role: existing.role, email: existing.email });
    const refreshToken = createRefreshToken({ userId: existing.id, role: existing.role, email: existing.email });

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
    if (!payload) {
        throw new AppError("Refresh token tidak valid", 401);
    }
    

    const accessToken = createAccessToken({ userId: payload.userId, role: payload.role, email: payload.email });

    return { success: true, message: "Token refreshed successfully", accessToken };
}


