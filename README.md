﻿# promptchat
Prompt Chatbot (Groq API)

A full-stack AI chatbot that communicates with the Groq API using LLaMA models. It supports both text-based prompts and real-time chat responses with a React frontend and Express backend.

Tech Stack

Frontend: React, Fetch API, Components, useState, useEffect
Backend: Express.js, REST API, CORS, MongoDB
AI Integration: Groq API (LLaMA-3.3)
State Management: React hooks
File Uploads: Multer (if used for vision models)
Features

Send prompts and receive real-time responses using Groq API
Clean chat interface with React
Streamed AI response support
MongoDB integration for storing prompt history (optional)
Fully responsive UI

Setup Instructions

Clone the Repository

git clone https://github.com/Manikantachidurala/chatbot_groq.git
cd chatbot_groq

Backend Setup

cd backend
npm install

Create a .env file:

GROQ_API_KEY=your_groq_api_key
PORT=5000
MONGO_URI=your_mongo_connection_string

Start the server:

npm run dev

Frontend Setup

cd ../frontend
npm install
npm start

API Endpoint

POST /chat
Body: { "messages": [{ "role": "user", "content": "Hello AI!" }] }
Response: { "response": "AI's answer..." }

Models Used

llama-3.3-70b-versatile for general prompts
Streaming support via stream: true

