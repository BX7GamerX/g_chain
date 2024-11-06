import React from 'react';
import './css/Modal.css'; // Custom CSS for modal styling

const Modal = ({ isVisible, onClose, content }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>×</span>
        {content}
      </div>
    </div>
  );
};

export default Modal;


