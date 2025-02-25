// Chat.js
import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from './ThemeContext';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "What are the best practices for React development?",
    "How can I improve my code performance?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content) => {
    const messageToSend = content || input;
    if (messageToSend.trim() === '') return;

    const userMessage = { role: 'user', content: messageToSend };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await response.json();
      if (data.response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: data.response },
        ]);
      }
    } catch (error) {
      console.error('Error communicating with backend:', error);
    }
    setInput('');
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="chat-layout">
        <aside className="sidebar">
          <button className="new-chat-button" onClick={handleNewChat}>
            + New Chat
          </button>
          <div className="suggested-questions">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="question-button"
                onClick={() => handleSend(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </aside>
        <div className="chat-container">
          <div className="chat-header">
            <h1>Chat</h1>
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
          
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.role}`}>
                <div className={`message ${msg.role}`}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
            />
            <button 
              onClick={() => handleSend()}
              disabled={input.trim() === ''}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;