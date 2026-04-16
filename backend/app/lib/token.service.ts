import jwt from "jsonwebtoken";


interface TokenPayload extends jwt.JwtPayload {
    userId: string;
    role: string;
    email: string;
}
const JWT_SECRET_ACCESS_TOKEN = process.env.JWT_SECRET_ACCESS_TOKEN!;
const JWT_SECRET_REFRESH_TOKEN = process.env.JWT_SECRET_REFRESH_TOKEN!;
export function createAccessToken({ userId, role, email }: { userId: string; role: string; email: string }) {
    return jwt.sign({ userId, role, email }, JWT_SECRET_ACCESS_TOKEN, { expiresIn: "15m" });
}

export function createRefreshToken({ userId, role, email }: { userId: string; role: string; email: string }) {
    return jwt.sign({ userId, role, email }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET_ACCESS_TOKEN) as TokenPayload;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}

export function verifyRefreshToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET_REFRESH_TOKEN) as TokenPayload;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}