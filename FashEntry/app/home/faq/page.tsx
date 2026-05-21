"use client";
import React, { useState } from 'react';
import { Plus, Minus, MessageCircle, Mail } from 'lucide-react';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "Bagaimana cara kerja otomatisasi input dari Excel?",
            answer: "Cukup upload file Excel (.xlsx atau .csv) Anda ke platform kami. Sistem akan membaca data Anda, lalu Anda bisa melakukan 'mapping' kolom Excel ke field yang ada di website target. Setelah itu, sistem akan mengisi data secara otomatis satu per satu."
        },
        {
            question: "Apakah data saya aman setelah diupload?",
            answer: "Tentu saja. Kami menggunakan enkripsi end-to-end. Data Excel Anda hanya digunakan untuk proses input dan akan otomatis dihapus dari server kami setelah sesi selesai atau sesuai pengaturan privasi Anda."
        },
        {
            question: "Apakah sistem ini bisa bekerja di semua jenis website?",
            answer: "Sistem kami dirancang untuk kompatibel dengan sebagian besar formulir web berbasis standar HTML. Untuk website yang menggunakan sistem keamanan tinggi atau captcha, kami menyediakan fitur khusus untuk membantu proses tersebut."
        },
        {
            question: "Apakah saya perlu kemampuan coding (pemrograman)?",
            answer: "Sama sekali tidak. Interface kami menggunakan sistem Drag-and-Drop dan visual mapping yang sangat mudah digunakan bahkan oleh orang awam sekalipun."
        },
        {
            question: "Berapa banyak data yang bisa saya proses sekaligus?",
            answer: "Tergantung pada paket yang Anda pilih. Paket gratis memungkinkan hingga 100 baris per proses, sementara paket Pro dan Enterprise mendukung hingga puluhan ribu baris data sekaligus."
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-slate-50 border-b border-slate-200 py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Pusat Bantuan</h2>
                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Pertanyaan yang Sering Diajukan
                    </h1>
                    <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
                        Segala hal yang perlu Anda ketahui tentang otomatisasi input data. Tidak menemukan jawaban? Hubungi tim support kami.
                    </p>
                </div>
            </div>

            {/* FAQ Accordion Section */}
            <div className="mx-auto max-w-3xl px-6 py-20">
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-2xl transition-all duration-200 ${openIndex === index ? 'border-emerald-600 ring-1 ring-emerald-600' : 'border-slate-200 hover:border-slate-300'
                                }`}
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                            >
                                <span className={`text-lg font-semibold ${openIndex === index ? 'text-emerald-700' : 'text-slate-900'}`}>
                                    {faq.question}
                                </span>
                                <span className="ml-6 flex-shrink-0 text-slate-400">
                                    {openIndex === index ? (
                                        <Minus className="h-5 w-5 text-emerald-600" />
                                    ) : (
                                        <Plus className="h-5 w-5" />
                                    )}
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-6 pb-6 text-base text-slate-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Support Section */}
            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                <div className="rounded-3xl bg-emerald-600 p-8 md:p-12 shadow-xl shadow-emerald-200 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white">Masih butuh bantuan?</h3>
                        <p className="mt-2 text-emerald-50 text-lg">
                            Tim support kami siap membantu Anda 24/7 untuk masalah teknis atau pertanyaan lainnya.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <a
                            href="mailto:support@automate.com"
                            className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-colors"
                        >
                            <Mail size={18} />
                            Hubungi Email
                        </a>
                        <button
                            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-800 transition-colors"
                        >
                            <MessageCircle size={18} />
                            Live Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;