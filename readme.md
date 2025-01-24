# YT Transcript Chrome Extension

## Description
The YT Transcript Chrome Extension allows users to fetch the transcript of a YouTube video. Users can either enter the video URL manually or grab the URL of the currently playing video.
### DEMO VIDEO
[Download Demo Video](./f133-a064-4b9d-a162-6a98e0bf0014%20(1).mp4)
## Features
- Fetch transcript of a YouTube video by entering the URL.
- Grab the URL of the currently playing YouTube video.
- Display the fetched transcript in the extension popup.

## Installation
1. Clone or download the repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory containing the extension files.

## Usage
1. Click on the extension icon to open the popup.
2. Enter the YouTube video URL in the input field or click "Get Current Video URL" to grab the URL of the currently playing video.
3. Click "Get Transcript" to fetch and display the transcript.

## Files
- `index.html`: The HTML file for the extension popup.
- `ytTranscript.js`: The JavaScript file that handles fetching and displaying the transcript.
- `manifest.json`: The manifest file that defines the extension's properties and permissions.
- `readme.md`: This README file.

## Permissions
- `activeTab`: Allows the extension to access the URL of the currently active tab.

