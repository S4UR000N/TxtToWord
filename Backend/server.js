import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import FileService from './src/service/file.service.js';
// let fileService = new FileService();
// fileService.searchFile(1);

const app = express();
const upload = multer();

const PORT = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.get('/api/search/:fileId', (req, res) => {
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

app.post('/api/upload', upload.single('file'), async (req, res) => {
  let file = req.file;

  if(!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  } 

  try {
    await FileService.uploadFile(file);
    res.json({ message: 'File uploaded and converted to .docx' });
  } catch(error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing a file' });
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
