import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from './components/HomePage';
import About from './components/About';
import NavBar from './components/NavBar';


const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
};

export default App;
