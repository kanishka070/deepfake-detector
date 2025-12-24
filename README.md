# 🎭 Deepfake Detector - Frontend

A React-based web application that detects deepfake videos using deep learning. Upload any video and get AI-powered analysis to determine if it's authentic or manipulated.

![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

---

## 📹 Demo Video

https://drive.google.com/file/d/1zazb5pfOHTlofUMt54sE7qEcrsVLzilA/view?usp=drive_link

---

## 📖 About the Project

Deepfake Detector helps identify manipulated videos using machine learning. This repository contains the frontend interface built with React that provides an easy-to-use platform for video analysis [web:5].

The frontend communicates with a FastAPI backend that runs deep learning models (EfficientNet, CNN, RNN, Transformers) to analyze video frames and detect deepfakes.

### Key Features

- 🎥 Drag-and-drop video upload
- ⚡ Real-time deepfake detection
- 📊 Confidence score display
- 📱 Mobile responsive design
- 🎨 Clean, modern UI
- 🔄 Loading states and error handling

### How It Works

1. Upload: User uploads video through the web interface
2. Processing: Frontend sends video to backend API
3. Analysis: Backend extracts frames and runs ML models
4. Results: User receives classification (Real/Fake) with confidence score

Backend Repository: [deepfake-detector-backend](https://github.com/kanishka070/deepfake-detector-backend)

---

## 🛠️ Tech Stack

### Frontend (This Repository)
- React.js - UI framework
- JavaScript (ES6+) - Programming language
- HTML5 & CSS3 - Structure and styling
- Axios - HTTP client for API calls
- React Hooks - State management

### Backend ([Separate Repo](https://github.com/kanishka070/deepfake-detector-backend))
- Python 3.8+ - Backend language
- FastAPI - Web framework
- PyTorch - Deep learning framework
- OpenCV - Video processing

### ML Models
- EfficientNet - Spatial feature extraction
- RNN/LSTM - Temporal analysis
- Transformers - Attention mechanisms

---

## 🚀 How to Run

### Prerequisites
- Node.js 16+ and npm
- Backend API running ([setup here](https://github.com/kanishka070/deepfake-detector-backend))

### Installation Steps

1. Clone the repository
git clone https://github.com/kanishka070/deepfake-detector.git
cd deepfake-detector

2. Install dependencies
npm install

3. Configure environment
Create a .env file in the root directory:
REACT_APP_API_URL=http://localhost:8000

4. Start the development server
npm run dev

5. Open in browser
Navigate to http://localhost:3000

---

📡 API Integration
The frontend connects to the backend API at the configured endpoint.

Expected Backend Endpoint:

POST /predict
Upload video for analysis.

Request:
const formData = new FormData();
formData.append('file', videoFile);

axios.post('http://localhost:8000/predict', formData)
  .then(response => console.log(response.data));

Response:
{
  "prediction": "fake",
  "confidence": 0.87,
  "message": "Video analysis complete"
}

---

## 📂 Project Structure

```
deepfake-detector/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── .env
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, create a branch, make changes, and submit a pull request.

---

## 👥 Team

This project was developed as a minor project by:

- [Kanishka](https://github.com/kanishka070) - Frontend Developer (UI Design & Backend Integration)
- Aryan - Backend Developer
- Devanshi - Backend Developer

---

## ⭐ Star both repos if you find them helpful!

Repositories:
- Frontend: [deepfake-detector](https://github.com/kanishka070/deepfake-detector)
- Backend: [deepfake-detector-backend](https://github.com/kanishka070/deepfake-detector-backend)
