import React, { useState } from 'react';
import axios from 'axios';

function Home() {
    const [inputMessage, setInputMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const sendMessage = async () => {
        try {
            // Add the user's message to the chat
            setChatMessages(prevMessages => [...prevMessages, { type: 'user', message: inputMessage }]);
            
            // Send the message to the backend
            const response = await axios.post('http://localhost:3000/chatbot', {
                message: inputMessage
            });

            // Add the bot's response to the chat
            setChatMessages(prevMessages => [...prevMessages, { type: 'bot', message: response.data }]);

            // Clear the input field after sending the message
            setInputMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error
        }
    };

    return (
        <div>
            {/* Render chat messages */}
            {chatMessages.map((msg, index) => (
                <div key={index} className={msg.type === 'user' ? 'user-message' : 'bot-message'}>
                    {msg.message}
                </div>
            ))}
            {/* Input field and send button */}
            <div>
                <input 
                    type="text" 
                    value={inputMessage} 
                    onChange={(e) => setInputMessage(e.target.value)} 
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Home;
