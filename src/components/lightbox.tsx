'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Add imageDimensions to props
type ImageDimensions = { width: number; height: number };
interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  galleryType: string;
  imageDimensions: { [key: string]: ImageDimensions }; // Accept dimensions object
}

export default function Lightbox({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  galleryType, 
  imageDimensions // Destructure new prop
}: LightboxProps) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, images.length]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  // Get dimensions for the current image
  const currentImageSrc = images[index];
  const currentDimensions = imageDimensions[currentImageSrc] || { width: 800, height: 1000 }; // Fallback dimensions

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="absolute top-4 left-4 z-[120] text-white text-sm font-mono">
        {index + 1} / {images.length}
      </div>
      
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 z-[120] p-2 text-white hover:opacity-70 transition-opacity"
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-2 text-white hover:opacity-70 transition-opacity"
        aria-label="Previous image"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] p-2 text-white hover:opacity-70 transition-opacity"
        aria-label="Next image"
      >
        <ChevronRight size={32} />
      </button>

      <div
        className="relative h-[90vh] w-full max-w-screen-lg flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={currentImageSrc}
          src={currentImageSrc}
          alt={`Image ${index + 1}`}
          width={currentDimensions.width}
          height={currentDimensions.height}
          className="object-contain max-h-[90vh] max-w-[90vw] w-auto h-auto"
          priority={index === currentIndex}
          unoptimized
        />
      </div>
    </div>
  );
}
