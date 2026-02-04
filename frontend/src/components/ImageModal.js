import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const ImageModal = ({ isOpen, images = [], currentIndex = 0, onClose, onNavigate }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate(-1);
      } else if (e.key === 'ArrowRight') {
        onNavigate(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen || !images || images.length === 0) {
    return null;
  }

  // Ensure currentIndex is valid
  const validIndex = Math.max(0, Math.min(currentIndex, images.length - 1));
  const currentImage = images[validIndex];
  
  if (!currentImage) {
    return null;
  }

  const hasMultiple = images.length > 1;

  const handlePrev = (e) => {
    e.stopPropagation();
    onNavigate(-1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onNavigate(1);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      style={{ zIndex: 99999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
        aria-label="Close"
      >
        <i className="fas fa-times text-2xl"></i>
      </button>

      {/* Image Container */}
      <div 
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage}
          alt={`${validIndex + 1} of ${images.length}`}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          style={{ maxHeight: '90vh', maxWidth: '100%' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
          }}
        />

        {/* Navigation Arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition bg-black/50 rounded-full p-4 hover:bg-black/70 z-10"
              aria-label="Previous image"
            >
              <i className="fas fa-chevron-left text-2xl"></i>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition bg-black/50 rounded-full p-4 hover:bg-black/70 z-10"
              aria-label="Next image"
            >
              <i className="fas fa-chevron-right text-2xl"></i>
            </button>
          </>
        )}

        {/* Image Counter */}
        {hasMultiple && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
            {validIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Keyboard Hints */}
      {hasMultiple && (
        <div className="absolute bottom-4 right-4 text-white/70 text-xs bg-black/50 px-3 py-2 rounded">
          <div>← → arrow keys to navigate</div>
          <div>ESC to close</div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default ImageModal;
