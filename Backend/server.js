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
    const id = req.params.fileId;
    const response = await fileService.searchFile(id);
    if(response.success) {
        const file = response.data;
        return res.send(file);
    } 
    return res.status(response.status).json({error: response.error});

});

app.post('/api/upload', upload.single('file'), async (req, res) => {
    let fileService = new FileService();
    const uploadedFile = req.file;
    if(!uploadedFile) {
        return res.status(400).json({error: 'No file uploaded'});
    } 
    const response = await fileService.uploadFile(uploadedFile.originalname, uploadedFile.buffer);
    if(response.success) {
        const file = response.data;
        return res.send(file);
    } 
    return res.status(response.status).json({error: response.error});
});

app.get('/api/download/:fileId', async (req, res) => {
    let fileService = new FileService();
    const id = req.params.fileId;
    const response = await fileService.downloadFile(id);
    if(response.success) {
        const file = response.data;
        res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-office-document.wordprocessingml.document');
        return res.send(file.bytes);
    } 
    return res.status(response.status).json({error: response.error});
});

app.delete('/api/delete/:fileId', async (req, res) => {
    let fileService = new FileService();
    const id = req.params.fileId;
    const response = await fileService.deleteFile(id);
    if(response.success) {
        return res.send();
    }
    return res.status(response.status).json({error: response.error});
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