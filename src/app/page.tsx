'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Lightbox from "@/components/lightbox";

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
      {/* Header/Navigation */}
      <header className="py-4 border-b sticky top-0 bg-white z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
          <Link href="/" className="text-xl font-medium">
            <Image
              src="https://ext.same-assets.com/2891512280/502141871.png"
              alt="Logo"
              width={50}
              height={25}
              className="object-contain opacity-0"
            />
          </Link>
          <nav className="flex space-x-8">
            <a href="#about" className="nav-link">ABOUT</a>
            <a href="#portfolio" className="nav-link">ALL WORK</a>
          </nav>
        </div>
      </header>

      {/* Main Content - Hero Section (Smaller Image) */}
      <section id="about" className="container mx-auto py-12 md:py-16 px-4 md:px-8 scroll-mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left column - Profile & Info (Wider) */}
          <div className="md:col-span-5 flex flex-col"> {/* Increased span */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-cormorant tracking-tight mb-4 uppercase">NITHIN/<br />SPIDEY</h1>

            <p className="text-sm mb-6 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis magna varius condimentum. 
              Integer ac magna eget velit sagittis commodo eget vel nisi.
            </p>

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

          {/* Profile Image (Smaller) - Respecting original aspect ratio */}
          <div className="md:col-span-7 relative w-full cursor-pointer" style={heroAspectRatioStyle}> {/* Decreased span */}
            {imageDimensions[HERO_IMAGE] && ( // Render only when dimensions are loaded
              <Image
                src={HERO_IMAGE}
                alt="Nithin/Spidey portrait"
                fill
                className="object-cover object-center"
                onClick={() => openLightbox([HERO_IMAGE], 0, 'profile')}
                priority // Prioritize loading the hero image
              />
            )}
          </div>
        </div>
      </section>

      {/* Work Profile Section Label */}
      <div id="portfolio" className="container mx-auto px-4 md:px-8 py-8 scroll-mt-16">
        <h2 className="text-lg uppercase tracking-wide">WORK PROFILE</h2>
        <Separator className="mt-2" />
      </div>

      {/* Image Gallery - Full Width Responsive Masonry Grid */}
      <section className="w-full px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {portfolioImages.map((src, i) => {
            if (!imageDimensions[src]) {
              // Optionally render a placeholder while dimensions load
              return <div key={src} className="bg-gray-200 aspect-[3/4]"></div>; 
            }
            const landscape = isLandscape(src);
            const dims = getDimensions(src);
            // Adjust column span for landscape images across breakpoints
            const colSpan = landscape 
              ? "sm:col-span-2 md:col-span-2 lg:col-span-2" 
              : "col-span-1";
            
            return (
              <div 
                key={`portfolio-${i}-${src.substring(src.lastIndexOf('/') + 1)}`}
                className={`${colSpan} relative cursor-pointer overflow-hidden`}
                style={{ aspectRatio: `${dims.width} / ${dims.height}` }}
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

      {/* Footer - Icons only */}
      <footer className="mt-auto bg-white py-8 border-t mt-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-6">
            {/* Social Icons Only */}
            <Link href="https://www.behance.net/anonmodels" target="_blank" className="opacity-70 hover:opacity-100">
              <Image
                src="https://ext.same-assets.com/2891512280/3091884418.png"
                alt="Behance"
                width={24}
                height={24}
              />
            </Link>
            <Link href="mailto:models@anonmodels.com" className="opacity-70 hover:opacity-100">
              <Image
                src="https://ext.same-assets.com/2891512280/3316129701.webp"
                alt="Email"
                width={24}
                height={24}
              />
            </Link>
            <Link href="https://www.pinterest.it/anonmodels/" target="_blank" className="opacity-70 hover:opacity-100">
              <Image
                src="https://ext.same-assets.com/2891512280/1244889337.png"
                alt="Pinterest"
                width={24}
                height={24}
              />
            </Link>
            <Link href="https://www.tiktok.com/@anonmodels.in" target="_blank" className="opacity-70 hover:opacity-100">
              <Image
                src="https://ext.same-assets.com/2891512280/3822963496.png"
                alt="TikTok"
                width={24}
                height={24}
              />
            </Link>
            <Link href="https://www.instagram.com/anonmodels.in" target="_blank" className="opacity-70 hover:opacity-100">
              <Image
                src="https://ext.same-assets.com/2891512280/415325346.png"
                alt="Instagram"
                width={24}
                height={24}
              />
            </Link>
            <Link href="https://www.linkedin.com/company/anon-models-llp" target="_blank" className="opacity-70 hover:opacity-100">
              <Image
                src="https://ext.same-assets.com/2891512280/2761650577.webp"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </Link>
            <Link href="https://models.com/agency/anon-models" target="_blank" className="opacity-70 hover:opacity-100">
              <Image
                src="https://ext.same-assets.com/2891512280/4134508662.png"
                alt="Models.com"
                width={24}
                height={24}
              />
            </Link>
            <Link href="https://www.facebook.com/anonmodelmanagement/" target="_blank" className="opacity-70 hover:opacity-100">
              <Image
                src="https://ext.same-assets.com/2891512280/2784159118.png"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>
          </div>
          {/* Removed text links div */}
        </div>
      </footer>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={portfolioImages}
        currentIndex={lightboxIndex}
        galleryType={galleryType}
      />
    </main>
  );
}
