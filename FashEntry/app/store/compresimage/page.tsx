"use client";
import useAxios from '@/app/lib/hooks/Axios';
import { Image } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function ImageCompressorDashboard() {
    const { apiPrivate } = useAxios();
    const [quality, setQuality] = useState<number>(80);
    const [format, setFormat] = useState<string>('webp');
    const [maxWidth, setMaxWidth] = useState<number>(1920);
    const [isCompressing, setIsCompressing] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [resultCompressed, setResultCompressed] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [originalSizeKB, setOriginalSizeKB] = useState<number>(0);
    // Formula estafet sederhana untuk simulasi penurunan ukuran file di UI
    const estimatedSizeKB = Math.round((originalSizeKB * (quality / 100)) * (format === 'webp' ? 0.4 : format === 'png' ? 0.85 : 0.6));
    const savedPercentage = Math.round(((originalSizeKB - estimatedSizeKB) / originalSizeKB) * 100);

    const handleCompress = async () => {
        if (!image) return;
        setIsCompressing(true);
        try {
            const dataToSend = new FormData();
            dataToSend.append('image', image);
            dataToSend.append('quality', quality.toString());
            dataToSend.append('format', format);
            dataToSend.append('maxWidth', maxWidth.toString());
            const res = await apiPrivate.post('/api/compress-image', dataToSend);
            const result = res.data;
            handleDownload(result.data);
            setIsCompressing(false);
            setIsSuccess(true);
        } catch (error) {
            console.error('Error compressing image:', error);
            setIsCompressing(false);
            setIsSuccess(false);
            toast.error('Gagal mengompres gambar. Silakan coba lagi.');
        }
    };

    const handleDownload = (result: string) => {
        if (result) {
            const link = document.createElement('a');
            const isBase64Pure = !result.startsWith('data:');
            link.href = isBase64Pure ? `data:image/${format};base64,${result}` : result;

            link.download = `compressed-image.${format}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setOriginalSizeKB(Math.round(file.size / 1024));
            setPreview(URL.createObjectURL(file));
            setImage(file);
            setIsSuccess(false);
            inputRef.current!.value = ''; 
        }
    }

    return (
        <div className="min-h-dvh bg-slate-50 text-slate-800 p-4 md:p-8 flex items-center justify-center">
            <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">

                {/* PANEL KIRI: PENGATURAN KOMPRESI (4 Kolom) */}
                <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-1">Image Compressor</h2>
                        <p className="text-xs text-slate-500 mb-6">Optimalkan ukuran file gambar dengan cepat & efisien.</p>

                        <div className="space-y-5">
                            {/* Pengaturan Format */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Format Tujuan</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['jpeg', 'png', 'webp'].map((f) => (
                                        <button
                                            key={f}
                                            type="button"
                                            onClick={() => setFormat(f)}
                                            className={`py-2 text-xs font-medium rounded-lg border capitalize transition-all ${format === f
                                                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Slider Kualitas */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kualitas Gambar</label>
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{quality}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={quality}
                                    onChange={(e) => setQuality(Number(e.target.value))}
                                    disabled={format === 'png'} // PNG biasanya lossless, level kompresi beda cara
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-30"
                                />
                                {format === 'png' && (
                                    <p className="text-[10px] text-amber-700 mt-1">ℹ️ Format PNG menggunakan lossless compression level (Otomatis).</p>
                                )}
                            </div>

                            {/* Batas Lebar (Resize) */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Maksimal Lebar (Px)</label>
                                <input
                                    type="number"
                                    value={maxWidth}
                                    onChange={(e) => setMaxWidth(Number(e.target.value))}
                                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition shadow-sm"
                                    placeholder="Contoh: 1920"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tombol Eksekusi */}
                    <button
                        type="button"
                        onClick={handleCompress}
                        disabled={isCompressing}
                        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 rounded-xl font-medium text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isCompressing ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            'Kompres Gambar Sekarang'
                        )}
                    </button>
                </div>
                <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-slate-50/20">

                    {/* Area Dropzone / Preview */}
                    <div onClick={() => inputRef.current && inputRef.current.click()} className="flex-1 min-h-[250px] border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-colors group cursor-pointer">
                        {preview ? (
                            <img src={preview} alt="Preview Gambar" className="max-h-64 object-contain rounded-lg shadow-md" />
                        ) : isCompressing ? (
                            <>
                                <div className="w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
                                <p className="text-sm font-medium text-slate-600 mt-3">Sedang memproses gambar...</p>
                            </>
                        ) : (
                            <>
                                <Image size={32} className="text-slate-400 mb-3 group-hover:text-blue-600 transition-colors" />
                                <p className="text-sm font-medium text-slate-600 group-hover:text-slate-800">Pilih gambar atau drag & drop ke sini</p>
                                <p className="text-xs text-slate-400 mt-1">Mendukung JPEG, PNG, WebP up to 10MB</p>
                            </>
                        )}
                        <input type="file" name="image" id="image" ref={inputRef} className="hidden" onChange={handleFileChange} />
                    </div>

                    {/* Stats Bar Perbandingan Ukuran */}
                    <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center">
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                            <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-1">Ukuran Asli</span>
                            <span className="text-sm font-bold text-slate-700">{(originalSizeKB / 1024).toFixed(2)} MB</span>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl relative overflow-hidden group">
                            <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-1">Hasil Estimasi</span>
                            <span className="text-sm font-bold text-green-600">
                                {estimatedSizeKB >= 1024 ? `${(estimatedSizeKB / 1024).toFixed(2)} MB` : `${estimatedSizeKB} KB`}
                            </span>
                        </div>

                        <div className="bg-green-50 border border-green-100 p-3 rounded-xl flex flex-col justify-center items-center">
                            <span className="block text-[10px] uppercase font-semibold text-green-600 tracking-wider mb-0.5">Hemat Storage</span>
                            <span className="text-base font-extrabold text-green-600">{savedPercentage}%</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}