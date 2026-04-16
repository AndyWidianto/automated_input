export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Menandakan ini error yang kita buat sendiri

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Data yang dikirim tidak valid") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Silakan login kembali") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Anda tidak memiliki akses untuk aksi ini") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resources tidak ditemukan") {
    super(message, 404);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Terjadi kesalahan pada server") {
    super(message, 500);
  }
}