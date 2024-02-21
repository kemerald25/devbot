// Import required modules
const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Create an Express app
const app = express();

// Define the route to handle chatbot requests
app.post('/chatbot', async (req, res) => {
    try {
        const model = "gpt-4";  // Replace with your model
        const message = req.body.message; // Assuming the message is sent in the request body

        // Set request headers
        const headers = {
            "Content-Type": "application/json",
            "x-vanusai-model": model,
            "x-vanusai-sessionid": uuidv4(),
            "Accept": "text/event-stream"
        };

        // Set request data
        const data = {
            "prompt": message,
            "stream": true
        };

        // Make a POST request to the Vanus API
        const response = await axios.post("https://ai.vanus.ai/app/integrations?id=65cf1d5c0ad3c0f4b01a88ac", data, { headers });

        // Stream the response data to the client
        response.data.on('data', (chunk) => {
            const lines = chunk.toString().split('\n');
            for (let line of lines) {
                if (line.startsWith('data: ')) {
                    const jsonString = line.replace('data: ', '');
                    res.write(JSON.parse(jsonString)); // Stream the parsed JSON to the client
                }
            }
        });
    } catch (error) {
        console.error('Error processing chatbot request:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
