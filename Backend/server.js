import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import FileRepository from './src/repository/file.repository.js';

const app = express();
const PORT = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.get('/api/search/:fileId', (req, res) => {
  let fileRepo = new FileRepository();
  let resData = { fileId: req.params.fileId, fileExists: true };
  res.status(200).json(resData);
});

app.get('/api/download/:fileId', (req, res) => {
  let data = req.params.fileId;

  if(true) {
    res.status(200).json(formData);
  } else {
    res.status(400).json(formData);
  }

  // res.set({
  //     'Content-Type': 'application/msword', // MIME type for Word file
  //     'Content-Disposition': `attachment; filename=${file.name}` // Specify filename for download
  // });
  // res.send(file.data);
});

app.post('/api/upload', (req, res) => {
  let formData = req.body;

  if(true) {
    res.status(200).json(formData);
  } else {
    res.status(400).json(formData);
  }  
});

app.get('*', (req, res) => {
  res.send('404 Not Found');
});

app.post('*', (req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
