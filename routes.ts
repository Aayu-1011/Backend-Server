import express, { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dbPath = path.join(__dirname, 'db.json');

// /ping endpoint
router.get('/ping', (req: Request, res: Response) => {
  res.json(true);
});

// /submit endpoint
router.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  // Read the existing data
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  // Append the new submission
  data.push({ name, email, phone, github_link, stopwatch_time });

  // Write back to the file
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

  res.json({ success: true });
});

// /read endpoint
router.get('/read', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);

  // Read the existing data
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  if (index >= 0 && index < data.length) {
    res.json(data[index]);
  } else {
    res.status(404).json({ error: 'Index out of bounds' });
  }
});

export default router;
