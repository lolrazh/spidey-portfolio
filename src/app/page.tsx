'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Lightbox from "@/components/lightbox";

// Hero image path - to exclude from portfolio
const HERO_IMAGE = "/PSP06449.jpg";

// We'll use these images from the public folder
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
  "/PSP06449.jpg",
  "/IMG-20250414-WA0005.jpg",
  "/IMG-20250414-WA0006.jpg",
  "/IMG-20250414-WA0007.jpg",
  "/IMG-20250414-WA0008.jpg",
];

// Filter out the hero image
const portfolioImages = allImages.filter(img => img !== HERO_IMAGE);

export default function NakulPortfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryType, setGalleryType] = useState('portfolio');
  const [imageAspectRatios, setImageAspectRatios] = useState<{[key: string]: number}>({});

  useEffect(() => {
    // Function to load image and calculate aspect ratio
    const calculateAspectRatio = async (src: string) => {
      return new Promise<number>((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          resolve(img.width / img.height);
        };
        img.src = src;
      });
    };

    // Calculate aspect ratios for all portfolio images
    const loadAspectRatios = async () => {
      const ratios: {[key: string]: number} = {};
      
      for (const src of portfolioImages) {
        try {
          ratios[src] = await calculateAspectRatio(src);
        } catch (error) {
          console.error(`Error loading image ${src}:`, error);
          ratios[src] = 0.75; // Default to portrait aspect ratio
        }
      }
      
      setImageAspectRatios(ratios);
    };

    loadAspectRatios();
  }, []);

  const openLightbox = (images: string[], index: number, type: string) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setGalleryType(type);
    setLightboxOpen(true);
  };

  const isLandscape = (src: string) => {
    const ratio = imageAspectRatios[src] || 0.75;
    return ratio >= 1;
  };

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

      {/* Main Content - Hero Section */}
      <section id="about" className="container mx-auto py-12 md:py-16 px-4 md:px-8 scroll-mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left column - Profile & Info */}
          <div className="md:col-span-3 flex flex-col">
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

          {/* Profile Image */}
          <div className="md:col-span-9 relative h-[600px] md:h-[700px] cursor-pointer">
            <Image
              src={HERO_IMAGE}
              alt="Nithin/Spidey portrait"
              fill
              className="object-cover object-center"
              onClick={() => openLightbox([HERO_IMAGE], 0, 'profile')}
            />
          </div>
        </div>
      </section>

      {/* Work Profile Section Label */}
      <div id="portfolio" className="container mx-auto px-4 md:px-8 py-8 scroll-mt-16">
        <h2 className="text-lg uppercase tracking-wide">WORK PROFILE</h2>
        <Separator className="mt-2" />
      </div>

      {/* Image Gallery - Masonry grid with original aspect ratios */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {portfolioImages.map((src, i) => {
            // Set column span based on aspect ratio
            const colSpan = isLandscape(src) ? "md:col-span-8" : "md:col-span-4";
            const aspect = isLandscape(src) ? "aspect-[4/3]" : "aspect-[3/4]";
            
            return (
              <div 
                key={`portfolio-${i}-${src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))}`}
                className={`${colSpan} relative ${aspect} cursor-pointer overflow-hidden`}
              >
                <Image
                  src={src}
                  alt={`Portfolio image ${i + 1}`}
                  fill
                  className="object-cover"
                  onClick={() => openLightbox([src], 0, 'portfolio')}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white py-8 border-t mt-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-6">
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

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <a href="#about" className="text-gray-600 hover:text-black">ABOUT</a>
            <a href="#portfolio" className="text-gray-600 hover:text-black">PORTFOLIO</a>
            <Link href="https://www.anonmodels.com" className="text-gray-600 hover:text-black">HOME</Link>
            <Link href="https://www.anonmodels.com/delhi" className="text-gray-600 hover:text-black">DELHI</Link>
            <Link href="https://www.anonmodels.com/copy-of-delhi" className="text-gray-600 hover:text-black">MUMBAI</Link>
            <Link href="https://www.anonmodels.com/aboutanon" className="text-gray-600 hover:text-black">ABOUT ANON</Link>
            <Link href="https://www.anonmodels.com/joinanon" className="text-gray-600 hover:text-black">JOIN ANON</Link>
          </div>
        </div>
      </footer>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        galleryType={galleryType}
      />
    </main>
  );
}
