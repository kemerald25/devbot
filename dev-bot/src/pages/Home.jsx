import React, { useState } from 'react';
import axios from 'axios';
function Home () {
    const [inputMessage, setInputMessage] = useState('');
    const [outputMessage, setOutputMessage] = useState('');

    const sendMessage = async () => {
        try {
            const response = await axios.post('http://localhost:3000/chatbot', {
                message: inputMessage
            });
            setOutputMessage(response.data); // Assuming the response contains the chatbot's output message
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error
        }
    };

    return (
        <div>
            <div>{outputMessage}</div>
            <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Home;