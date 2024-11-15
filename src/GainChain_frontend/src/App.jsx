import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Profile from './components/Profile';
import './index.css';

const App = () => {
  return (
    <Router> {/* Wrap Routes with BrowserRouter */}
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
