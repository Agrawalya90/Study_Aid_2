(async () => {
  const video = document.querySelector("video");
  if (!video) {
    alert("No video detected on this page.");
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL("image/png");

  try {
    const response = await fetch("http://127.0.0.1:5019/process_image", {
      method: "POST",
      body: JSON.stringify({ image: imageData }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();

    chrome.runtime.sendMessage({
      type: "RESULTS",
      summary: data.summary,
      mcqs: data.mcqs
    });
  } catch (err) {
    console.error("Error:", err);
    chrome.runtime.sendMessage({ type: "RESULTS", summary: "Error fetching data", mcqs: "" });
  }
})();
