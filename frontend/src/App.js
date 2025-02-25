// src/App.js
import React from 'react';
import Chat from './Chat';
import './Chat.css';

import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Chat />
    </ThemeProvider>
  );
}

export default App;