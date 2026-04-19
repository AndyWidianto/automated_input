import { apiPrivate } from "./api";

export const sleep = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

export async function createBroadcast({ totalRows, title }) {
  try {
    const response = await apiPrivate.post("/api/broadcast", { totalRows, title }, { withCredentials: true });
    const broadcast = response.data.broadcast;
    return broadcast;
  } catch (error) {
    console.error("Error creating broadcast:", error);
    if (error.response && error.response.status === 429) {
      chrome.runtime.sendMessage({ action: "STOP_BROADCAST" });
      chrome.runtime.sendMessage({ action: "LIMIT_REACHED", message: "Limit mencapai batas. Broadcast dihentikan." });
      console.warn("Limit mencapai batas. Broadcast dihentikan.");
      return;
    }
    throw error;
  }
}


export async function updateBroadcast(broadcastId, { success, failed }) {
  try {
    await apiPrivate.patch(`/api/broadcast/${broadcastId}`, { successRows: success, failedRows: failed }, { withCredentials: true });
  } catch (error) {
    if (error.response && error.response.status === 429) {
      chrome.runtime.sendMessage({ action: "STOP_BROADCAST" });
      chrome.runtime.sendMessage({ action: "LIMIT_REACHED", message: "Limit mencapai batas. Broadcast dihentikan." });
      console.warn("Limit mencapai batas. Broadcast dihentikan.");
      return;
    }
  }
}
export async function startBroadcast({ payload, current_index, total_items, target_url, targetIndexButton, fields, delay }) {
  const broadcast = await createBroadcast({ totalRows: total_items, title: `Broadcast ${new Date().toLocaleString()}` });
  const state = {
    id: broadcast.id,
    current_index,
    total_items,
    payload,
    fields,
    target_url,
    success_count: 0,
    failed_count: 0,
    index_button: targetIndexButton,
    last_update: Date.now(),
    delay: delay,
    progress: "RUNNING"
  };

  chrome.storage.local.set({ broadcast_state: state }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        // Panggil fungsi utama yang akan menyuntikkan script ke halaman
        runExecuteScript(tabs[0].id, state);

      }
    });
  });
  console.log("Broadcast dimulai");
}

export async function runExecuteScript(tabId, state) {
  await sleep(state.delay || 1);
  await chrome.scripting.executeScript({
    target: { tabId: tabId },
    args: [state],
    func: (s) => {
      const data = s.payload.data[s.current_index];
      if (!data) return;

      s.fields.forEach(field => {
        const val = data[field.field_excel];
        if (val !== undefined) {
          const input = document.querySelector(`input[name="${field.name}"], textarea[name="${field.name}"], select[name="${field.name}"]`);
          if (input) {
            input.value = String(val);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
      });

      const buttonsSubmit = document.querySelectorAll('button[type="submit"], input[type="submit"]');
      const btn = buttonsSubmit[s.index_button];
      if (!btn) return;

      const form = btn.closest('form');
      const hasAction = form && form.getAttribute('action') &&
        form.getAttribute('action') !== '#' &&
        form.getAttribute('action') !== '';

      if (hasAction) {
        console.log("MPA Mode: Klik dan tunggu reload...");
        btn.click();
      } else {
        console.log("SPA Mode: Memantau perubahan tanpa reload...");

        let isDispatched = false;
        const finalize = (reason) => {
          if (!isDispatched) {
            isDispatched = true;
            console.log("Selesai karena: " + reason);
            chrome.runtime.sendMessage({ action: "CONTINUE_BROADCAST" });
          }
        };

        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
              if (node.innerText && /berhasil|success|tersimpan/i.test(node.innerText)) {
                finalize("Notifikasi Sukses");
                observer.disconnect();
              }
            }
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        btn.click();
        setTimeout(() => finalize("Timeout"), 8000);
      }
    }
  });
  const nextIndex = state.current_index + 1;
  const total = state.total_items;
  const newBroadcastState = {
    ...state,
    payload: {
      ...state.payload,
      data: state.payload.data.map((item, idx) => {
        if (idx === state.current_index) {
          return {
            ...item,
            status: "SUCCESS"
          }
        }
        return item;
      })
    },
    progress: nextIndex < total ? "RUNNING" : "COMPLETED",
    success_count: state.success_count + 1,
    current_index: nextIndex
  }
  chrome.storage.local.set({ broadcast_state: newBroadcastState });
  if (newBroadcastState.success_count % 10 === 0 || newBroadcastState.progress === "COMPLETED") {
    await updateBroadcast(state.id, { success: newBroadcastState.success_count, failed: newBroadcastState.failed_count });
  }
}

export async function nextBroadcastStep() {
  try {
    const result = await chrome.storage.local.get(['broadcast_state']);
    const state = result.broadcast_state;

    if (!state) return;

    const nextIndex = state.current_index + 1;
    const isCompleted = nextIndex >= state.total_items;
    const progress = isCompleted ? "COMPLETED" : "RUNNING";

    if (isCompleted) {
      console.log("Broadcast selesai, membersihkan state...");
      await updateBroadcast(state.id, {
        success: state.success_count,
        failed: state.failed_count
      });
      await chrome.storage.local.remove("broadcast_state");
    } else {
      const newBroadcastState = {
        ...state,
        payload: {
          ...state.payload,
          data: state.payload.data.map((item, idx) => {
            return idx === state.current_index ? { ...item, status: "SUCCESS" } : item;
          })
        },
        current_index: nextIndex,
        success_count: state.success_count + 1,
        progress: progress,
        last_update: Date.now(),
      };

      await chrome.storage.local.set({ broadcast_state: newBroadcastState });
      console.log(`Melanjutkan ke langkah berikutnya: ${nextIndex} dari ${state.total_items}`);

      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

      if (tabs[0]?.id && tabs[0].url?.includes(state.target_url)) {
        try {
          await runExecuteScript(tabs[0].id, newBroadcastState);
          console.log("Script berhasil disuntikkan");
        } catch (error) {
          console.error("Gagal menjalankan script di tab:", error);
        }
      } else {
        console.warn(`Tab ${state.target_url} tidak ditemukan atau tidak aktif.`);
        console.log("Mengarahkan ke halaman target...");
        chrome.tabs.update(tabs[0].id, { url: state.target_url }, (tab) => {
          const listener = (tabId, changeInfo) => {
            if (tabId === tab.id && changeInfo.status === 'complete') {
              chrome.tabs.onUpdated.removeListener(listener);

              runExecuteScript(tabId, newBroadcastState)
                .then(() => console.log("Script berhasil disuntikkan setelah redirect"))
                .catch((err) => console.error("Gagal setelah redirect:", err));
            }
          };

          chrome.tabs.onUpdated.addListener(listener);
        });
      }
    }
  } catch (err) {
    console.error("Error pada nextBroadcastStep:", err);
  }
}

export async function clearBroadcastProgress() {
  await chrome.storage.local.remove("broadcast_state");
  console.log("Broadcast dibersihkan");
}