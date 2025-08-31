DocParser: Document Summarization Tool
Live Deployment: https://doc-parser-mu.vercel.app/

DocParser is a web application that allows users to upload documents (PDFs and images) and get a summarized version of the content. It leverages Tesseract.js for OCR (Optical Character Recognition) to extract text from the files and the Gemini API for generating the summaries.

Features
Document Upload: Easily upload PDF and image files.

Text Extraction: Uses OCR to extract text from the uploaded documents.

AI-Powered Summarization: Generates a summary of the document using the Gemini AI model.

Adjustable Summary Length: Choose between short, medium, and long summaries.

Theming: A toggle to switch between dark and light themes.

Tools: Copy the summarized text to the clipboard or download it as a text file.

Project Structure
client/: The frontend React application.

src/App.jsx: The main React component with all the application logic and UI.

src/App.css: The main CSS file for styling the application.

src/index.css: Global CSS variables for theming.

server/: The backend Node.js server.

server.js: The main server file that sets up the Express application and routes.

routes/summary.js: Handles the API endpoint for file upload and summarization.

Setup and Installation
Prerequisites
Node.js (version 16 or later)

npm or yarn

Steps
Clone the repository and navigate into the project directory.

Install backend dependencies:

npm install


Install frontend dependencies:

cd client
npm install
cd ..


Configure environment variables:

Create a .env file in the root directory.

Add your Gemini API key to this file:

GEMINI_API_KEY=YOUR_API_KEY_HERE


Run the application:

Start the backend server:

npm run server


In a new terminal, start the frontend development server:

cd client
npm run dev


The application will be available at http://localhost:5173.

Usage
Drag and drop a file onto the upload zone or click "Choose File" to select one.

Choose your desired summary length from the dropdown.

Click the "Generate Summary" button.

Wait for the summary to appear in the right-hand panel.

Use the copy or download buttons to save the summary.

API Endpoints
POST /api/summary: Handles file uploads, text extraction, and summarization.

Query Parameters: length (optional, can be 'short', 'medium', or 'long')

Request Body: multipart/form-data with a file field.

Response: A JSON object with the text of the summary.
