import express from 'express';
import fs from 'fs';
import path from 'path';
import Tesseract from 'tesseract.js';
import { createRequire } from 'module';
import { GoogleGenerativeAI } from '@google/generative-ai';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default (upload) => {
  const router = express.Router();

  router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let extractedText = '';

    try {
      const fileExtension = path.extname(req.file.originalname).toLowerCase();
      const summaryLength = req.query.length || 'medium';

      if (fileExtension === '.pdf') {
        try {
          const dataBuffer = fs.readFileSync(req.file.path);
          const pdfData = await pdfParse(dataBuffer);
          extractedText = pdfData.text;
        } catch (parseError) {
          console.warn("PDF parsing failed, falling back to Tesseract OCR:", parseError.message);
          const result = await Tesseract.recognize(req.file.path, 'eng');
          extractedText = result.data.text;
        }
      } else {
        const result = await Tesseract.recognize(req.file.path, 'eng');
        extractedText = result.data.text;
      }

      if (!extractedText.trim()) {
        return res.status(400).json({ error: 'Could not extract text from the document.' });
      }

   
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      let prompt;
      if (summaryLength === 'short') {
        prompt = `Provide a short, concise summary of this text:\n\n${extractedText}`;
      } else if (summaryLength === 'long') {
        prompt = `Provide a detailed and comprehensive summary of this text:\n\n${extractedText}`;
      } else {
        prompt = `Provide a summary of this text:\n\n${extractedText}`;
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const summary = response.text();

      res.json({ text: summary });

    } catch (error) {
      console.error(" Summary API error:", error);
      res.status(500).json({ error: 'Something went wrong while summarizing' });
    } finally {
      
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
      }
    }
  });

  return router;
};
