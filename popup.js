document.getElementById("captureBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "RESULTS") {
    document.getElementById("summary").innerText = message.summary;
    document.getElementById("mcqs").innerText = message.mcqs;
  }
});
