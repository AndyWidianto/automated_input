import { ApiError } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import { BadRequestError, UnauthorizedError } from "./errors";

export function handleError(error: unknown) {
    console.error("API Error Log:", error);

    if (error instanceof ApiError) {
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
            { status: error.statusCode }
        );
    }

    if (error instanceof BadRequestError) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                code: error.statusCode || "API_ERROR",
            },
            { status: error.statusCode }
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