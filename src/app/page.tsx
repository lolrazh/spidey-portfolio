'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Lightbox from "@/components/lightbox";

const portfolioImages = [
  "https://ext.same-assets.com/2891512280/917374722.png",
  "https://ext.same-assets.com/2891512280/2268899401.jpeg",
  "https://ext.same-assets.com/2891512280/1644936293.jpeg",
  "https://ext.same-assets.com/2891512280/4248680396.jpeg",
  "https://ext.same-assets.com/2891512280/1035341562.jpeg",
  "https://ext.same-assets.com/2891512280/3894711642.jpeg",
  "https://ext.same-assets.com/2891512280/996491070.jpeg",
  "https://ext.same-assets.com/2891512280/3652818179.jpeg",
  "https://ext.same-assets.com/2891512280/227102238.jpeg",
  "https://ext.same-assets.com/2891512280/587219674.jpeg",
  "https://ext.same-assets.com/2891512280/2016239768.jpeg",
  "https://ext.same-assets.com/2891512280/2223382105.jpeg",
  "https://ext.same-assets.com/2891512280/1146691142.jpeg",
  "https://ext.same-assets.com/2891512280/542610533.png",
  "https://ext.same-assets.com/2891512280/1378629045.jpeg",
  "https://ext.same-assets.com/2891512280/3859846694.jpeg",
  "https://ext.same-assets.com/2891512280/3051783193.png",
  "https://ext.same-assets.com/2891512280/2846154091.png",
  "https://ext.same-assets.com/2891512280/3698902223.jpeg",
  "https://ext.same-assets.com/2891512280/887874404.jpeg",
];

const fashionShowImages = [
  "https://static.wixstatic.com/media/b52b2f_8ce16fcdf09945258f9ee89e2cae60ec~mv2.png/v1/fit/w_480,h_721,q_90,enc_avif,quality_auto/b52b2f_8ce16fcdf09945258f9ee89e2cae60ec~mv2.png",
  "https://static.wixstatic.com/media/b52b2f_159c64298193465dbdf183729f7c104d~mv2.jpg/v1/fit/w_480,h_721,q_90,enc_avif,quality_auto/b52b2f_159c64298193465dbdf183729f7c104d~mv2.jpg",
  "https://static.wixstatic.com/media/b52b2f_09a6b7f12adb4c12b5c1477b95cd744e~mv2.png/v1/fit/w_480,h_721,q_90,enc_avif,quality_auto/b52b2f_09a6b7f12adb4c12b5c1477b95cd744e~mv2.png",
  "https://static.wixstatic.com/media/b52b2f_735e984c88254b628aa4960f6cecd34d~mv2.jpg/v1/fit/w_480,h_721,q_90,enc_avif,quality_auto/b52b2f_735e984c88254b628aa4960f6cecd34d~mv2.jpg",
  "https://static.wixstatic.com/media/b52b2f_dacfe6b56e074e81a22a2e430cc6a937~mv2.jpg/v1/fit/w_480,h_723,q_90,enc_avif,quality_auto/b52b2f_dacfe6b56e074e81a22a2e430cc6a937~mv2.jpg",
  "https://static.wixstatic.com/media/b52b2f_793330a6b0df4c5a84b62b4546a2f320~mv2.jpg/v1/fit/w_480,h_721,q_90,enc_avif,quality_auto/b52b2f_793330a6b0df4c5a84b62b4546a2f320~mv2.jpg",
  "https://static.wixstatic.com/media/b52b2f_8b86ca67005f446bb637b51d363821d9~mv2.png/v1/fit/w_480,h_600,q_90,enc_avif,quality_auto/b52b2f_8b86ca67005f446bb637b51d363821d9~mv2.png",
  "https://static.wixstatic.com/media/b52b2f_170bd887c0bc4dd294b0b9be2351e4a0~mv2.jpg/v1/fit/w_480,h_721,q_90,enc_avif,quality_auto/b52b2f_170bd887c0bc4dd294b0b9be2351e4a0~mv2.jpg",
  "https://static.wixstatic.com/media/b52b2f_9a0a46a025084eb286b98b523b8f0c09~mv2.jpg/v1/fit/w_480,h_856,q_90,enc_avif,quality_auto/b52b2f_9a0a46a025084eb286b98b523b8f0c09~mv2.jpg",
];

