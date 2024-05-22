import React from 'react';
import './Modal.scss';

const Modal = ({ show, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
