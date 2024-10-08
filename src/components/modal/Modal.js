import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <button onClick={onClose} className="text-gray-600 absolute top-3 right-3">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
