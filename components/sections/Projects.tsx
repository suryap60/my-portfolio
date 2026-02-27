"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  video?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "NEOCARZ",
    category: "Car Rental Platform",
    description: "Built a scalable React-Next frontend for a Saudi-based vehicle rental system with search, filtering, and booking flows.",
    image: "/assets/images/projects/neocarz.png",
    video: "/assets/videos/neocarz.mp4"
  },
  {
    id: 2,
    title: "MENU STARTER",
    category: "Food Ordering Platform",
    description: "Developed Admin and Customer web platforms for a multi-restaurant food ordering system with category-based browsing.",
    image: "/assets/images/projects/menustarter.png"
  },
  {
    id: 3,
    title: "KAFFAWAY",
    category: "Coffee E-Commerce",
    description: "Online coffee e-commerce platform with Redux-based state management for products, cart, and wishlist.",
    image: "/assets/images/projects/kaffaway.png"
  },
  {
    id: 4,
    title: "WORKEX CRM",
    category: "CRM System",
    description: "Designed and developed CRM, HRM, and Project Management modules using React + TypeScript.",
    image: "/assets/images/projects/workhex.png"
  },
  {
    id: 5,
    title: "ISME CRM",
    category: "Management System",
    description: "Delivered responsive dashboards for CRM, HRM, and user management modules with REST API integration.",
    image: "/assets/images/projects/isme.png"
  },
  {
    id: 6,
    title: "XCHOOL",
    category: "School Management",
    description: "Developed portals for students, parents, teachers, and administrators with role-based access control.",
    image: "/assets/images/projects/xchools.png"
  },
  {
    id: 7,
    title: "BIN ABAD",
    category: "Corporate Website",
    description: "Built a Figma-accurate Next.js UI with responsive layouts and GSAP animations for Qatar-based company.",
    image: "/assets/images/projects/bin-abad.jpg"
  },
  {
    id: 8,
    title: "BRANDSTREK",
    category: "Marketing Website",
    description: "Company's main marketing website using React + Next.js, optimized for SEO with server-side rendering.",
    image: "/assets/images/projects/brandstrek.jpg"
  },
  {
    id: 9,
    title: "ISTHRA RESORT",
    category: "Booking System",
    description: "Resort booking platform with room categories, photo galleries, amenities display, and inquiry forms.",
    image: "/assets/images/projects/isthra.jpg"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const cards = cardsRef.current;
    const cardWidth = 658; // 650px + 8px gap
    const totalWidth = projects.length * cardWidth;
    const scrollDistance = totalWidth - window.innerWidth + 200;

    // GSAP Horizontal Scroll Animation
    const scrollTween = gsap.to(cards, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollDistance * 2}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black">
      <div className="h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-black px-8 py-8 z-10">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none text-white">
            PROJECTS
          </h2>
          <p className="text-gray-400 text-base mt-3 max-w-2xl">
            A showcase of innovative solutions and digital experiences
          </p>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="flex-1 flex items-center overflow-hidden py-8">
          <div 
            ref={cardsRef}
            className="flex gap-8 px-8"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 relative rounded-xl overflow-hidden group"
                style={{
                  width: '650px',
                  height: '420px'
                }}
              >
                {/* Background Image/Video */}
                <div className="absolute inset-0">
                  {project.video ? (
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.style.background = 'linear-gradient(135deg, #1f2937 0%, #111827 100%)';
                        }
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                </div>

                {/* Project Title - Top Right */}
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full">
                    <h3 className="text-white text-sm font-bold tracking-wider">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Center Content Card */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 max-w-md transform group-hover:scale-105 transition-transform duration-300 shadow-2xl">
                    <h4 className="text-2xl font-bold text-black mb-3">
                      {project.category}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {/* Video Icon/Indicator - Show on all cards */}
                    <div className="flex items-center gap-2 text-black mb-4">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <span className="text-xs font-medium">
                        {project.video ? 'Video Preview' : 'Project Preview'}
                      </span>
                    </div>
                    
                    <button className="px-6 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>

                {/* Border */}
                <div className="absolute inset-0 rounded-xl border-2 border-white/20 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
