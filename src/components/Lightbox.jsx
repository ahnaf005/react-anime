import { useEffect, useCallback } from 'react'

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const image = images[currentIndex];
  const src = image?.jpg?.large_image_url || image?.jpg?.image_url;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      {/* Close */}
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      {/* Counter */}
      <span className="lightbox-counter">{currentIndex + 1} / {images.length}</span>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="lightbox-nav lightbox-prev"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {/* Image */}
      <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={`Image ${currentIndex + 1}`} className="lightbox-img" />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          className="lightbox-nav lightbox-next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          ›
        </button>
      )}
    </div>
  );
};

export default Lightbox;
