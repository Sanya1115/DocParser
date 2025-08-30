import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import summaryRoute from './routes/summary.js';

const app = express();
const PORT = process.env.PORT || 5000;

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"]
}));
app.use(express.json());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


app.use('/api/summary', summaryRoute(upload));

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
