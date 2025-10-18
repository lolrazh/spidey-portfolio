'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Lightbox from "@/components/lightbox";
import { Mail, Instagram, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import galleryData from "@/content/gallery.json";

type GalleryImage = {
  image: string;
  lightboxImage?: string;
  alt?: string;
};

type GalleryContent = {
  hero: GalleryImage;
  polaroid: GalleryImage;
  portfolio: GalleryImage[];
};

type LightboxImage = {
  src: string;
  alt: string;
};

const galleryContent = galleryData as GalleryContent;

export default function SpideyPortfolio() {
  const heroImage = galleryContent.hero;
  const polaroidImage = galleryContent.polaroid;
  const portfolioImages = galleryContent.portfolio;
  const portfolioLightboxImages: LightboxImage[] = portfolioImages.map((item, index) => ({
    src: item.lightboxImage ?? item.image,
    alt: item.alt ?? `Portfolio image ${index + 1}`,
  }));

  // Gallery Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Polaroid Lightbox State
  const [polaroidLightboxOpen, setPolaroidLightboxOpen] = useState(false);

  // Header State
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // No longer need to fetch dimensions dynamically
  // const [imageDimensions, setImageDimensions] = useState<{ [key: string]: ImageDimensions }>({}); 

  // Effect for controlling header visibility on scroll
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') { 
        if (window.scrollY > lastScrollY && window.scrollY > 50) {
          setShowHeader(false);
        } else { 
          setShowHeader(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  // Gallery Lightbox Opener
  const openGalleryLightbox = (index: number) => {
    setLightboxImages(portfolioLightboxImages);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeGalleryLightbox = () => {
    setLightboxOpen(false);
  }

  // Polaroid Lightbox Opener
  const openPolaroidLightbox = () => {
    setPolaroidLightboxOpen(true);
  };

  const closePolaroidLightbox = () => {
    setPolaroidLightboxOpen(false);
  };

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Calculate position considering potential sticky header offset
      const headerOffset = 80; // Adjust based on your actual header height + desired gap
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header/Navigation (Auto-hiding) */}
      <header className={`py-4 border-b sticky top-0 bg-white z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto flex justify-center items-center px-4 md:px-8"> 
          <nav className="flex space-x-8">
            <button
              type="button"
              className="nav-link bg-transparent border-0 p-0"
              onClick={(e) => handleSmoothScroll(e, 'about')} >
              ABOUT
            </button>
            <button
              type="button"
              className="nav-link bg-transparent border-0 p-0"
              onClick={(e) => handleSmoothScroll(e, 'portfolio')} >
              ALL WORK
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content - Hero Section */}
      <section id="about" className="container mx-auto py-12 md:py-16 px-4 md:px-8 scroll-mt-16">
        <div className="max-w-5xl mx-auto"> 
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left column - Profile & Info */}
            <div className="md:col-span-6 flex flex-col">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-cormorant tracking-tight mb-4 uppercase">NITHIN/SPIDEY</h1>
  
              <p className="text-sm mb-4 mt-2">
              Hi, I'm Spidey! I'm an architect-turned-model. 
              I bring creativity, energy, and flawless style to every shoot. Want to work together? <br /> Let's make something cool happen!
              </p>

              {/* Buttons and Socials Row */}
              <div className="flex items-center space-x-8 mt-4 mb-8">
                {/* Polaroids Button */}
                <button 
                  className="font-sans text-sm uppercase tracking-wider border border-current px-3 py-1 hover:opacity-70 transition-opacity duration-200"
                  onClick={openPolaroidLightbox} // Attach new handler
                >
                  POLAROIDS
                </button>

                {/* Social Links (Styled like Nav Links) */}
                <div className="flex space-x-6"> 
                  <Link href="mailto:spideyos@yahoo.com" className="text-current hover:opacity-70 transition-opacity duration-200"> {/* Apply hover opacity */} 
                    <Mail size={20} strokeWidth={1.0} /> 
                  </Link>
                  <Link href="https://www.instagram.com/spideyos" target="_blank" className="text-current hover:opacity-70 transition-opacity duration-200"> {/* Apply hover opacity */} 
                    <Instagram size={20} strokeWidth={1.0} /> 
                  </Link>
                  <Link href="https://www.linkedin.com/in/nithin-g-7733501a6/" target="_blank" className="text-current hover:opacity-70 transition-opacity duration-200"> {/* Apply hover opacity */} 
                    <Linkedin size={20} strokeWidth={1.0} /> 
                  </Link>
                </div>
              </div>

              {/* measurements */}
              <div className="grid grid-cols-3 -gap-y-1 text-xs">
                <div className="uppercase">HEIGHT</div>
                <div className="uppercase">CHEST</div>
                <div className="uppercase">WAIST</div>
                <div className="font-bold uppercase">6'0"/183CM</div>
                <div className="font-bold uppercase">37"/94CM</div>
                <div className="font-bold uppercase">29"/74CM</div>
                
                <div className="uppercase mt-3">HIP</div>
                <div className="uppercase mt-3">SHOE</div>
                <div className="uppercase mt-3">HAIR</div>
                <div className="font-bold uppercase">35"/89CM</div>
                <div className="font-bold uppercase">45.5</div>
                <div className="font-bold uppercase">BLACK</div>
              </div>
              <div className="grid grid-cols-1 -gap-y-1 text-xs mt-3">
                <div className="uppercase">EYE COLOR</div>
                <div className="font-bold uppercase">BROWN</div>
                
                <div className="uppercase mt-3">PRONOUNS</div>
                <div className="font-bold uppercase">HE/HIM/HIS</div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="md:col-span-5 relative w-full cursor-default">
              <img
                src={heroImage.image}
                alt={heroImage.alt ?? "Nithin/Spidey portrait"}
                loading="eager"
                className="object-cover object-center w-full h-auto"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* "All Work" Section Label */}
      <div id="portfolio" className="px-4 md:px-8 py-6 scroll-mt-16">
        <h2 className="text-2xl font-sans font-bold uppercase">ALL WORK</h2>
      </div>

      {/* Image Gallery */}
      <section className="w-full px-1">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2">
          {portfolioImages.map((image, i) => {
            const layoutId = `card-image-${i}`;
            return (
              <motion.div
                key={`portfolio-${i}-${image.image}`}
                layoutId={layoutId}
                className={"relative mb-2 cursor-pointer overflow-hidden group"}
                style={{ breakInside: 'avoid' }}
                onClick={() => openGalleryLightbox(i)}
              >
                <img
                  src={image.image}
                  alt={image.alt ?? `Portfolio image ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="object-cover w-full h-auto block"
                />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer - Thinner */}
      <footer className="mt-24 bg-white py-4 border-t">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
              {/* Social Icons Filtered (Styled like Nav Links) */}
              <Link href="mailto:spideyos@yahoo.com" className="text-current hover:opacity-70 transition-opacity duration-200"> {/* Apply hover opacity */} 
                 <Mail size={20} strokeWidth={1.0}/> 
              </Link>
              <Link href="https://www.instagram.com/spideyos" target="_blank" className="text-current hover:opacity-70 transition-opacity duration-200"> {/* Apply hover opacity */} 
                <Instagram size={20} strokeWidth={1.0}/> 
              </Link>
              <Link href="https://www.linkedin.com/in/nithin-g-7733501a6/" target="_blank" className="text-current hover:opacity-70 transition-opacity duration-200"> {/* Apply hover opacity */} 
                <Linkedin size={20} strokeWidth={1.0}/> 
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            key="gallery-lightbox"
            isOpen={lightboxOpen}
            onClose={closeGalleryLightbox}
            images={lightboxImages}
            currentIndex={lightboxIndex}
          />
        )}
      </AnimatePresence>

      {/* Polaroid Lightbox */}
      <AnimatePresence>
        {polaroidLightboxOpen && (
          <Lightbox
            key="polaroid-lightbox"
            isOpen={polaroidLightboxOpen}
            onClose={closePolaroidLightbox}
            images={[{
              src: polaroidImage.lightboxImage ?? polaroidImage.image,
              alt: polaroidImage.alt ?? "Polaroid image",
            }]}
            currentIndex={0}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
