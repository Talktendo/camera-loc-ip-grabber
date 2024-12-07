const express = require('express');
const app = express();
const port = 3000;

// serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client-side.html'); // replace with your HTML file's path
});

// handle POST requests
app.use(express.json());
app.post('/', (req, res) => {
  console.log('Received data:', req.body);
  res.status(200).json({ message: 'Data received' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
