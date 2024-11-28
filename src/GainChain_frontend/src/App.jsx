import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Chatbot from './components/ChatBot';
import FloatingButton from './components/Floatingai';
import SignUpPage from './components/signup';
import LoginPage from './components/LoginPage';
import './index.css';

const App = () => {
  return (
    <Router> {/* Wrap Routes with BrowserRouter */}
      <div>
        <FloatingButton />
        <Routes>
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
