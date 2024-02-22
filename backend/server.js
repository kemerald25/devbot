const express = require('express');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

const model = "gpt-4";  // Replace with your model, e.g., "gpt-3.5-turbo", "gpt-3.5-turbo-16k", "azure-gpt-35-turbo", "abab5.5-chat", "ernie-bot", "ernie-bot-turbo", "gpt-4"
const url = "https://app.ai.vanus.ai/api/v1/7a9e57123a924c9aaf51542a3a1952cb";  // Replace with the URL from your App dashboard in API Access

app.post('/chatbot', async (req, res) => {
    try {
        const message = req.body.message;

        const headers = {
            "Content-Type": "application/json",
            "x-vanusai-model": model,
            "x-vanusai-sessionid": uuidv4(),
            "Accept": "text/event-stream" // Remove if you need plain text responses
        };

        const data = {
            "prompt": message,
            "stream": true // Change to false if you need plain text responses
        };

        const response = await axios.post(url, data, { headers, responseType: "stream" });

        response.data.on('data', (chunk) => {
            const lines = chunk.toString().split('\n');

            for (let line of lines) {
                if (line.startsWith('data: ')) {
                    const jsonString = line.replace('data: ', '');
                    const parsedData = JSON.parse(jsonString);
                    console.log(parsedData); // Log the parsed data
                    res.json(parsedData); // Send the parsed JSON response from Vanus API back to the client
                }
            }
        });
    } catch (error) {
        console.error('Error processing chatbot request:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
