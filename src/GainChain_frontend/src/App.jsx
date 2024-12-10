import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import FloatingButton from './components/Floatingai';
import SignUpPage from './components/signup';
import LoginPage from './components/LoginPage';
import FolderPage from './components/dashboard/Folderpage';
import GCHCoinInfo from './components/gchcoininfo';
import NewProject from './components/dashboard/newproject';
import Preview from './components/dashboard/Preview';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div>
          <FloatingButton />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<Dashboard />} />
            <Route path="/gch-coin" element={<GCHCoinInfo />} />
            <Route path="/folder/:folderName" element={<FolderPage />} />
            <Route path="/newproject" element={<NewProject />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;