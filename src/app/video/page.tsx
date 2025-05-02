'use client';

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// Video content data
const videoContent = [
  {
    id: "runway-compilation",
    title: "Runway Compilation 2023-2024",
    thumbnail: "https://static.wixstatic.com/media/b52b2f_8ce16fcdf09945258f9ee89e2cae60ec~mv2.png/v1/fit/w_480,h_721,q_90,enc_avif,quality_auto/b52b2f_8ce16fcdf09945258f9ee89e2cae60ec~mv2.png",
    description: "A compilation of Nakul's runway appearances from fashion weeks around the world, featuring his work with top designers.",
    duration: "3:42",
    date: "April 2024",
    tags: ["Runway", "Fashion Week", "Compilation"]
  },
  {
    id: "brand-campaign-louis-vuitton",
    title: "Louis Vuitton SS24 Campaign",
    thumbnail: "https://static.wixstatic.com/media/b52b2f_159c64298193465dbdf183729f7c104d~mv2.jpg/v1/fit/w_480,h_721,q_90,enc_avif,quality_auto/b52b2f_159c64298193465dbdf183729f7c104d~mv2.jpg",
    description: "Behind the scenes of Nakul's photoshoot for the Louis Vuitton Spring/Summer 2024 campaign in Paris.",
    duration: "2:15",
    date: "February 2024",
    tags: ["Campaign", "Behind the Scenes", "Louis Vuitton"]
  },
  {
    id: "interview-milan",
    title: "Milan Fashion Week Interview",
    thumbnail: "https://static.wixstatic.com/media/b52b2f_dacfe6b56e074e81a22a2e430cc6a937~mv2.jpg/v1/fit/w_480,h_723,q_90,enc_avif,quality_auto/b52b2f_dacfe6b56e074e81a22a2e430cc6a937~mv2.jpg",
    description: "Exclusive interview with Nakul during Milan Fashion Week discussing his career, inspirations, and future aspirations.",
    duration: "5:20",
    date: "September 2023",
    tags: ["Interview", "Milan Fashion Week"]
  },
  {
    id: "fitness-routine",
    title: "Fitness Routine: Behind the Runway",
    thumbnail: "https://static.wixstatic.com/media/b52b2f_793330a6b0df4c5a84b62b4546a2f320~mv2.jpg/v1/fit/w_480,h_721,q_90,enc_avif,quality_auto/b52b2f_793330a6b0df4c5a84b62b4546a2f320~mv2.jpg",
    description: "Nakul shares his fitness regime and diet plan that helps him stay in top shape for modeling assignments.",
    duration: "4:10",
    date: "June 2023",
    tags: ["Fitness", "Lifestyle", "Behind the Scenes"]
  },
  {
    id: "portfolio-showreel",
    title: "Portfolio Showreel 2023",
    thumbnail: "https://static.wixstatic.com/media/b52b2f_170bd887c0bc4dd294b0b9be2351e4a0~mv2.jpg/v1/fit/w_480,h_721,q_90,enc_avif,quality_auto/b52b2f_170bd887c0bc4dd294b0b9be2351e4a0~mv2.jpg",
    description: "A dynamic showcase of Nakul's best modeling work from 2023, featuring print campaigns, runway appearances, and commercial work.",
    duration: "2:30",
    date: "January 2023",
    tags: ["Showreel", "Portfolio", "Compilation"]
  }
];

// Filter options
const allTags = Array.from(new Set(videoContent.flatMap(video => video.tags)));

export default function VideoPage() {
  const [activeVideo, setActiveVideo] = useState(videoContent[0]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredVideos = selectedTags.length === 0
    ? videoContent
    : videoContent.filter(video =>
        video.tags.some(tag => selectedTags.includes(tag))
      );

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
            <Link href="/shows" className="nav-link">SHOWS</Link>
            <Link href="/video" className="nav-link font-medium">VIDEO</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <h1 className="text-5xl font-medium font-cormorant mb-6">VIDEO CONTENT</h1>
        <p className="mb-8 text-lg">
          Explore Nakul Bhardwaj&apos;s video portfolio including runway shows, interviews, behind-the-scenes footage, and more.
        </p>

        <Separator className="my-8" />

        {/* Featured Video Player */}
        <div className="mb-12">
          <div className="aspect-video w-full bg-gray-100 relative">
            {/* Video placeholder - in a real implementation, this would be replaced with actual video */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center">
                <Image
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  fill
                  className="object-cover object-center opacity-70"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 flex flex-col items-center">
                  <svg
                    className="w-16 h-16 text-white"
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
                  <p className="mt-4 text-white text-lg font-medium">{activeVideo.title}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-medium mb-2">{activeVideo.title}</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {activeVideo.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-4">{activeVideo.duration} • {activeVideo.date}</p>
            <p className="text-gray-700">{activeVideo.description}</p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Video Filters */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-sm text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="px-3 py-1 rounded-sm text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Video Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className={`border cursor-pointer transition-transform hover:scale-[1.02] ${
                activeVideo.id === video.id ? 'border-gray-900' : 'border-gray-200'
              }`}
              onClick={() => setActiveVideo(video)}
            >
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-black/60 text-white p-2 rounded-full">
                    <svg
                      className="w-8 h-8"
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
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">{video.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{video.duration} • {video.date}</p>
                <p className="text-sm text-gray-700 line-clamp-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No videos match your selected filters.</p>
            <button
              onClick={() => setSelectedTags([])}
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-sm hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
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
    </main>
  );
}
