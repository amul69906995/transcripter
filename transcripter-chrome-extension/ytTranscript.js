const fetchTranscript = async (videoUrl,langCode='en') => {
    try {
        const baseUrl="http://localhost:80/transcribe-submagic";
        console.log(videoUrl,baseUrl);
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ langCode, videoUrl })
        });
        const data = await response.json();
        console.log(response,data)
        
        return data.result.transcript;
    } catch (e) {
        console.log("Error:", e);
        return `Error: ${e.message}`;
    }
};


// Fixed: Async handling for chrome.tabs
document.getElementById('getCurrentVideo').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const videoUrl = tab.url;
    if (!videoUrl.includes("youtube.com/watch")) {
        document.getElementById('transcriptOutput').textContent = "Not a YouTube video page!";
        return;
    }
    const transcript = await fetchTranscript(videoUrl);
    document.getElementById('transcriptOutput').textContent = transcript;
    if(transcript){
        const copyButton = document.createElement('button');
        copyButton.id = 'copyButton';
        copyButton.textContent = 'Copy to Clipboard';

        copyButton.addEventListener('click', () => {
          navigator.clipboard.writeText(transcript).then(() => {
            alert('Transcript copied to clipboard!');
          }).catch((err) => {
            console.error('Failed to copy:', err);
            alert('Failed to copy transcript.');
          });
        });
        document.body.appendChild(copyButton);
    }
});

document.getElementById('fetchTranscript').addEventListener('click', async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    if (!videoUrl) return;
    const transcript = await fetchTranscript(videoUrl);
    document.getElementById('transcriptOutput').textContent = transcript;
    if(transcript){
        const copyButton = document.createElement('button');
        copyButton.id = 'copyButton';
        copyButton.textContent = 'Copy to Clipboard';

        copyButton.addEventListener('click', () => {
          navigator.clipboard.writeText(transcript).then(() => {
            alert('Transcript copied to clipboard!');
          }).catch((err) => {
            console.error('Failed to copy:', err);
            alert('Failed to copy transcript.');
          });
        });
        document.body.appendChild(copyButton);
    }
});

