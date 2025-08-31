DocParser: Document Summarization Tool
Live Deployment: https://doc-parser-mu.vercel.app/

DocParser is a web application that allows users to upload documents (PDFs and images) and receive AI-generated summaries. It uses Tesseract.js for OCR (Optical Character Recognition) and the Gemini API for summarization.

Features
Document Upload: Upload PDF and image files with ease.

Text Extraction: OCR-powered text extraction using Tesseract.js.

AI Summarization: Summarize documents using Gemini AI.

Adjustable Summary Length: Choose between short, medium, or long summaries.

Theming: Toggle between dark and light modes.

Tools: Copy summaries to clipboard or download as a .txt file.

Project Structure
client/
  └── src/
      ├── App.jsx
      ├── App.css
      └── index.css

server/
  ├── server.js
  └── routes/
      └── summary.js

Setup and Installation
Prerequisites
Node.js (version 16 or later)

npm or yarn

Steps
Clone the repository and navigate into the project directory:

git clone [https://github.com/your-username/docparser.git](https://github.com/your-username/docparser.git)
cd docparser

Install backend dependencies:

npm install

Install frontend dependencies:

cd client
npm install
cd ..

Configure environment variables:
Create a .env file in the root directory and add your Gemini API key:

GEMINI_API_KEY=your-gemini-api-key

Run the Application
Start the Backend Server
npm run server

Start the Frontend Development Server (in a new terminal)
cd client
npm run dev

The app will be available at: http://localhost:5173

Usage
Upload a Document
Drag and drop a file onto the upload zone or click Choose File to select a PDF or image.

Select Summary Length
Use the dropdown to choose between short, medium, or long summaries.

Generate Summary
Click the Generate Summary button to start the summarization process.

View the Result
The summary will appear in the right-hand panel once processing is complete.

Save or Share
Use the Copy button to copy the summary to your clipboard, or click Download to save it as a .txt file.

API Endpoint
POST /api/summary
This endpoint handles file uploads, performs OCR-based text extraction, and returns an AI-generated summary.

Query Parameters
length (optional):
Accepts 'short', 'medium', or 'long' to control the summary length.

Request Body
Content-Type: multipart/form-data

Required field: file (PDF or image)

Response
Returns a JSON object containing the generated summary.

{
  "summary": "Your summarized text here..."
}

Tech Stack
React – Frontend framework for building the user interface

Node.js – Runtime environment for the backend server

Express – Web framework for handling API routes and server logic

Tesseract.js – OCR library for extracting text from PDFs and images

Gemini API – AI model used for generating document summaries
