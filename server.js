// Load environment variables from the custom 'cloudinary' file
require('dotenv').config({ path: './cloudinary' });

const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: 'dleojqvuk',  // your Cloudinary cloud name
  api_key: '244153894123468',  // your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET  // use the secret from environment variables
});

// Middleware to parse JSON and handle large image data
app.use(bodyParser.json({ limit: '10mb' }));

// Endpoint to upload images to Cloudinary
app.post('/upload', (req, res) => {
  const imageData = req.body.image;  // get the base64 image data
  const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, '');  // strip out the base64 prefix

  // Upload image to Cloudinary
  cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Data}`, (error, result) => {
    if (error) {
      console.error('Error uploading to Cloudinary:', error);
      return res.status(500).send('Error uploading image');
    }
    console.log('Uploaded image to Cloudinary:', result);
    res.send({ imageUrl: result.secure_url });  // send the uploaded image URL back to the client
  });
});

// Serve static files (like index.html or images) in production
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
