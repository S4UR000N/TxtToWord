import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import FileService from './src/service/file.service.js';

const app = express();
const upload = multer({ limits: {fileSize: 5 * 1024 * 1024 }});

const PORT = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.get('/api/search/:fileId', async(req, res) => {
    let fileService = new FileService();
    let id = req.params.fileId;
    try {
        const file = await fileService.searchFile(id);
        if(!file) {
            return res.status(404).json({ error: 'File not found' });
        }
        res.send(file);
    } catch(error) {
        res.status(500).json({ error: 'Error searching a file'});
    }
});

app.get('/api/download/:fileId', async (req, res) => {
    let fileService = new FileService();
    let id = req.params.fileId;
    try {
        const file = await fileService.searchFile(id);
        if(!file) {
            return res.status(404).json({ error: 'File not found' });
        }
        res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-office-document.wordprocessingml.document');
        res.send(file.bytes);
    } catch(error) {
        console.error('Error downloading a file:', error);
        res.status(500).json({ error: 'Error downloading a file' });
    }
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
    let fileService = new FileService();
    let file = req.file;
    if(!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    } 
    try {
        let fileId = await fileService.uploadFile(file.originalname, file.buffer);
        res.status(200).json({ message: 'File uploaded and converted to .docx', fileId: fileId });
    } catch(error) {
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