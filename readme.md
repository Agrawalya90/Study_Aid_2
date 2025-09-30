# Video Content Analyzer & Quiz Generator

A Chrome Extension + Python backend project that captures screenshots from videos, extracts text using OCR, summarizes content, and generates MCQs using Gemini API.

## Setup

### Chrome Extension
1. Clone repo
2. Load unpacked extension in Chrome (chrome://extensions → Load unpacked → select folder)
3. Make sure Python backend is running

### Python Backend
1. Install dependencies:
   pip install flask pillow pytesseract openai
2. Add your Gemini API key in app.py
3. Run backend:
   python app.py
4. Make sure backend is running at http://127.0.0.1:5000
