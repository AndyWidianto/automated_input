import { NextResponse } from "next/server";
import { AppError, BadRequestError, UnauthorizedError } from "./errors";

export function handleError(error: unknown) {
    console.error("API Error Log:", error);

    if (error instanceof AppError) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                code: error.statusCode || "API_ERROR",
            },
            { status: error.statusCode }
        );
    }

    if (error instanceof UnauthorizedError) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                code: error.statusCode || "API_ERROR",
            },
            { status: 401 }
        );
    }

    if (error instanceof BadRequestError) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                code: error.statusCode || "API_ERROR",
            },
            { status: 400 }
        );
    }


    return NextResponse.json(
        {
            success: false,
            message: "Internal Server Error",
            code: "INTERNAL_SERVER_ERROR",
        },
        { status: 500 }
    );
}