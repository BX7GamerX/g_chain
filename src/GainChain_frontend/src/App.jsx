import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/About';
import ProfileDashboard from './pages/Profile';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path='/profile' element={<ProfileDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
