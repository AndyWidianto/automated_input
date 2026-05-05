

function DoBroadcast(message) {
    const { data, fields, targetIndexButton, currentIndex } = message;

    fields.forEach(field => {
        Object.entries(data[currentIndex]).forEach(([key, value]) => {
            if (field.field_excel === key) {
                const input = document.querySelector(`input[name="${field.name}"], textarea[name="${field.name}"], select[name="${field.name}"]`);
                if (input) {
                    input.value = String(value);
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        });
    });
    const buttonsSubmit = document.querySelectorAll('button[type="submit"], input[type="submit"]');
    const form = btn.closest('form');
    const hasAction = form && form.getAttribute('action') && form.getAttribute('action') !== '#' && form.getAttribute('action') !== '';

    if (hasAction) {
        console.log("Terdeteksi MPA (ada form action). Menunggu reload...");
        if (buttonsSubmit[targetIndexButton]) {
            buttonsSubmit[targetIndexButton].click();
        }
    } else {
        console.log("Terdeteksi SPA (tidak ada action). Menggunakan mode asinkron...");
        const btn = buttonsSubmit[targetIndexButton];

        if (btn) {
            let isDispatched = false; // Flag supaya tidak kirim pesan dua kali

            const proceedToNext = (reason) => {
                if (!isDispatched) {
                    isDispatched = true;
                    console.log(`Lanjut broadcast karena: ${reason}`);

                    observer.disconnect();
                    clearInterval(checkLoading);

                    chrome.runtime.sendMessage({ action: "CONTINUE_BROADCAST" });
                }
            };

            // 1. Monitor Notifikasi Sukses (MutationObserver)
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    for (const node of mutation.addedNodes) {
                        const text = node.innerText ? node.innerText.toLowerCase() : "";
                        if (text.includes("berhasil") || text.includes("success") || text.includes("tersimpan")) {
                            proceedToNext("Notifikasi Sukses Terdeteksi");
                            return;
                        }
                    }
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });

            // 2. Monitor Status Tombol (Loading State)
            const originalText = btn.innerText;
            const checkLoading = setInterval(() => {
                const isDisabled = btn.disabled;
                const isLoadingText = btn.innerText.toLowerCase().includes("load") || btn.innerText !== originalText;

                // Jika tombol sudah kembali normal setelah sempat loading/disabled
                if (!isDisabled && !isLoadingText) {
                    // Beri sedikit jeda 500ms agar data benar-benar stabil di DB website tersebut
                    setTimeout(() => proceedToNext("Tombol Kembali Normal"), 500);
                }
            }, 500);

            // 3. Eksekusi Klik
            btn.click();

            // 4. Safety Timeout (Failsafe)
            // Jika dalam 10 detik tidak ada tanda sukses, tetap lanjut atau beri peringatan
            setTimeout(() => {
                if (!isDispatched) {
                    console.warn("Failsafe trigger: Tidak ada tanda sukses, mencoba lanjut...");
                    proceedToNext("Safety Timeout");
                }
            }, 10000);
        }
    }
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "DO_BROADCAST") {
        if (!window.location.href.includes(targetUrl)) {
            console.log("Salah halaman! Mengarahkan kembali ke form...");
            window.location.href = targetUrl;
            return;
        }
        DoBroadcast(message);
        sendResponse({ status: "success" });
    }
});