import { apiPrivate } from "./shared/axios.service";
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


const sleep = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

async function createBroadcast({ totalRows, title }) {
  try {
    const response = await apiPrivate.post("/broadcast", { totalRows, title }, { withCredentials: true });
    const broadcast = response.data;
    console.log("Broadcast:", broadcast);
    return broadcast;
  } catch (error) {
    console.error("Error creating broadcast:", error);
    throw error;
  }
}

async function updateBroadcast(broadcastId, { success, failed }) {
  try {
    await apiPrivate.patch(`/broadcast/${broadcastId}`, { successRows: success, failedRows: failed }, { withCredentials: true });
    console.log("Broadcast updated successfully");
  } catch (error) {
    if (error.response && error.response.status === 419) {
      chrome.runtime.sendMessage({ action: "STOP_BROADCAST" });
      chrome.runtime.sendMessage({ action: "LIMIT_REACHED", message: "Limit mencapai batas. Broadcast dihentikan." });
      console.warn("Limit mencapai batas. Broadcast dihentikan.");
      return;
    }
  }
}
async function startBroadcast({ payload, current_index, total_items, target_url, targetIndexButton, fields, delay }) {
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

async function runExecuteScript(tabId, state) {
  chrome.scripting.executeScript({
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
    success_count: state.success_count + 1,
    current_index: state.current_index + 1
  }
  chrome.storage.local.set({ broadcast_state: newBroadcastState });
  await updateBroadcast(state.id, { success: newBroadcastState.success_count, failed: newBroadcastState.failed_count });
  await sleep(state.delay || 1);
}

async function nextBroadcastStep() {
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

      if (tabs[0]?.id && tabs[0].url?.includes("web.whatsapp.com")) {
        try {
          await runExecuteScript(tabs[0].id, newBroadcastState);
          console.log("Script berhasil disuntikkan ke WA");
        } catch (error) {
          console.error("Gagal menjalankan script di tab:", error);
        }
      } else {
        console.warn("Tab WA tidak ditemukan atau tidak aktif.");
      }
    }
  } catch (err) {
    console.error("Error pada nextBroadcastStep:", err);
  }
}

async function clearBroadcastProgress() {
  await chrome.storage.local.remove("broadcast_state");
  console.log("Broadcast dibersihkan");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_BROADCAST") {
    startBroadcast(request);
    sendResponse({ status: "success" });
  }
  if (request.action === "STOP_BROADCAST") {
    clearBroadcastProgress();
    sendResponse({ status: "success" });
  }
  if (request.action === "CONTINUE_BROADCAST") {
    nextBroadcastStep();
    sendResponse({ status: "success" });
  }
  if (request.action === "GET_LATEST_PROGRESS") {
    chrome.storage.local.get(['broadcast_state'], (result) => {
      sendResponse(result.broadcast_state || null);
    });
    return true;
  }
  console.log("Pesan diterima di background:", request);
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;

  try {
    const currentUrl = tab.url || "";
    
    const result = await chrome.storage.local.get("broadcast_state");
    const state = result.broadcast_state;

    if (!state || state.progress !== "RUNNING" || !state.target_url) return;

    
     await sleep(state.delay);

    if (!currentUrl.includes(state.target_url)) {
      console.log("URL tidak sesuai, mengarahkan kembali...");
      await chrome.tabs.update(tabId, { url: state.target_url });
      return;
    }

    console.log(`[MPA Mode] Menjalankan baris ke-${state.current_index}`);

    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      args: [state],
      func: (savedState) => {
        const { current_index, payload, fields, index_button } = savedState;
        const item = payload.data[current_index];
        if (!item) return;

        fields.forEach(field => {
          const val = item[field.field_excel];
          if (val !== undefined) {
            const input = document.querySelector(`input[name="${field.name}"], textarea[name="${field.name}"], select[name="${field.name}"]`);
            if (input) {
              input.value = String(val);
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
        });

        const btns = document.querySelectorAll('button[type="submit"], input[type="submit"]');
        if (btns[index_button]) {
          btns[index_button].click();
        }
      }
    });

    const nextIndex = state.current_index + 1;
    const total = state.payload.data.length;

    const updatedState = {
      ...state,
      current_index: nextIndex,
      progress: nextIndex < total ? "RUNNING" : "COMPLETED",
      success_count: state.success_count + 1,
      last_update: Date.now()
    };

    await updateBroadcast(state.id, { 
      success: updatedState.success_count, 
      failed: updatedState.failed_count 
    });

    await chrome.storage.local.set({ broadcast_state: updatedState });
    console.log(`Index diperbarui ke: ${nextIndex}. Menunggu navigasi berikutnya...`);

  } catch (error) {
    console.error("Error pada listener onUpdated:", error);
  }
});