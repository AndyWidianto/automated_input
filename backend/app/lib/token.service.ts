import jwt from "jsonwebtoken";
import { UnauthorizedError } from "./errors";
import { TokenPayload } from "./types";


const JWT_SECRET_ACCESS_TOKEN = process.env.JWT_SECRET_ACCESS_TOKEN!;
const JWT_SECRET_REFRESH_TOKEN = process.env.JWT_SECRET_REFRESH_TOKEN!;
export function createAccessToken({ userId, role, email }: { userId: string; role: string; email: string }) {
    return jwt.sign({ userId, role, email }, JWT_SECRET_ACCESS_TOKEN, { expiresIn: "15m" });
}

export function createRefreshToken({ userId, role, email }: { userId: string; role: string; email: string }) {
    return jwt.sign({ userId, role, email }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: "7d" });
}


function verifyToken(token: string, secret: string): TokenPayload {
    try {
        return jwt.verify(token, secret) as TokenPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.error("Token status: Expired");
            throw new UnauthorizedError("Token telah kadaluwarsa");
        }

        if (error instanceof jwt.JsonWebTokenError) {
            console.error("Token status: Malformed/Invalid Signature");
            throw new UnauthorizedError("Token tidak valid");
        }

        console.error("Token status: Unknown error", error);
        throw new UnauthorizedError("Gagal memvalidasi sesi");
    }
}

export const verifyAccessToken = (token: string) =>
    verifyToken(token, JWT_SECRET_ACCESS_TOKEN);

export const verifyRefreshToken = (token: string) =>
    verifyToken(token, JWT_SECRET_REFRESH_TOKEN);