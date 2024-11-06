// CustomArrows.js
import React from 'react';
import './css/CustomArrows.css'; // Ensure your CSS file is correctly linked

const Arrow = ({ direction, onClick }) => (
  <button 
    className={`slick-arrow slick-arrow-${direction}`} 
    onClick={onClick}
    aria-label={direction === 'left' ? 'Previous Slide' : 'Next Slide'}
  >
    {direction === 'left' ? '<' : '>'} {/* Unicode for left and right arrows */}
  </button>
);

export default Arrow;
