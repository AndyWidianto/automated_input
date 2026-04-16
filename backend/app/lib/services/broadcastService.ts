import { BroadcastStatus } from "@prisma/client";
import { verifyAccessToken } from "../token.service";
import { prisma } from "../prisma";
import { UpdateBroadcast } from "../types";
import { AppError, BadRequestError, UnauthorizedError } from "../errors";


export async function createBroadcast(token: string, { title, totalRows }: { title: string; totalRows: number }) {
    const verifyToken = verifyAccessToken(token);
    if (!verifyToken) {
        throw new UnauthorizedError("Unauthorized");
    }

    const userId = (verifyToken as any).userId;
    const broadcast = await prisma.broadcast.create({
        data: {
            title,
            totalRows,
            status: BroadcastStatus.PENDING,
            userId,
        },
    });
    return { success: true, message: "Broadcast created successfully", broadcast };
}

export async function getBroadcasts(token: string) {
    const verifyToken = verifyAccessToken(token);
    if (!verifyToken) {
        throw new UnauthorizedError("Unauthorized");
    }

    const userId = (verifyToken as any).userId;
    const broadcasts = await prisma.broadcast.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
    return { success: true, message: "Broadcasts retrieved successfully", broadcasts };
}

export async function getBroadcastById(token: string, broadcastId: string) {
    const verifyToken = verifyAccessToken(token);
    if (!verifyToken) {
        throw new UnauthorizedError("Unauthorized");
    }

    const userId = (verifyToken as any).userId;
    const broadcast = await prisma.broadcast.findFirst({
        where: { id: broadcastId, userId },
    });

    if (!broadcast) {
        throw new AppError("Broadcast not found", 404);
    }

    return { success: true, message: "Broadcast retrieved successfully", broadcast };
}

export async function deleteBroadcast(token: string, broadcastId: string) {
    const verifyToken = verifyAccessToken(token);
    if (!verifyToken) {
        throw new UnauthorizedError("Unauthorized");
    }

    const userId = (verifyToken as any).userId;
    const broadcast = await prisma.broadcast.findFirst({
        where: { id: broadcastId, userId },
    });

    if (!broadcast) {
        throw new AppError("Broadcast not found", 404);
    }

    await prisma.broadcast.delete({
        where: { id: broadcastId },
    });

    return { success: true, message: "Broadcast deleted successfully" };
}

export async function updateBroadcast(token: string, broadcastId: string, data: UpdateBroadcast) {

    const fieldData = ["title", "totalRows", "status", "successRows", "failedRows"];
    Object.keys(data).forEach((key) => {
        if (!fieldData.includes(key)) {
            delete data[key as keyof UpdateBroadcast];
        }
    });
    let query = { ...data };
    const verifyToken = verifyAccessToken(token);
    if (!verifyToken) {
        throw new UnauthorizedError("Unauthorized");
    }

    const userId = (verifyToken as any).userId;
    const broadcast = await prisma.broadcast.findFirst({
        where: { id: broadcastId, userId },
    });

    if (!broadcast) {
        throw new AppError("Broadcast not found", 404);
    }

    if (data.successRows) {
        query = {
            ...query,
            successRows: broadcast.successRows + data.successRows,
        };
    }

    if (data.failedRows) {
        query = {
            ...query,
            failedRows: broadcast.failedRows + data.failedRows,
        }
    }

    await prisma.$transaction([
        prisma.broadcast.update({
            where: { id: broadcastId },
            data: query,
        }),
        prisma.user.update({
            where: { id: userId },
            data: {
                usedBroadcasts: {
                    increment: 1
                }
            }
        })
    ])

    return { success: true, message: "Broadcast updated successfully" };
}