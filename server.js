const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;

// To handle large image data (base64)
app.use(bodyParser.json({ limit: '10mb' }));

// Serve static files (like client-side HTML)
app.use(express.static(__dirname));

// Endpoint to receive the image data and save it to a file
app.post('/upload', (req, res) => {
  const imageData = req.body.image;  // Get the base64 image data
  console.log('Received Image Data:', imageData.substring(0, 100) + '...');  // Log part of the image data

  // Remove the base64 metadata (data:image/jpeg;base64,)
  const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '');

  // Generate a unique filename for each image (you can use timestamp or UUID)
  const fileName = `image_${Date.now()}.jpg`;

  // Save the image to the server's file system
  fs.writeFile(`./uploads/${fileName}`, base64Data, 'base64', (err) => {
    if (err) {
      console.error('Error saving image:', err);
      return res.status(500).send('Error saving image');
    }
    console.log('Image saved as:', fileName);
    res.send('Image received and saved');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
