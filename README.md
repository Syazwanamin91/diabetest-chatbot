Diabetes Care AI Chatbot (RAG Integration)

This project is a React-based frontend application designed to interact with a RAG (Retrieval-Augmented Generation) FastAPI backend. It provides a modern chat interface using Tailwind CSS and connects to the API via Axios.

📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

Node.js (Version 16 or higher recommended)

npm (Included with Node.js)

🚀 Setup Instructions

Because this repository does not include the node_modules folder, you must install the dependencies manually after cloning.

1. Install Dependencies

Open your terminal, navigate to the project directory (where package.json is located), and run:

npm install


This command will install all the necessary libraries listed in package.json, including:

React & Vite: The core framework.

Tailwind CSS: For styling.

Axios: To handle API requests to the Python backend.

Lucide-React: For the chat icons (User, Bot, Send).

2. Configure Tailwind CSS

If you are setting this up for the first time or if the configuration files (tailwind.config.js, postcss.config.js) are missing, generate them using the included script:

npm run tailwind:init


Note: If these files already exist in the folder, you can skip this step.

3. Backend Connection

This frontend expects a FastAPI backend running locally on port 8000.

Ensure your Python backend is running (uvicorn main:app --reload).

Ensure the backend has CORS Middleware enabled to accept requests from this frontend.

🏃‍♂️ Running the App

To start the development server:

npm run dev


Open your browser and navigate to the local URL provided in the terminal (usually http://localhost:5173).

🛠️ Project Structure

src/App.jsx: The main chat component containing the UI and logic.

src/index.css: Tailwind CSS directives (@tailwind base, etc.).

package.json: List of dependencies and scripts.