import { CheckCircle, ChevronDown, ChevronUp, ShieldAlert, ShieldCheck, Timer, Trash2, X } from "lucide-react";
import useBroadcast from "../shared/hooks/Broadcast";


export default function Broadcast() {
    const {
        statLoading,
        handleCekInput,
        handleChangeFile,
        handleChange,
        handleSubmit,
        urlWebsite,
        setUrlWebsite,
        loading,
        handleStopBroadcast,
        fileInputRef,
        stat,
        isAllowed,
        handleFieldChange,
        fields,
        addField,
        setFields,
        handleRequestPermission,
        sheets,
        onSheetSelect,
        values,
        isOpen,
        setIsOpen,
        TypeProgress
    } = useBroadcast()

    return (
        <div className="min-h-screen bg-slate-50 flex justify-center md:p-8 font-sans">
            {/* Loading Overlay */}
            {statLoading.loading && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin mb-4"></div>
                        <p className="text-slate-900 font-bold">{statLoading.message}</p>
                    </div>
                </div>
            )}

            {sheets.length > 0 && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Pilih Sheet</h3>
                            <button
                                onClick={() => { }} // Asumsi: mengosongkan sheets untuk menutup modal
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* List Content */}
                        <div className="max-height-[60vh] overflow-y-auto p-4">
                            <div className="grid gap-2">
                                {sheets.map((sheet, index) => (
                                    <button
                                        key={index}
                                        onClick={() => onSheetSelect(sheet)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-left bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
                                    >
                                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50">
                                            <svg className="w-5 h-5 text-green-600 dark:text-green-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                                            {sheet}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 text-center">
                            <p className="text-xs text-slate-500">Klik salah satu nama sheet di atas</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200 h-fit overflow-hidden relative">

                {/* Header Modern */}
                <header className="p-8 border-b border-slate-100 bg-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                                Automated<span className="text-blue-600">.</span>
                            </h1>
                        </div>
                        <p className="text-sm text-slate-500 text-center font-medium">
                            Efisiensi kerja dengan otomasi cerdas
                        </p>
                    </div>
                    {/* Dekorasi Background */}
                    <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
                </header>

                <div className="p-8 space-y-8">

                    {/* PERMISSION SECTION (Conditional) */}
                    {!isAllowed ? (
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col items-center text-center space-y-3 animate-in fade-in zoom-in duration-300">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                <ShieldAlert className="text-amber-600" size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-amber-900">Izin Browser Diperlukan</h3>
                                <p className="text-xs text-amber-700 mt-1">Ekstensi membutuhkan izin untuk berinteraksi dengan situs target.</p>
                            </div>
                            <button
                                onClick={handleRequestPermission} // Fungsi tanpa async yang kita bahas
                                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-200"
                            >
                                Izinkan Akses ke Situs Ini
                            </button>
                        </div>
                    ) : (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                <ShieldCheck className="text-emerald-600" size={18} />
                            </div>
                            <span className="text-xs font-bold text-emerald-800">Akses Situs Aktif</span>
                        </div>
                    )}

                    {/* Import Section */}
                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Siapkan Sumber Data</label>
                        <div className="group relative flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-8 bg-slate-50 hover:bg-blue-50 hover:border-blue-400 transition-all cursor-pointer overflow-hidden">
                            <input type="file" accept=".xlsx, .xls" ref={fileInputRef} onChange={handleChangeFile} className="absolute inset-0 opacity-0 z-10 cursor-pointer" />
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                <span className="text-3xl">📂</span>
                            </div>
                            <span className="text-sm text-slate-700 font-bold">Pilih File Excel</span>
                            <p className="text-[10px] text-slate-400 mt-1">Drag & drop atau klik untuk cari file</p>
                        </div>
                    </div>

                    {/* URL & Config Section */}
                    <div className="space-y-5">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Konfigurasi Target</label>

                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={urlWebsite}
                                    onChange={(e) => setUrlWebsite(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                                    placeholder="https://situs-target.com"
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔗</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-slate-500 ml-1">Baris Mulai</span>
                                    <input type="text" name="start" value={stat.start} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-bold text-slate-500 ml-1">Baris Akhir</span>
                                    <input type="text" name="end" value={stat.end} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">Waktu Jeda</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={stat.delay}
                                name="delay"
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                                placeholder="1"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                <Timer size={20} />
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                                Pemetaan Field (Mapping)
                            </label>
                            <button
                                type="button"
                                onClick={addField}
                                disabled={!isAllowed}
                                className="text-blue-600 hover:text-blue-700 text-[11px] font-black uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                            >
                                + Tambah Field
                            </button>
                        </div>

                        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            {fields.length === 0 && (
                                <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <p className="text-xs text-slate-400 font-medium px-4">
                                        Belum ada field. Klik <span className="text-blue-600 font-bold">Scan Target</span> atau <span className="text-blue-600 font-bold">Tambah</span> untuk memulai mapping.
                                    </p>
                                </div>
                            )}

                            {fields.map((field, idx) => (
                                <div
                                    className="group p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all space-y-3 relative"
                                    key={idx}
                                >
                                    <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                                        <span className="text-[10px] font-black text-blue-500 uppercase">Field #{idx + 1}</span>
                                        <button
                                            type="button"
                                            onClick={() => setFields(fields.filter((_fil, i) => i !== idx))}
                                            className="text-slate-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">Nama Input (ID)</span>
                                            <input
                                                type="text"
                                                value={field.name}
                                                name="name"
                                                onChange={(e) => handleFieldChange(idx, e)}
                                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-semibold outline-none focus:bg-white focus:border-blue-400 transition-all"
                                                placeholder="Contoh: nama_lengkap"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">Kolom Excel</span>
                                            <input
                                                type="text"
                                                value={field.field_excel}
                                                name="field_excel"
                                                onChange={(e) => handleFieldChange(idx, e)}
                                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-semibold outline-none focus:bg-white focus:border-blue-400 transition-all"
                                                placeholder="Contoh: A atau Nama"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4 pt-4">
                        <button
                            onClick={handleCekInput}
                            disabled={!isAllowed}
                            className={`w-full flex items-center justify-center gap-3 rounded-2xl py-4 px-4 text-sm font-black transition-all shadow-lg active:scale-[0.97]
                            ${isAllowed ? 'bg-slate-900 text-white shadow-slate-200 hover:shadow-slate-300' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
                        `}
                        >
                            <span>🔍</span> SCAN TARGET FIELDS
                        </button>

                        <form onSubmit={loading ? handleStopBroadcast : handleSubmit}>
                            <button
                                type="submit"
                                disabled={!isAllowed || loading}
                                className={`w-full py-5 rounded-2xl font-black text-base transition-all shadow-xl active:scale-[0.98] 
                                ${loading ? 'bg-red-500 text-white animate-pulse' :
                                        isAllowed ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200' :
                                            'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'}
                            `}
                            >
                                {loading ? "BERHENTI OTOMASI" : "JALANKAN BROADCAST"}
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pb-4">
                        v1.0.0 Stable • Automated
                    </p>
                </div>
            </div>

            {isOpen && <div onClick={() => setIsOpen(false)} className="fixed w-full h-screen bg-black/10"></div>}
            {values.length > 0 && (
                <div
                    className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full md:w-[600px]  bg-gray-50 border border-gray-300 border-b-0 shadow-[0_-8px_20px_-6px_rgba(0,0,0,0.15)]  rounded-t-[2.5rem]  transition-all duration-500 ease-in-out flex flex-col items-center overflow-hidden ${isOpen ? 'h-[50vh] p-6' : 'h-12 p-2 hover:bg-gray-100 cursor-pointer'}`}
                    onClick={() => !isOpen && setIsOpen(true)}
                >
                    {!isOpen ? (
                        <div className="flex flex-col items-center justify-center text-gray-500 group-hover:text-blue-600 transition-colors cursor-pointer">
                            <div className="animate-bounce"><ChevronUp className="w-5 h-5" /></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Open</span>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col">
                            <div className="flex justify-between items-center mb-4 w-full">
                                <h3 className="font-bold text-gray-700">Data Procces</h3>
                                <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
                                    <ChevronDown className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                </button>
                            </div>


                            <div className="flex-1 overflow-auto w-full border border-gray-100 rounded-2xl shadow-inner bg-white/50 backdrop-blur-sm">
                                <table className="min-w-full border-separate border-spacing-0 text-sm">
                                    <thead className="bg-gray-50/80 sticky top-0 z-20">
                                        <tr>
                                            {Object.keys(values[0]).map((key, idx) => (
                                                key !== "status" ? <th key={idx} className="p-4 text-left font-bold text-gray-600 uppercase text-[10px] tracking-wider border-b border-gray-100 whitespace-nowrap">{key}</th> :
                                                    <th key={idx} className="p-4 text-center font-bold text-gray-600 uppercase text-[10px] tracking-wider border-b border-gray-100 sticky right-0 bg-gray-50/90 backdrop-blur-md shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.05)]">
                                                        Status
                                                    </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {values.map((item, i) => (
                                            <tr key={i} className="group hover:bg-blue-50/30 transition-colors">
                                                {Object.entries(item).map(([key, val]) => (
                                                    key !== "status" ? <td className="p-4 whitespace-nowrap">
                                                        <span className="px-2 py-1 text-gray-600 rounded-md text-[12px] font-medium">
                                                            {val as string}
                                                        </span>
                                                    </td> :
                                                        <td className="p-4 text-center sticky right-0 bg-white/80 backdrop-blur-md group-hover:bg-blue-50/80 transition-all shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.05)]">
                                                            <div className="flex items-center justify-center gap-3">
                                                                {val === TypeProgress.pending ? <div className="relative flex items-center justify-center">
                                                                    <div className="w-6 h-6 rounded-full border-[3px] border-gray-100 border-t-blue-500 animate-spin"></div>
                                                                    <div className="absolute w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                                                                </div> : val === TypeProgress.success ?
                                                                    <div className="relative flex items-center justify-center">
                                                                        <CheckCircle className="w-6 h-6 fill-green-200 text-green-600" />
                                                                    </div> :
                                                                    <div className="relative flex items-center justify-center w-6 h-6 rounded-full p-1 bg-red-100">
                                                                        <X className="w-6 h-6 text-red-600" />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

            )}
            {/* Progress Bar/Drawer tetap di bawah seperti kode kamu */}
        </div>
    )
}