// Fashion show details
const fashionShowDetails = [
  {
    id: "vivienne-westwood-fw24",
    name: "Vivienne Westwood FW24",
    location: "Paris Fashion Week",
    date: "March 2024",
    designer: "Vivienne Westwood",
    description: "Showcasing the latest Vivienne Westwood Fall/Winter 2024 collection in Paris."
  },
  {
    id: "prada-ss24",
    name: "Prada SS24",
    location: "Milan Fashion Week",
    date: "September 2023",
    designer: "Miuccia Prada & Raf Simons",
    description: "Walking for Prada's Spring/Summer 2024 menswear collection."
  },
  {
    id: "louis-vuitton-fw23",
    name: "Louis Vuitton FW23",
    location: "Paris Fashion Week",
    date: "January 2023",
    designer: "Louis Vuitton",
    description: "Featured in the Louis Vuitton Fall/Winter 2023 show."
  }
];

export default function NakulPortfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [galleryType, setGalleryType] = useState('portfolio');

  const openLightbox = (images: string[], index: number, type: string) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setGalleryType(type);
    setLightboxOpen(true);
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
            <a href="#portfolio" className="nav-link">ALL WORK</a>
            <a href="#fashion-shows" className="nav-link">SHOWS</a>
            <a href="#video" className="nav-link">VIDEO</a>
            <a href="#about" className="nav-link">ABOUT</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section id="about" className="container mx-auto py-12 md:py-16 px-4 md:px-8 scroll-mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column - Profile & Info */}
          <div className="flex flex-col space-y-8">
            <h1 className="text-5xl font-medium font-cormorant">NAKUL B.</h1>

            <div className="flex space-x-4">
              <Link
                href="mailto:booking@anonmodels.com?subject=MODEL%20CARD%20%22NAKUL%22"
                className="underline text-sm uppercase"
              >
                MODEL CARD
              </Link>
              <Link
                href="mailto:booking@anonmodels.com?subject=POLAROID%20CARD%20%22NAKUL%22"
                className="underline text-sm uppercase"
              >
                POLAROIDS
              </Link>
            </div>

            <p className="text-base">
              Greetings, I&apos;m Nakul. I recently turned 21 years old, and I&apos;ve always enjoyed to compete in virtually anything and be the best at what I do. I&apos;ve been fascinated by high-adrenaline sports like parkour since I was seven years old, and I enjoy sports in general. My mother is the one who inspires me to work hard and consistently. I have always loved modeling and have looked up to many of the greatest models in the business. I hope to reach the top someday.
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p>HEIGHT 6&apos;3&quot;</p>
                <p>CHEST 36</p>
                <p>WAIST 26</p>
                <p>HIPS 36</p>
                <p>SHOE SIZE 45</p>
              </div>
              <div>
                <p>TOP SIZE M</p>
                <p>BOTTOM SIZE 29/30</p>
                <p>EYE COLOR BLACK</p>
                <p>HAIR COLOR DARK BROWN</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="https://models.com/models/nakul-bhardwaj" target="_blank">
                <Image
                  src="https://ext.same-assets.com/2891512280/502141871.png"
                  alt="ModelsDot"
                  width={100}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <Link href="https://www.nextmanagement.com/milan/milan-men-new-faces/all/2508668/nakul-bhardawaj#portfolio" target="_blank" className="text-sm uppercase font-medium">
                NEXT
              </Link>
              <Link href="https://www.nextmanagement.com/paris/paris-men-new-faces/all/2508668/nakul-bhardawaj#portfolio" target="_blank" className="text-sm uppercase font-medium">
                NEXT
              </Link>
              <Link href="https://milkmanagement.co.uk/clients/nakul" target="_blank" className="text-sm uppercase font-medium">
                THE MILK COLLECTIVE
              </Link>
              <Link href="https://tigers-mgmt.com/w/models/search/nakul/men-4605-nakul-bhardwaj" target="_blank" className="text-sm uppercase font-medium">
                TIGERS
              </Link>
              <Link href="https://www.kultmodels.se/sedcard/nakul-bhardwaj/4282" target="_blank" className="text-sm uppercase font-medium">
                KULT
              </Link>
              <Link href="https://www.dnamodels.com/div/men-development/model/nakul-bhardwaj2/p/11520/c/-1/?sid=63053/" target="_blank" className="text-sm uppercase font-medium">
                DNA
              </Link>
              <Link href="https://www.brooksmodelingagency.com/men/new-faces/1190-nakul-b/" target="_blank" className="text-sm uppercase font-medium">
                BROOKS
              </Link>
            </div>
          </div>

          {/* Right column - Profile Image */}
          <div
            className="relative h-[600px] md:h-[700px] cursor-pointer"
            onClick={() => openLightbox([
              "https://ext.same-assets.com/2891512280/3892006042.jpeg"
            ], 0, 'profile')}
          >
            <Image
              src="https://ext.same-assets.com/2891512280/3892006042.jpeg"
              alt="Nakul Bhardwaj"
              fill
              className="object-cover object-center"
            />
            <div className="absolute bottom-4 right-4 bg-black/40 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zoom-in">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="M11 8v6" />
                <path d="M8 11h6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Work Profile Section Label */}
      <div id="portfolio" className="container mx-auto px-4 md:px-8 py-8 scroll-mt-16">
        <h2 className="text-lg uppercase tracking-wide">WORK PROFILE</h2>
        <Separator className="mt-2" />
      </div>

      {/* Image Gallery */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="image-gallery">
          {portfolioImages.map((src, i) => (
            <div
              key={`portfolio-${i}-${src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))}}`}
              className="relative aspect-[3/4] cursor-pointer group"
              onClick={() => openLightbox(portfolioImages, i, 'portfolio')}
            >
              <Image
                src={src}
                alt={`Nakul portfolio image ${i + 1}`}
                fill
                className="object-cover object-center transition-all duration-300 group-hover:brightness-90"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/40 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zoom-in">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                    <path d="M11 8v6" />
                    <path d="M8 11h6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Presentation Video Section */}
      <div id="video" className="container mx-auto px-4 md:px-8 py-8 mt-16 scroll-mt-16">
        <h2 className="text-lg uppercase tracking-wide">PRESENTATION VIDEO</h2>
        <Separator className="mt-2" />
      </div>

      <section className="container mx-auto px-4 md:px-8 py-8">
        <div className="aspect-video w-full md:w-3/4 lg:w-2/3 mx-auto relative bg-gray-100">
          {/* Since we don't have an actual video for Nakul, we're placing a placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-4 text-gray-500">Video Presentation</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center items-center gap-2">
          <div className="w-16 h-1 bg-black" />
          <span className="text-xs">00:00 / 00:27</span>
        </div>
      </section>

      {/* Fashion Shows Section */}
      <div id="fashion-shows" className="container mx-auto px-4 md:px-8 py-8 mt-16 scroll-mt-16">
        <h2 className="text-lg uppercase tracking-wide">FASHION SHOWS</h2>
        <Separator className="mt-2" />
      </div>

      {/* Fashion Show Details */}
      <section className="container mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {fashionShowDetails.map((show) => (
            <div key={show.id} className="border p-4 hover:shadow-md transition-shadow">
              <h3 className="font-cormorant text-xl font-medium mb-2">{show.name}</h3>
              <p className="text-sm mb-1"><span className="font-medium">Location:</span> {show.location}</p>
              <p className="text-sm mb-1"><span className="font-medium">Date:</span> {show.date}</p>
              <p className="text-sm mb-1"><span className="font-medium">Designer:</span> {show.designer}</p>
              <p className="text-sm mt-3 text-gray-600">{show.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fashion Shows Gallery */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="image-gallery">
          {fashionShowImages.map((src, i) => (
            <div
              key={`fashion-${i}-${src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('~'))}`}
              className="relative aspect-[3/4] cursor-pointer group"
              onClick={() => openLightbox(fashionShowImages, i, 'fashion')}
            >
              <Image
                src={src}
                alt={`Nakul fashion show image ${i + 1}`}
                fill
                className="object-cover object-center transition-all duration-300 group-hover:brightness-90"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/40 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zoom-in">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                    <path d="M11 8v6" />
                    <path d="M8 11h6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
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
            <a href="#video" className="text-gray-600 hover:text-black">VIDEO</a>
            <a href="#fashion-shows" className="text-gray-600 hover:text-black">SHOWS</a>
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
