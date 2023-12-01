const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your React app's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.post('/khalti-payment', async (req, res) => {
  try {
    console.log('Received JSON:', req.body);
    const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', {
      ...req.body,
    }, {
      headers: {
        'Authorization': 'key 2bdc7f4e4a9a404c991b05d96d842704',
        'Content-Type': 'application/json',
      },
    });
    console.log('Sent JSON:', response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error sending payment data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
