'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Lightbox from "@/components/lightbox";
import { Mail, Instagram, Linkedin } from 'lucide-react';

// Hero image path - to exclude from portfolio
const HERO_IMAGE = "/PSP06449.jpg";

// Dynamically list all images from the public directory (needs manual update if not server-rendered)
// Ensure this list is updated if images in /public change
const allImages = [
  "/DSC06002.jpg",
  "/DSC06700.jpg",
  "/DSC05908.jpg",
  "/DSC05764.jpg",
  "/PSP06633.JPG",
  "/PSP06518.JPG",
  "/PSP06485.jpg",
  "/PSP06604.JPG",
  "/PSP06609.JPG",
  "/PSP06627.JPG",
  "/PSP06657.JPG",
  "/PSP06562.jpg",
  "/PSP06450.jpg",
  "/PSP06444.jpg",
  "/PSP06449.jpg", // Hero image, will be filtered out
  "DSC06971.jpg",
  "IMG_20240601_013652_478.jpg",
  "/IMG-20250414-WA0005.jpg",
  "/IMG-20250414-WA0006.jpg",
  "/IMG-20250414-WA0007.jpg",
  "/IMG-20250414-WA0008.jpg",
];

// Filter out the hero image
const portfolioImages = allImages.filter(img => img !== HERO_IMAGE);

// Type for storing dimensions
type ImageDimensions = { width: number; height: number };

export default function NakulPortfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryType, setGalleryType] = useState('portfolio');
  const [imageDimensions, setImageDimensions] = useState<{ [key: string]: ImageDimensions }>({});
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Function to load image and get dimensions
    const getMeta = (url: string): Promise<ImageDimensions> => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = (err) => reject(err);
        img.src = url;
      });
    };

    // Calculate dimensions for all images (including hero)
    const loadAllImageDimensions = async () => {
      const dimensions: { [key: string]: ImageDimensions } = {};
      for (const src of allImages) { // Load dimensions for ALL images
        try {
          dimensions[src] = await getMeta(src);
        } catch (error) {
          console.error(`Failed to load dimensions for ${src}:`, error);
          // Provide a default fallback dimension if loading fails
          dimensions[src] = { width: 3, height: 4 }; 
        }
      }
      setImageDimensions(dimensions);
    };

    loadAllImageDimensions();
  }, []); // Run only once on mount

  // Effect for controlling header visibility on scroll
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') { 
        if (window.scrollY > lastScrollY && window.scrollY > 50) { // if scroll down hide the navbar
          setShowHeader(false);
        } else { // if scroll up show the navbar
          setShowHeader(true);
        }
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  // Helper function to get dimensions or fallback
  const getDimensions = (src: string): ImageDimensions => {
    return imageDimensions[src] || { width: 3, height: 4 }; // Default portrait before loaded
  };

  // Helper function to check orientation
  const isLandscape = (src: string): boolean => {
    const dims = getDimensions(src);
    // Consider square as portrait for layout purposes, or adjust as needed
    return dims.width > dims.height; 
  };

  const openLightbox = (images: string[], index: number, type: string) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setGalleryType(type);
    setLightboxOpen(true);
  };

  const heroDimensions = getDimensions(HERO_IMAGE);
  const heroAspectRatioStyle = imageDimensions[HERO_IMAGE]
    ? { aspectRatio: `${heroDimensions.width} / ${heroDimensions.height}` }
    : { paddingTop: '125%'}; // Fallback aspect ratio (e.g., 4:5 portrait)

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header/Navigation (Auto-hiding) */}
      <header className={`py-4 border-b sticky top-0 bg-white z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto flex justify-center items-center px-4 md:px-8"> 
          <nav className="flex space-x-8">
            <a href="#about" className="nav-link">ABOUT</a>
            <a href="#portfolio" className="nav-link">ALL WORK</a>
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
  
              <p className="text-sm mb-6 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis magna varius condimentum. 
                Integer ac magna eget velit sagittis commodo eget vel nisi.
              </p>

              {/* Buttons and Socials Row */}
              <div className="flex items-center space-x-8 mt-4 mb-8">
                {/* Polaroids Button (Styled as Nav Link) */}
                <button className="font-sans text-sm uppercase tracking-wider hover:opacity-70 transition-opacity duration-200">
                  POLAROIDS
                </button>

                {/* Social Links (Thinner stroke, more space) */}
                <div className="flex space-x-6">
                  <Link href="mailto:models@anonmodels.com" className="opacity-70 hover:opacity-100">
                    <Mail size={20} strokeWidth={1.5} />
                  </Link>
                  <Link href="https://www.instagram.com/anonmodels.in" target="_blank" className="opacity-70 hover:opacity-100">
                    <Instagram size={20} strokeWidth={1.5} />
                  </Link>
                  <Link href="https://www.linkedin.com/company/anon-models-llp" target="_blank" className="opacity-70 hover:opacity-100">
                    <Linkedin size={20} strokeWidth={1.5} />
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
            <div className="md:col-span-5 relative w-full cursor-pointer" style={heroAspectRatioStyle}>
              {imageDimensions[HERO_IMAGE] && ( 
                <Image
                  src={HERO_IMAGE}
                  alt="Nithin/Spidey portrait"
                  fill
                  className="object-cover object-center"
                  onClick={() => openLightbox([HERO_IMAGE], 0, 'profile')}
                  priority 
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* "All Work" Section Label */}
      <div id="portfolio" className="px-4 md:px-8 py-6 scroll-mt-16">
        <h2 className="text-2xl font-sans font-bold uppercase">ALL WORK</h2>
      </div>

      {/* Image Gallery - Full Bleed Responsive CSS Columns */}
      <section className="w-full px-1">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2"> 
          {portfolioImages.map((src, i) => {
            if (!imageDimensions[src]) {
              // Placeholder for loading state
              return <div key={src} className="bg-gray-200 aspect-[3/4] mb-2"></div>; 
            }
            const dims = getDimensions(src);
            
            return (
              <div 
                key={`portfolio-${i}-${src.substring(src.lastIndexOf('/') + 1)}`}
                className={`relative mb-2 cursor-pointer overflow-hidden`}
                style={{ 
                  aspectRatio: `${dims.width} / ${dims.height}`,
                  breakInside: 'avoid'
                }}
              >
                <Image
                  src={src}
                  alt={`Portfolio image ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                  onClick={() => openLightbox(portfolioImages, i, 'portfolio')}
                  loading="lazy" // Lazy load gallery images
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer - Thinner */}
      <footer className="mt-24 bg-white py-4 border-t">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="mailto:models@anonmodels.com" className="opacity-70 hover:opacity-100">
                 <Mail size={20} strokeWidth={1.5}/>
              </Link>
              <Link href="https://www.instagram.com/anonmodels.in" target="_blank" className="opacity-70 hover:opacity-100">
                <Instagram size={20} strokeWidth={1.5}/>
              </Link>
              <Link href="https://www.linkedin.com/company/anon-models-llp" target="_blank" className="opacity-70 hover:opacity-100">
                <Linkedin size={20} strokeWidth={1.5}/>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={portfolioImages}
        currentIndex={lightboxIndex}
        galleryType={galleryType}
        imageDimensions={imageDimensions}
      />
    </main>
  );
}
