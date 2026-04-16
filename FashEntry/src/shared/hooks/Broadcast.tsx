import { useEffect, useRef, useState } from "react";
import React from 'react';
import { toast } from "sonner";
import * as xlsx from 'xlsx';
import { apiPrivate } from "../axios.service";



interface Field {
    name: string;
    field_excel: string;
}
const TypeProgress = {
    pending: "PENDING",
    success: "SUCCESS",
    failed: "FAILED"
}

export default function useBroadcast() {
    const [fields, setFields] = useState<Field[]>([]);
    const [values, setValues] = useState<any[]>([]);
    const [start, setStart] = useState(1);
    const [loading, setLoading] = useState(false);
    const [delay, setDelay] = useState(1);
    const [statLoading, setStatLoading] = useState({
        loading: false,
        message: "Process Select"
    });
    const [urlWebsite, setUrlWebsite] = useState("");
    const [indexButton, setIndexButton] = useState<number | null>(0);
    const [isOpen, setIsOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const chrome = (window as any).chrome;

    const addField = () => {
        const newField: Field = { name: "", field_excel: "" };
        setFields([...fields, newField]);
    };

    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (fields.length < 1) {
            toast.error("Silahkan cek input terlebih dahulu untuk mendeteksi field yang akan diisi otomatis.");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target?.result as ArrayBuffer);
                const workbook = xlsx.read(data, { type: "array" });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = xlsx.utils.sheet_to_json(firstSheet) as any[];

                if (jsonData.length > 0) {
                    setValues(jsonData.map((d, idx) => ({ id: idx + 1, ...d, status: TypeProgress.pending })));
                    const excelColumns = Object.keys(jsonData[0]);

                    setFields(fields.map(field => {
                        const matchedColumn = excelColumns.find(
                            col => col.toLowerCase() === field.name.toLowerCase()
                        );
                        return {
                            ...field,
                            field_excel: matchedColumn || field.field_excel
                        };
                    }));
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleFieldChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedFields = [...fields];
        updatedFields[index] = { ...updatedFields[index], [name]: value };
        setFields(updatedFields);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (value === '' || /^[0-9\b]+$/.test(value)) {
            if (name === "start" && Number(value) > values.length) {
                toast.error("Start index melebihi jumlah data.");
                return;
            }
            if (name === "delay") {
                setDelay(Number(value));
                return;
            }
            setStart(Number(value));
        }
    }

    const handleIndexButton = async (buttons: any[]) => {
        try {
            const prompt = `Gunakan prompt yang lebih spesifik seperti ini:
                        Dari data array button berikut, tentukan index (dimulai dari 0) yang menunjukkan aksi utama seperti **create, simpan, tambah, submit form (bukan logout/keluar/hapus/aksi negatif)**.
                        Abaikan tombol seperti **logout, delete, cancel, back, reset**, meskipun bertipe \`submit\`.
                        Jawab hanya dengan **satu angka saja** tanpa penjelasan.
                        Data:
                        ${JSON.stringify(buttons)}
                        `;
            const res = await apiPrivate.post("/ai_agent", { prompt });
            const match = res.data.text.match(/\d+/);
            const indexButton = match ? parseInt(match[0], 10) : null;
            setIndexButton(indexButton);
        } catch (err: any) {
            console.error(err);
        }
    }

    const handleCekInput = async () => {
        setStatLoading({
            loading: true,
            message: "Process...."
        });
        let newFields: Field[] = [];
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab?.id) return toast.error("Tab Tidak Terdeteksi");

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: async () => {
                const input = document.querySelectorAll('input, textarea, select');
                const buttonsSubmit = document.querySelectorAll('button[type="submit"]');
                const buttonSubmitNormalized = buttonsSubmit.length > 0 ? Array.from(buttonsSubmit).map((el: any) => ({
                    name: el.getAttribute("name") || "",
                    id: el.id,
                    innerText: el.innerText,
                    className: el.className,
                    type: el.type
                })) : [];
                return {
                    success: true,
                    inputs: input.length > 0 ? Array.from(input).map(el => el.getAttribute("name")) : [],
                    buttons: buttonSubmitNormalized,
                }
            }
        }, (results: any[]) => {
            if (results && results[0].result.success) {
                if (results[0].result.inputs.length === 0) {
                    setStatLoading({
                        loading: false,
                        message: ""
                    })
                    return alert("Tidak ditemukan input di website target.");
                }

                const buttons = results[0].result.buttons;
                if (buttons.length > 1) {
                    handleIndexButton(buttons);
                }
                newFields = results[0].result.inputs.filter((name: string) => {
                    return name && name !== "_token";
                })
                    .map((name: string) => {
                        const newField = { name, field_excel: "" };
                        fields.forEach(field => {
                            if (field.name === name) {
                                newField.field_excel = field.field_excel;
                            }
                        });
                        return newField;
                    })
                setFields(newFields);
            }
        });
        setStatLoading({
            loading: false,
            message: ""
        })

        return newFields;
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (start < 1) {
            toast.error("Start index harus minimal 1.");
            return;
        }
        if (values.length === 0) return toast.error("Data excel belum diupload. Silahkan upload file excel terlebih dahulu.");
        if (urlWebsite.trim() === "") return toast.error("URL website target belum diisi. Silahkan isi URL website target terlebih dahulu.");
        if (fields.length === 0) return toast.error("Field untuk diisi otomatis belum terdeteksi. Silahkan cek input terlebih dahulu untuk mendeteksi field yang akan diisi otomatis.");

        setLoading(true);
        chrome.runtime.sendMessage({
            action: "START_BROADCAST",
            payload: {
                data: values,
            },
            current_index: start - 1,
            total_items: values.length,
            target_url: urlWebsite,
            targetIndexButton: indexButton,
            fields: fields,
            delay: delay
        }, async (response: any) => {
            if (response.status === "success") {
                toast.success("Broadcast started successfully!");
                await apiPrivate.patch("/users", { usedExcel: 1 });
            } else {
                toast.error("Failed to start broadcast.");
            }
        });
    };

    const handleStopBroadcast = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!confirm("Apakah Anda yakin ingin menghentikan broadcast? jika ya, semua proses akan dihentikan.")) return;
        chrome.runtime.sendMessage({ action: "STOP_BROADCAST" }, (response: any) => {
            if (response.status === "success") {
                toast.success("Broadcast stopped successfully!");
            } else {
                toast.error("Failed to stop broadcast.");
            }
            setLoading(false);
        });
    }

    useEffect(() => {
        const updateLocalState = (changes: any) => {
            if (changes.broadcast_state) {
                const newState = changes.broadcast_state.newValue;
                console.log("Received broadcast_state change:", newState);
                setStart(newState.current_index + 1);
                setValues(newState.payload.data);
                if (newState.progress === "COMPLETED") {
                    fileInputRef.current && (fileInputRef.current.value = "");
                    setUrlWebsite("");
                    setFields([]);
                    setStart(1);
                    setValues([]);
                    toast.success("Broadcast completed successfully!");
                    setLoading(false);
                    chrome.runtime.sendMessage({ action: "STOP_BROADCAST" })
                }
            }
        }
        chrome.runtime.onMessage.addListener((message: any) => {
            if (message.action === "LIMIT_REACHED") {
                toast.error(message.message || "Limit mencapai batas. Broadcast dihentikan.");
                setLoading(false);
            }
        });
        chrome.storage.onChanged.addListener(updateLocalState);
        return () => chrome.storage.onChanged.addListener(updateLocalState);
    }, []);

    return {
        statLoading,
        setStatLoading,
        handleCekInput,
        handleChangeFile,
        handleIndexButton,
        handleChange,
        handleSubmit,
        handleFieldChange,
        isOpen,
        setIsOpen,
        loading,
        setLoading,
        values,
        start,
        addField,
        urlWebsite,
        setUrlWebsite,
        handleStopBroadcast,
        fields,
        setFields,
        fileInputRef,
        TypeProgress,
        delay
    }
}