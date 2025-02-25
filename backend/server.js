require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Groq } = require('groq-sdk');
const app = express();
const port = 5000;

// Initialize Groq client with API key from environment variables
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { messages } = req.body;
  try {
    // Format the prompt in a readable way
    const formattedPrompt = formatPrompt(messages);
    
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const aiResponse = chatCompletion.choices[0].message.content;
    
    // Create a nicely formatted combined response
    const formattedResponse = `
┌───────────────────────────────────────────────┐
│                  PROMPT USED                  │
└───────────────────────────────────────────────┘

${formattedPrompt}

┌───────────────────────────────────────────────┐
│                   RESPONSE                    │
└───────────────────────────────────────────────┘

${aiResponse}
`;
    
    res.json({ response: formattedResponse });
  } catch (error) {
    console.error('Error communicating with Groq API:', error);
    res.status(500).json({ error: 'Failed to communicate with Groq API' });
  }
});

// Function to format the prompt messages in a readable way
function formatPrompt(messages) {
  return messages.map(msg => {
    const roleName = msg.role.toUpperCase();
    return `[${roleName}]:\n${msg.content}\n`;
  }).join('\n');
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});