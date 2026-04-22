import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../token.service";
import { AppError, BadRequestError } from "../errors";
import { createClient } from "../supabase";
import { Resend } from 'resend';
import { Template } from "../emails/template";


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

    const user = {
        id: existing.id,
        email: existing.email,
        name: existing.name,
        role: existing.role,
        plan: existing.plan,
        createdAt: existing.createdAt,
        updatedAt: existing.updatedAt,
    }

    return {
        success: true, message: "Login berhasil", accessToken, refreshToken, user
    };
}

export async function Register(name: string, email: string, password: string, otp: string) {
    const existing = await prisma.otpVerification.findFirst({
        where: { email }
    });
    if (!existing) {
        throw new AppError("OTP not found", 404);
    }
    if (!otp || existing.otpCode !== otp) {
        throw new BadRequestError("OTP is not valid");
    }
    const supabase = createClient();
    const { data: authData, error: authError } = await (await supabase).auth.signUp({
        email,
        password,
        options: {
            data: { email },
        },
    })

    if (authError) throw authError

    if (authData.user) {

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                id: authData.user.id,
                name,
                email,
                password: hashedPassword,
                role: "USER",
            },
        });
    }

    return { success: true, message: "Registrasi berhasil" };
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

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpVerification(email: string) {
    const existing = await prisma.user.findFirst({
        where: { email }
    });
    if (!existing) {
        throw new AppError("Email is already", 400);
    }
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.otpVerification.upsert({
        where: { email: email },
        update: {
            otpCode: otpCode,
            expiresAt: expiresAt,
            createdAt: new Date(),
        },
        create: {
            email: email,
            otpCode: otpCode,
            expiresAt: expiresAt,
        },
    });

    const { data, error } = await resend.emails.send({
        from: 'Automate <no-reply@anstoreautomated.biz.id>',
        to: email,
        subject: 'Verify your Automate account',
        html: Template(otpCode)
    });

    if (error) throw error;

    return { success: true, message: 'OTP sent successfully' };
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


