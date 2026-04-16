import { CheckCircle, ChevronDown, ChevronUp, Trash2, X } from "lucide-react";
import useBroadcast from "../shared/hooks/Broadcast";


export default function Broadcast() {
    const {
        statLoading,
        handleCekInput,
        handleChangeFile,
        handleChange,
        handleSubmit,
        urlWebsite,
        setIsOpen,
        setUrlWebsite,
        start,
        addField,
        fields,
        handleFieldChange,
        setFields,
        loading,
        isOpen,
        values,
        handleStopBroadcast,
        fileInputRef,
        TypeProgress,
        delay
    } = useBroadcast()

    return (
        <div className="min-h-screen bg-slate-50 flex justify-center md:p-4">
            {statLoading.loading && <div className="fixed top-0 left-0 w-full h-screen bg-black/40 z-30">
                <div className="flex flex-col h-full items-center justify-center text-white font-semibold">
                    <div className="w-10 h-10 rounded-full border-3 border-gray-200 border-t-blue-500 animate-spin"></div>
                    {statLoading.message}
                </div>
            </div>}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 h-fit overflow-hidden">

                {/* Header - Lebih Clean */}
                <header className="p-6 border-b border-slate-100 bg-white">
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Evolve <span className="text-blue-600">Automator</span></h1>
                    <p className="text-sm text-slate-500 mt-1">Otomasi data manual & Excel</p>
                </header>

                <div className="p-6 space-y-6">

                    {/* Quick Action - Search Field */}
                    <button
                        onClick={handleCekInput}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 py-3 px-4 text-white text-sm font-semibold transition-all shadow-sm active:scale-[0.98]"
                    >
                        <span className="text-lg">🔍</span> Scan Target Fields
                    </button>

                    {/* Import Section - Lebih Modern */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sumber Data</label>
                        <div className="group relative flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50 hover:bg-blue-50 hover:border-blue-400 transition-all cursor-pointer">
                            <input type="file" accept=".xlsx, .xls" ref={fileInputRef} onChange={handleChangeFile} className="absolute inset-0 opacity-0 cursor-pointer" />
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">📊</span>
                            </div>
                            <span className="text-sm text-slate-600 font-semibold group-hover:text-blue-700">Upload File Excel</span>
                            <span className="text-xs text-slate-400 mt-1">.xlsx atau .xls file</span>
                        </div>
                    </div>

                    {/* URL ACCESS Section */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="urlWebsite" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Url Website</label>
                            <input
                                type="text"
                                name="urlWebsite"
                                id="urlWebsite"
                                value={urlWebsite}
                                onChange={(e) => setUrlWebsite(e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                                placeholder="https://google...."
                                required
                            />
                        </div>
                    </div>

                    {/* Config Section */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="start" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mulai dari Baris</label>
                            <input
                                type="text"
                                name="start"
                                id="start"
                                value={start}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                                placeholder="Contoh: 2"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="delay" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Delay (detik)</label>
                            <input
                                type="text"
                                name="delay"
                                id="delay"
                                value={delay}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                                placeholder="Contoh: 2"
                                required
                            />
                        </div>
                    </div>

                    {/* Dynamic Fields Section */}
                    <form onSubmit={loading ? handleStopBroadcast : handleSubmit} className="space-y-6 mb-10">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pemetaan Field (Mapping)</label>
                                <button type="button" onClick={addField} className="text-blue-600 hover:text-blue-700 text-xs font-bold">+ Tambah</button>
                            </div>

                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                                {fields.map((field, idx) => (
                                    <div className="p-2 md:p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3 relative group" key={idx}>
                                        <div className="flex items-end gap-3">
                                            <div className="space-y-1 w-full">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Input Name</span>
                                                <input
                                                    type="text"
                                                    value={field.name}
                                                    name="name"
                                                    onChange={(e) => handleFieldChange(idx, e)}
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-400"
                                                    placeholder="id/name html"
                                                />
                                            </div>
                                            <div className="space-y-1 w-full">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Kolom Excel</span>
                                                <input
                                                    type="text"
                                                    value={field.field_excel}
                                                    name="field_excel"
                                                    onChange={(e) => handleFieldChange(idx, e)}
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-400"
                                                    placeholder="Nama kolom"
                                                />
                                            </div>
                                            <button type="button" onClick={() => setFields(fields.filter((_fil, i) => i !== idx))} className="p-1 bg-red-200 text-red-600 rounded-md mb-1"><Trash2 size={15} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full py-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-[0.98] ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin h-5 w-5 rounded-full border-4 border-gray-300 border-t-white"></div>
                                    Memproses...
                                </div>
                            ) : "Mulai Otomasi Sekarang"}
                        </button>
                    </form>
                </div>
                {isOpen && <div onClick={() => setIsOpen(false)} className="fixed w-full top-0 left-0 h-screen bg-black/10 z-10"></div>}
                {values.length > 0 && (
                    <div
                        className={`
                            fixed bottom-0 left-1/2 -translate-x-1/2 z-50
                            w-full md:w-[600px] 
                            bg-gray-50 border border-gray-300 border-b-0
                            shadow-[0_-8px_20px_-6px_rgba(0,0,0,0.15)] 
                            rounded-t-[2.5rem] 
                            transition-all duration-500 ease-in-out
                            flex flex-col items-center overflow-hidden
                            ${isOpen ? 'h-[50vh] p-6' : 'h-12 p-2 hover:bg-gray-100 cursor-pointer'}
                        `}
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
                                                                    {/* Label Status Tambahan */}
                                                                    {/* <span className="text-[10px] font-black text-blue-500 uppercase animate-pulse">Processing</span> */}
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
            </div>
        </div>
    )
}