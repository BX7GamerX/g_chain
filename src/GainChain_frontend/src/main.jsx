import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 specific
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);