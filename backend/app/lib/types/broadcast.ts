import { BroadcastStatus } from "@prisma/client";


export interface CreateBroadcast {
    title: string;
    totalRows: number;
    successRows?: number;
    failedRows?: number;
    status?: BroadcastStatus;
}

export interface UpdateBroadcast {
    title?: string;
    totalRows?: number;
    successRows?: number;
    failedRows?: number;
    status?: BroadcastStatus;
}

export interface Broadcast extends CreateBroadcast {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}