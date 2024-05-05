const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.get("/api/download/:fileId", (req, res) => {
  let data = req.params.fileId;

  if(true)
  {
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

app.post("/api/upload", (req, res) => {
  let formData = req.body;

  if(true)
  {
      res.status(200).json(formData);
  } else {
      res.status(400).json(formData);
  }  
});

app.get('*', (req, res) => {
  res.send('404 Not Found');
  // res.sendFile(path.resolve(__dirname, '../Frontend/dist', 'index.html'));
});


app.post("*", (req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});