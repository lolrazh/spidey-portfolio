'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Lightbox from "@/components/lightbox";

// Fashion show images from the main page
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

// More detailed fashion show data
const fashionShowDetails = [
  {
    id: "vivienne-westwood-fw24",
    name: "Vivienne Westwood FW24",
    location: "Paris Fashion Week",
    date: "March 2024",
    designer: "Vivienne Westwood",
    description: "Showcasing the latest Vivienne Westwood Fall/Winter 2024 collection in Paris.",
    fullDescription: "Nakul Bhardwaj walked for the Vivienne Westwood Fall/Winter 2024 show during Paris Fashion Week. The collection featured the brand's signature punk aesthetic with a modern twist, incorporating sustainable fabrics and upcycled materials. The show was attended by various celebrities and fashion industry insiders, receiving critical acclaim for its innovative designs and commitment to sustainability.",
    images: [fashionShowImages[0], fashionShowImages[1], fashionShowImages[2]],
    videoUrl: null
  },
  {
    id: "prada-ss24",
    name: "Prada SS24",
    location: "Milan Fashion Week",
    date: "September 2023",
    designer: "Miuccia Prada & Raf Simons",
    description: "Walking for Prada's Spring/Summer 2024 menswear collection.",
    fullDescription: "Nakul was selected to walk for Prada's Spring/Summer 2024 menswear collection at Milan Fashion Week. The collection explored themes of minimalism and functionality, with clean lines and innovative tailoring. The show took place in Prada's headquarters in Milan, transformed into an immersive space designed by renowned architects. The collection received positive reviews for its contemporary approach to classic menswear.",
    images: [fashionShowImages[3], fashionShowImages[4], fashionShowImages[5]],
    videoUrl: null
  },
  {
    id: "louis-vuitton-fw23",
    name: "Louis Vuitton FW23",
    location: "Paris Fashion Week",
    date: "January 2023",
    designer: "Louis Vuitton",
    description: "Featured in the Louis Vuitton Fall/Winter 2023 show.",
    fullDescription: "Nakul made a significant appearance in the Louis Vuitton Fall/Winter 2023 show during Paris Fashion Week. The collection focused on luxury craftsmanship and innovative designs, featuring Louis Vuitton's iconic patterns and materials. The runway show was set against a dramatic backdrop that complemented the collection's themes. This marked an important milestone in Nakul's modeling career, establishing him as a sought-after model for luxury fashion brands.",
    images: [fashionShowImages[6], fashionShowImages[7], fashionShowImages[8]],
    videoUrl: null
  }
];

export default function ShowsPage() {
  const [selectedShow, setSelectedShow] = useState(fashionShowDetails[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setLightboxIndex(index);
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
            <Link href="/" className="nav-link">HOME</Link>
            <Link href="/shows" className="nav-link font-medium">SHOWS</Link>
            <Link href="/video" className="nav-link">VIDEO</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <h1 className="text-5xl font-medium font-cormorant mb-6">FASHION SHOWS</h1>
        <p className="mb-8 text-lg">
          Explore Nakul Bhardwaj&apos;s runway appearances and fashion show portfolio. From prestigious fashion weeks to notable designer collaborations, discover the highlights of his modeling career.
        </p>

        <Separator className="my-8" />

        {/* Shows Navigation */}
        <div className="flex flex-wrap gap-4 mb-12">
          {fashionShowDetails.map((show) => (
            <button
              key={show.id}
              onClick={() => setSelectedShow(show)}
              className={`px-4 py-2 rounded-sm transition-colors ${
                selectedShow.id === show.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {show.name}
            </button>
          ))}
        </div>

        {/* Selected Show Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Show Info */}
          <div>
            <h2 className="text-3xl font-cormorant font-medium mb-4">{selectedShow.name}</h2>

            <div className="mb-6">
              <p className="mb-2"><span className="font-medium">Location:</span> {selectedShow.location}</p>
              <p className="mb-2"><span className="font-medium">Date:</span> {selectedShow.date}</p>
              <p className="mb-2"><span className="font-medium">Designer:</span> {selectedShow.designer}</p>
            </div>

            <div className="prose max-w-none">
              <p className="text-lg mb-4">{selectedShow.description}</p>
              <p>{selectedShow.fullDescription}</p>
            </div>
          </div>

          {/* Show Images */}
          <div className="grid grid-cols-1 gap-4">
            {selectedShow.images.map((image, index) => (
              <div
                key={`${selectedShow.id}-image-${index}`}
                className="relative aspect-[3/2] cursor-pointer group"
                onClick={() => openLightbox(selectedShow.images, index)}
              >
                <Image
                  src={image}
                  alt={`${selectedShow.name} image ${index + 1}`}
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
        </div>

        <Separator className="my-12" />

        {/* Recent Shows Gallery */}
        <h2 className="text-2xl font-medium mb-6">All Fashion Show Appearances</h2>
        <div className="image-gallery">
          {fashionShowImages.map((src, i) => (
            <div
              key={`fashion-${i}-${src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('~'))}`}
              className="relative aspect-[3/4] cursor-pointer group"
              onClick={() => openLightbox(fashionShowImages, i)}
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
      </div>

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
            <Link href="/" className="text-gray-600 hover:text-black">HOME</Link>
            <Link href="/shows" className="text-gray-600 hover:text-black">SHOWS</Link>
            <Link href="/video" className="text-gray-600 hover:text-black">VIDEO</Link>
            <Link href="https://www.anonmodels.com" className="text-gray-600 hover:text-black">ANON MODELS</Link>
          </div>
        </div>
      </footer>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={selectedShow.images}
        currentIndex={lightboxIndex}
        galleryType="fashion-show"
      />
    </main>
  );
}
