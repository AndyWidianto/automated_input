"use client";
import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Sliders, ArrowRight, Download, RefreshCw, X, Eye, FileImage } from 'lucide-react';
import useAxios from '@/app/lib/hooks/Axios';

export default function ImageUpscaler() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [hdResult, setHdResult] = useState<string | null>(null);
    const [scale, setScale] = useState<number>(4);
    // const [denoise, setDenoise] = useState<boolean>(true);
    // const [faceRefine, setFaceRefine] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [sliderPosition, setSliderPosition] = useState<number>(50);
    const [sliderPositionActive, setSliderPositionActive] = useState<boolean>(false);
    const { apiPrivate } = useAxios();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setIsSuccess(false);
        }
    };

    const handleProcess = async () => {
        setIsProcessing(true);
        try {
            const dataToSend = new FormData();
            dataToSend.append("file", image as Blob);
            dataToSend.append("scale", scale.toString());
            // dataToSend.append("denoise", denoise.toString());
            // dataToSend.append("faceRefine", faceRefine.toString());
            const res = await apiPrivate.post("/api/imageup", dataToSend);
            setHdResult(res.data.image);
            setIsSuccess(true);
        } catch (Err) {
            console.error("Error processing image:", Err);
            alert("Terjadi kesalahan saat memproses gambar. Silakan coba lagi.");
        } finally {
            setIsProcessing(false);
        }
    };
    const DownloadImage = () => {
        if (!hdResult) {
            alert("Gambar HD belum siap atau belum diproses!");
            return;
        }
        const link = document.createElement("a");
        link.href = hdResult;
        link.download = `hd-image-${image?.name || 'image'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const resetAll = () => {
        setImage(null);
        setPreview(null);
        setHdResult(null);
        setIsSuccess(false);
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 flex items-center justify-center p-4 sm:p-10 font-sans selection:bg-slate-100 selection:text-slate-900">
            <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] grid lg:grid-cols-12">
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-slate-200">
                    {!preview ? (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border border-dashed border-slate-300 hover:border-slate-400 bg-white rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200 group h-[400px]"
                        >
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 group-hover:bg-slate-100 transition-colors shadow-sm">
                                <Upload size={22} />
                            </div>
                            <div className="text-center space-y-1">
                                <p className="font-bold text-slate-900 text-sm">Unggah foto atau logo Anda</p>
                                {/* FIX: Mengubah salinan teks agar fokus pada pemrosesan resolusi teknis gambar */}
                                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                                    Format gambar yang didukung meliputi PNG, JPEG, dan WebP hingga ukuran file maksimal 10MB.
                                </p>
                            </div>
                        </div>
                    ) : (
                        // Image Preview Container
                        <div className="relative flex flex-col items-center justify-center h-[400px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group">
                            <button
                                onClick={resetAll}
                                className="absolute top-4 right-4 z-30 p-2 bg-white/90 backdrop-blur-md text-slate-500 hover:text-rose-600 border border-slate-200 rounded-lg transition-all shadow-sm"
                            >
                                <X size={14} />
                            </button>

                            {!isSuccess ? (
                                // Standar Preview saat upload / memproses
                                <div className="relative w-full h-full flex items-center justify-center p-4">
                                    <img src={preview} alt="Original" className={`max-h-full max-w-full rounded-md object-contain transition-all ${isProcessing ? 'blur-xs opacity-40 duration-500' : ''}`} />
                                    {isProcessing && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/60 backdrop-blur-xs">
                                            <RefreshCw className="animate-spin text-slate-600" size={22} />
                                            <p className="text-xs font-bold text-slate-600 tracking-wide">Meresampling piksel...</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Before/After Slider dengan susunan warna flat
                                <div className="relative w-full h-full select-none" onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                                    if (sliderPositionActive) setSliderPosition(x);
                                }}>
                                    {/* Lapisan Bawah: Sebelum */}
                                    <div className="absolute inset-0 w-full h-full p-4 flex items-center justify-center bg-slate-100 z-0">
                                        <img src={preview} alt="Original Version" className="w-full h-full object-contain rounded-md" />
                                        <span className="absolute bottom-4 left-4 z-10 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                                            Sebelum
                                        </span>
                                    </div>

                                    {/* Lapisan Atas: Sesudah (HD) */}
                                    <div
                                        className="absolute inset-0 p-4 flex items-center justify-center bg-slate-100 overflow-hidden z-10 pointer-events-none"
                                        style={{ clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)` }}
                                    >
                                        <img src={hdResult || preview} alt="HD Version" className="w-full h-full object-contain rounded-md" />
                                        <span className="absolute bottom-4 right-4 z-20 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                                            Sesudah (HD)
                                        </span>
                                    </div>

                                    {/* Garis Handle Slider Minimalis */}
                                    <div
                                        onClick={() => setSliderPositionActive(!sliderPositionActive)}
                                        className="absolute top-0 bottom-0 w-[2px] bg-slate-900 cursor-ew-resize z-20"
                                        style={{ left: `${sliderPosition}%` }}
                                    >
                                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 bg-white border border-slate-300 rounded-full flex items-center justify-center shadow-md text-slate-700">
                                            <Eye size={12} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                    <div>
                        <div className="flex items-center gap-1.5 text-slate-600 text-[11px] font-bold tracking-wider uppercase bg-slate-100 border border-slate-200 w-fit px-2.5 py-1 rounded-md">
                            <FileImage size={12} />
                            Konfigurasi Gambar
                        </div>
                        <h2 className="text-xl font-black text-slate-900 mt-3 tracking-tight">Optimasi Resolusi</h2>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed">Tingkatkan dimensi dan ketajaman baris piksel gambar menggunakan algoritma resampling Lanczos3.</p>

                        {/* Opsi Skala Perbesaran */}
                        <div className="mt-8 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                    <Sliders size={12} /> Faktor Perbesaran
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['2x', '4x', '8x (Ultra)'].map((ratio) => (
                                        <button
                                            key={ratio}
                                            onClick={() => setScale(parseFloat(ratio))}
                                            disabled={isProcessing || !image || isSuccess}
                                            className={`py-2.5 rounded-xl font-bold text-xs border transition-all ${scale === parseFloat(ratio)
                                                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40'
                                                }`}
                                        >
                                            {ratio}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Eksekusi Utama */}
                    <div className="mt-8 lg:mt-0">
                        {isSuccess ? (
                            <div className="space-y-2">
                                {/* Tombol Download Menggunakan Warna Slate/Indigo Solid */}
                                <button onClick={DownloadImage} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-sm">
                                    <Download size={16} />
                                    Unduh Gambar HD
                                </button>
                                <button
                                    onClick={resetAll}
                                    className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
                                >
                                    <RefreshCw size={12} />
                                    Proses Foto Baru
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleProcess}
                                disabled={!image || isProcessing}
                                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 text-white disabled:text-slate-400 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-900 disabled:border-slate-200 transition-all group disabled:cursor-not-allowed text-sm"
                            >
                                {isProcessing ? (
                                    <>
                                        <RefreshCw size={16} className="animate-spin text-slate-400" />
                                        Memproses Resolusi Baru...
                                    </>
                                ) : (
                                    <>
                                        Ubah Menjadi HD ({scale}x)
                                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
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