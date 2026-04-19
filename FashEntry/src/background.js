import { clearBroadcastProgress, startBroadcast, createBroadcast, nextBroadcastStep, runExecuteScript, updateBroadcast, sleep } from "./background/action";

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


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
    const total = state.total_items;

    const payload = {
      ...state.payload,
      data: state.payload.data.map((data, idx) => {
        if (idx === state.current_index) {
          data.status = "SUCCESS";
        }
        return data;
      })
    }

    const updatedState = {
      ...state,
      current_index: nextIndex,
      payload: payload,
      progress: nextIndex < total ? "RUNNING" : "COMPLETED",
      success_count: state.success_count + 1,
      last_update: Date.now()
    };

    if (updatedState.success_count % 10 === 0 || updatedState.progress === "COMPLETED") {
      await updateBroadcast(state.id, {
        success: updatedState.success_count,
        failed: updatedState.failed_count
      });
    }

    await chrome.storage.local.set({ broadcast_state: updatedState });
    console.log(`Index diperbarui ke: ${nextIndex}. Menunggu navigasi berikutnya...`);

  } catch (error) {
    console.error("Error pada listener onUpdated:", error);
  }
});