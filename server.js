const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON and serve static files
app.use(bodyParser.json({ limit: '10mb' }));

// Ensure the uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to save image
app.post('/upload', (req, res) => {
  const imageData = req.body.image;
  const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '');
  const fileName = `image_${Date.now()}.jpg`;
  const filePath = path.join(uploadsDir, fileName);

  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      console.error('Error saving image:', err);
      return res.status(500).send('Error saving image');
    }
    console.log('Saved image:', fileName);
    res.send('Image saved');
  });
});

// Endpoint to save location
app.post('/location', (req, res) => {
  const { latitude, longitude } = req.body;
  const logFile = path.join(uploadsDir, 'locations.log');
  const logEntry = `${new Date().toISOString()} - Latitude: ${latitude}, Longitude: ${longitude}\n`;

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error('Error saving location:', err);
      return res.status(500).send('Error saving location');
    }
    console.log('Saved location:', logEntry.trim());
    res.send('Location saved');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
