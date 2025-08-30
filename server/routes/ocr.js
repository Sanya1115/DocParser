import express from 'express';
import fs from 'fs';
import path from 'path';
import Tesseract from 'tesseract.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export default (upload) => {
  const router = express.Router();

  router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let extractedText = '';

    try {
      const fileExtension = path.extname(req.file.originalname).toLowerCase();

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
      
      res.json({ text: extractedText });

    } catch (error) {
      console.error("API error:", error);
      res.status(500).json({ error: 'Failed to process file' });
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