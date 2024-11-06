import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './components/HomePage';
import About from './components/About';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';


const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
