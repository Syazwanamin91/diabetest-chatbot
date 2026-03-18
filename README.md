# Diabetes Care AI Chatbot (RAG Integration)

Diabetes Care AI is a modern, responsive React-based frontend application designed to provide medical assistance related to diabetes. It leverages Retrieval-Augmented Generation (RAG) by connecting to a FastAPI backend that processes medical documents to provide accurate, context-aware answers.

## 🌟 Features

- **RAG-Powered Conversations**: Get answers based on specific medical documents for high accuracy.
- **Modern UI/UX**: Clean, professional chat interface built with Tailwind CSS and Lucide icons.
- **Real-time Interaction**: Seamless communication with the backend using Axios.
- **Error Handling**: Robust feedback for network or server-side issues.
- **Chat Management**: Easily clear conversation history to start fresh.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Client**: [Axios](https://axios-http.com/)
- **Backend (Required)**: [FastAPI](https://fastapi.tiangolo.com/) (running on port 8000)

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16 or higher
- **npm**: (comes with Node.js)
- **Python Backend**: Ensure the corresponding [FastAPI backend](http://127.0.0.1:8000) is set up and running.

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd diabetest-chatbot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Initialize Tailwind CSS (if needed)**:
   ```bash
   npm run tailwind:init
   ```

### Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```
2. **Access the app**:
   Open your browser and navigate to `http://localhost:5173`.

## 🔗 Backend Integration

This application is configured to communicate with a FastAPI server at `http://127.0.0.1:8000`.

- **Endpoint**: `GET /ask?question=<query>`
- **Expected Response**: `{ "answer": "..." }`

**Important**: Ensure that your backend has CORS (Cross-Origin Resource Sharing) enabled to allow requests from the frontend origin (typically `http://localhost:5173`).

## 📂 Project Structure

```text
├── public/              # Static assets
├── src/
│   ├── components/
│   │   └── DiabetesChatbot.jsx  # Main Chat component
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles & Tailwind directives
│   └── App.css          # Component-specific styles
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## ⚠️ Disclaimer

AI-generated answers are based on specific medical documents and are for informational purposes only. They do not replace professional medical advice, diagnosis, or treatment.

---
*Developed as a RAG-powered healthcare assistant.*
