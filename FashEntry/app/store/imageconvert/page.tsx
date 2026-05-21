"use client";

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, ArrowRight, CheckCircle, RefreshCw, X } from 'lucide-react';

export default function ImageConverter() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('png');
  const [quality, setQuality] = useState<number>(80);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setIsSuccess(false);
    }
  };

  // Handle Drag and Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setIsSuccess(false);
      }
    }
  };

  const handleConvert = () => {
    setIsConverting(true);
    // Simulasi proses konversi backend / client-side canvas
    setTimeout(() => {
      setIsConverting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const resetConverter = () => {
    setImage(null);
    setPreview(null);
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
        
        {/* LEFT COLUMN: Uploader & Preview */}
        <div className="p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-700/50">
          {!preview ? (
            // Drag and Drop Zone
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-600 hover:border-indigo-500 bg-slate-800/30 hover:bg-indigo-500/5 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 group h-80"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              <div className="p-4 bg-slate-700/50 rounded-2xl group-hover:scale-110 group-hover:bg-indigo-500/10 text-slate-400 group-hover:text-indigo-400 transition-all duration-300">
                <Upload size={32} />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-200">Pilih gambar atau drop di sini</p>
                <p className="text-sm text-slate-400 mt-1">Sertakan PNG, JPG, WebP, atau JPEG</p>
              </div>
            </div>
          ) : (
            // Image Preview Card
            <div className="relative flex flex-col items-center justify-center h-80 bg-slate-950/40 rounded-2xl p-4 border border-slate-700/30">
              <button 
                onClick={resetConverter}
                className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 rounded-xl transition-all"
              >
                <X size={18} />
              </button>
              <img 
                src={preview} 
                alt="Upload preview" 
                className="max-h-56 max-w-full rounded-lg object-contain shadow-md"
              />
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                <ImageIcon size={14} />
                <span className="truncate max-w-[180px]">{image?.name}</span>
                <span>•</span>
                <span>{(image?.size! / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Settings & Action */}
        <div className="p-8 flex flex-col justify-between bg-slate-800/20">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Image Converter
            </h2>
            <p className="text-slate-400 text-sm mt-1">Ubah format gambar kamu secara instan.</p>

            <div className="mt-8 space-y-6">
              {/* Format Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Format Tujuan
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['png', 'jpg', 'webp', 'avif'].map((format) => (
                    <button
                      key={format}
                      onClick={() => setTargetFormat(format)}
                      disabled={isConverting || !image}
                      className={`py-2.5 rounded-xl font-medium uppercase text-sm border transition-all ${
                        targetFormat === format
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20 scale-[1.02]'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Slider (Hanya muncul jika format mendukung kompresi) */}
              {targetFormat !== 'png' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <span>Kualitas Gambar</span>
                    <span className="text-indigo-400 normal-case font-bold">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    disabled={isConverting || !image}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 disabled:opacity-50"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 md:mt-0">
            {isSuccess ? (
              <div className="space-y-3">
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all">
                  <CheckCircle size={20} />
                  Unduh Gambar (. {targetFormat})
                </button>
                <button 
                  onClick={resetConverter}
                  className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
                >
                  Konversi Gambar Lain
                </button>
              </div>
            ) : (
              <button
                onClick={handleConvert}
                disabled={!image || isConverting}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white disabled:text-slate-500 font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:shadow-none shadow-indigo-600/20 border disabled:border-slate-700 border-indigo-500 transition-all group disabled:cursor-not-allowed"
              >
                {isConverting ? (
                  <>
                    <RefreshCw size={20} className="animate-spin text-indigo-400" />
                    Sedang Memproses...
                  </>
                ) : (
                  <>
                    Mulai Konversi
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}