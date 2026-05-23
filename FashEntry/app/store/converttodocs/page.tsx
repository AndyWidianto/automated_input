"use client";
import React, { useState, useRef } from 'react';
import { Upload, FileText, ArrowRight, RefreshCw, Download, FileSpreadsheet, File, CheckCircle2, Shield, Info } from 'lucide-react';
import useAxios from '@/app/lib/hooks/Axios';
import { toast } from 'sonner';

export default function ConvertToDocs() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [outputFormat, setOutputFormat] = useState('docx'); // docx, txt, pdf-text
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { apiPrivate } = useAxios();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsSuccess(false);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append("file", file);
      dataToSend.append("type", outputFormat);
      const response = await apiPrivate.post('/api/converttodocs', dataToSend);
      const result = response.data;
      setOutput(result.document);
      setIsProcessing(false);
      setIsSuccess(true);
    } catch (error) {
      setIsProcessing(false);
       toast.error('Gagal mengompres gambar. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!output) return;

    let blob: Blob;
    const base64Data = output?.includes(',') ? output.split(',')[1] : output;
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    if (outputFormat === 'docx') {
      const byteArray = new Uint8Array(byteNumbers);
      blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    } else {
      const byteArray = new Uint8Array(byteNumbers);
      blob = new Blob([byteArray], { type: 'text/plain' });
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `converted_document.${outputFormat === 'docx' ? 'docx' : 'txt'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    setFile(null);
    setIsSuccess(false);
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex items-center justify-center p-4 sm:p-10 font-sans selection:bg-slate-100 selection:text-slate-900">
      <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] grid lg:grid-cols-12">
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-slate-200">

          {!file ? (
            // Dropzone Awal
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-slate-300 hover:border-slate-400 bg-white rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200 group h-[400px]"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                className="hidden"
              />
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 group-hover:bg-slate-100 transition-colors shadow-sm">
                <Upload size={22} />
              </div>
              <div className="text-center space-y-1">
                <p className="font-bold text-slate-900 text-sm">Unggah berkas gambar atau PDF</p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Tarik & lepas file dokumen pindaian, foto teks, atau PDF digital Anda di sini. Maksimal ukuran file 15MB.
                </p>
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center h-[400px] bg-white border border-slate-200 rounded-xl p-6 text-center">
              {!isProcessing && (
                <button
                  onClick={resetAll}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors border border-transparent hover:border-slate-200 bg-slate-50"
                >
                  <X size={14} />
                </button>
              )}
              {!isSuccess ? (
                <div className="space-y-4 w-full max-w-sm">
                  <div className="mx-auto w-16 h-16 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 shadow-inner">
                    <File size={32} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm truncate px-4">{file.name}</p>
                    <p className="text-xs text-slate-400 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>

                  {isProcessing && (
                    <div className="pt-4 space-y-2">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-slate-900 h-1.5 rounded-full animate-[loading_2s_ease-in-out_infinite]" style={{ width: '60%' }}></div>
                      </div>
                      <p className="text-[11px] font-bold text-slate-500 tracking-wide flex items-center justify-center gap-1.5">
                        <RefreshCw size={12} className="animate-spin" /> Mengonversi karakter teks...
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // Tampilan Sukses Ekstrak
                <div className="space-y-4 max-w-sm">
                  <div className="mx-auto w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-md">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Konversi Selesai</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Teks dari berkas <span className="font-semibold text-slate-700">{file.name}</span> berhasil diekstrak sepenuhnya menjadi dokumen siap edit.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center gap-1.5 text-slate-600 text-[11px] font-bold tracking-wider uppercase bg-slate-100 border border-slate-200 w-fit px-2.5 py-1 rounded-md">
              <FileText size={12} />
              Konverter Dokumen
            </div>
            <h2 className="text-xl font-black text-slate-900 mt-3 tracking-tight">Ekstrak ke Teks</h2>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              Membaca gambar pindaian secara optik dan menyusun kembali strukturnya menjadi berkas dokumen teks mentah yang fleksibel.
            </p>

            <div className="mt-8 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  Format Keluaran
                </label>

                <div className="space-y-2">
                  {/* Format DOCX */}
                  <button
                    onClick={() => setOutputFormat('docx')}
                    disabled={isProcessing || isSuccess}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${outputFormat === 'docx'
                      ? 'border-slate-900 bg-slate-50/50 shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40'
                      }`}
                  >
                    <div className={`p-2 rounded-lg border ${outputFormat === 'docx' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500'}`}>
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Microsoft Word (.docx)</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Kompatibel untuk Word, Google Docs, dan WPS Office.</p>
                    </div>
                  </button>

                  {/* Format Plain Text */}
                  <button
                    onClick={() => setOutputFormat('txt')}
                    disabled={isProcessing || isSuccess}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${outputFormat === 'txt'
                      ? 'border-slate-900 bg-slate-50/50 shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40'
                      }`}
                  >
                    <div className={`p-2 rounded-lg border ${outputFormat === 'txt' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500'}`}>
                      <FileSpreadsheet size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Plain Text (.txt)</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Teks mentah tanpa format, ringan dan bersih untuk dicopas.</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Info Notifikasi Kecil */}
              <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-start gap-2 text-slate-400 text-[10px] leading-relaxed">
                <Info size={14} className="text-slate-500 shrink-0 mt-0.5" />
                <span>Untuk berkas dokumen ber-Bahasa Indonesia dengan struktur tabel, layout baris otomatis dipertahankan.</span>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            {isSuccess ? (
              <div className="space-y-2">
                <button onClick={handleDownload} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-sm">
                  <Download size={16} />
                  Unduh Dokumen Hasil
                </button>
                <button
                  onClick={resetAll}
                  className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
                >
                  <RefreshCw size={12} />
                  Konversi Berkas Baru
                </button>
              </div>
            ) : (
              <button
                onClick={handleProcess}
                disabled={!file || isProcessing}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 text-white disabled:text-slate-400 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-900 disabled:border-slate-200 transition-all group disabled:cursor-not-allowed text-sm"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw size={16} className="animate-spin text-slate-400" />
                    Mengekstrak Karakter Teks...
                  </>
                ) : (
                  <>
                    Mulai Konversi Dokumen
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

function X({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}