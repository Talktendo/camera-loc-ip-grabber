const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// Serve static files (like client-side HTML)
app.use(express.static(__dirname));

// To handle large image data (base64)
app.use(bodyParser.json({ limit: '10mb' }));

// Serve HTML page
app.get('/', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;  // Get client IP
  console.log(`Client IP: ${ip}`);  // Log IP address
  
  // Get location (simulated, ideally you'd use a geolocation API)
  const location = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Client Location: ${location}`);

  res.sendFile(__dirname + '/index.html');  // Serve the HTML page
});

// Handle image data from the camera
app.post('/upload', (req, res) => {
  const imageData = req.body.image;  // Get the base64 image data
  console.log(`Received Image Data: ${imageData.substring(0, 100)}...`);  // Log part of the image data

  // Optional: Save the image (you can save to a file or a database)
  // fs.writeFileSync('image.jpg', imageData.split(',')[1], 'base64');

  res.send('Image received');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
