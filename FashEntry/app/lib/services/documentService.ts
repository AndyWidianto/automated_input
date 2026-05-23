import sharp from "sharp";
import { AppError } from "../errors";
import fs from "fs";
import path from "path";
import os from "os";
import { exec } from "child_process";
import { promisify } from "util";
import { createWorker } from 'tesseract.js';


export async function upscaleImage(file: File, scale: string): Promise<string> {
  const scaleFactor = parseFloat(scale);
  if (isNaN(scaleFactor) || scaleFactor <= 0) {
    throw new Error("Invalid scale factor");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const image = sharp(buffer);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error("Unable to retrieve image dimensions");
  }

  const newWidth = Math.round(metadata.width * scaleFactor);
  const newHeight = Math.round(metadata.height * scaleFactor);

  const hdImageBuffer = await sharp(buffer)
    .ensureAlpha()
    .resize({
      width: newWidth,
      height: newHeight,
      kernel: sharp.kernel.lanczos3
    })
    .modulate({
      brightness: 1.05,
      saturation: 1.25,
    })
    .sharpen({
      sigma: 1.5,
      m1: 3.0,
      m2: 7.0            // Tingkat ketajaman tepi objek ditingkatkan sedikit
    })
    .toFormat('png', { compressionLevel: 9 })
    .toBuffer();

  return `data:image/png;base64,${hdImageBuffer.toString("base64")}`;
}


async function extractTextFromImage(fileBuffer: Buffer): Promise<string> {
  const localWorkerPath = path.join(
    process.cwd(),
    'node_modules',
    'tesseract.js',
    'src',
    'worker-script',
    'node',
    'index.js'
  );
  const worker = await createWorker('ind', 1, {
    workerPath: localWorkerPath,
    logger: m => console.log(m) // Memantau proses scan teks di terminal
  });
  try {
    const { data: { text } } = await worker.recognize(fileBuffer);
    return text;
  } catch (error) {
    console.error("Tesseract OCR Error:", error);
    throw new Error("Gagal membaca teks dari gambar.");
  } finally {
    await worker.terminate();
  }
}

export async function convertFile(
  file: File
): Promise<string> {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Tipe file tidak didukung."
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  let extractedText: string = "";
  if (file.type === "application/pdf") {
    const text = await extractTextFromImage(buffer);
    extractedText = text;
  } else {
    const text = await extractTextFromImage(buffer);
    extractedText = text;
  }
  const docBuffer = Buffer.from(extractedText, "utf-8");
  return docBuffer.toString("base64");
}


interface CompressOptions {
  maxWidth?: number;
  quality?: number; // Untuk JPEG, WebP, AVIF (1-100)
  pngCompressionLevel?: number; // Untuk PNG (0-9)
  format?: 'jpeg' | 'png' | 'webp' | 'avif'; // Format output yang diinginkan
}

export async function compressAnyImage(
  file: File,
  options: CompressOptions = {}
) {

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Tipe file tidak didukung."
    );
  }
  const {
    maxWidth = 1920,
    quality = 80,
    pngCompressionLevel = 7,
    format = "png"
  } = options;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const imagePipeline = sharp(buffer);
    const metadata = await imagePipeline.metadata();
    if (metadata.width && metadata.width > maxWidth) {
      imagePipeline.resize({ width: maxWidth, withoutEnlargement: true });
    }
    const format = metadata.format;

    switch (format) {
      case 'jpeg':
      case 'jpg':
        imagePipeline.jpeg({
          quality: quality,
          progressive: true,
          mozjpeg: true
        });
        break;

      case 'png':
        imagePipeline.png({
          compressionLevel: pngCompressionLevel,
          palette: true
        });
        break;

      case 'webp':
        imagePipeline.webp({ quality: quality, effort: 4 });
        break;

      case 'avif':
        imagePipeline.avif({ quality: quality, effort: 4 });
        break;

      case 'svg':
        console.warn('Format SVG terdeteksi. Sharp akan menyalin tanpa kompresi vektor.');
        break;

      default:
        console.log(`Format ${format} menggunakan konfigurasi default.`);
    }

    const data = await imagePipeline.toBuffer();
    return `data:image/${format};base64,${data.toString("base64")}`;

  } catch (error) {
    console.error('❌ Gagal mengompresi gambar:', error);
    throw error;
  }
}

