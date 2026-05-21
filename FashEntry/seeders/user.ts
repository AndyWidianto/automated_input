import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";


export default async function User() {
    const username = process.env.USERNAME || "admin";
    const email = process.env.EMAIL || "admin@gmail.com";
    const password = process.env.PASSWORD || "rwoepow"
    const passwordHash = await bcrypt.hash(password, 10);
    const existing = await prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if (existing) {
        return existing;
    }
    const user = await prisma.user.create({
        data: {
            name: username,
            email,
            password: passwordHash,
            plan: "ENTERPRISE",
            role: "ADMIN",
        }
    });
    return user;
}