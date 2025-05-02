'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  galleryType: string;
}

export default function Lightbox({ isOpen, onClose, images, currentIndex, galleryType }: LightboxProps) {
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

  // When lightbox is open, prevent scrolling on the body
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300"
        aria-label="Close lightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      {/* Navigation buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
        }}
        className="absolute left-4 z-10 p-2 text-white hover:text-gray-300"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
        }}
        className="absolute right-4 z-10 p-2 text-white hover:text-gray-300"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Image container */}
      <div
        className="relative h-[80vh] max-h-[80vh] w-full max-w-4xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full">
          <Image
            src={images[index]}
            alt={`${galleryType} image ${index + 1}`}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Caption/Counter */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center text-white">
          <p className="text-sm">
            {galleryType === 'portfolio' ? 'Portfolio' : 'Fashion Show'} {index + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
