const express = require('express');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Example endpoint to fetch the API key
app.get('/api-key', (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});

// Endpoint for currency conversion
app.get('/convert', async (req, res) => {
    const { from, to, amount } = req.query;
    const apiUrl = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${from}/${to}/${amount}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch exchange rate" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

