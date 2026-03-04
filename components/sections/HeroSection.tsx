"use client";
import { useEffect, useRef, useState } from "react";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import gsap from "gsap";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initial GSAP entrance
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out"
      });
      gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        delay: 0.5
      });
    }, containerRef);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden selection:bg-orange-500">
      
      {/* 1. LAYER: Subtle Noise/Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #333 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* 2. LAYER: Giant Background Watermark (Moves with Mouse) */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <h2 className="text-[30vw] font-black text-zinc-900/40 leading-none whitespace-nowrap">
          SURYA
        </h2>
      </div>

      {/* 3. LAYER: Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-6 md:p-10">
        <div className="nav-item font-black text-3xl tracking-tighter">
          S
        </div>
        
        <div className="flex items-end gap-12">
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-medium text-zinc-500">
            <a href="#about" className="nav-item hover:text-white transition-colors">About</a>
            <a href="#projects" className="nav-item hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="nav-item hover:text-white transition-colors">Contact</a>
            
          </div>
          {/* <button className="nav-item group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all">
            Let's Talk <BsArrowUpRightCircleFill className="group-hover:rotate-45 transition-transform" />
          </button> */}
        </div>
      </nav>

      {/* 4. LAYER: Main Content (The "Stage") */}
      <main className="relative z-10 flex flex-col justify-center min-h-screen px-6 md:px-20">
        <div className="max-w-5xl">
          {/* Tagline */}
          <div className="hero-line flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-orange-500" />
            <span className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-orange-500">
              one Year of experience
            </span>
          </div>

          {/* Main Titles */}
          <div ref={textRef} className="space-y-2">
            <div className="overflow-hidden">
              <h1 className="hero-line text-6xl md:text-[120px] font-bold leading-[0.9] tracking-tighter">
                MERN STACK
              </h1>
            </div>
            <div className="overflow-hidden flex items-center gap-6">
              <h1 className="hero-line text-6xl md:text-[120px] font-bold leading-[0.9] tracking-tighter italic text-transparent stroke-text">
                DEVELOPER
              </h1>
            </div>
          </div>

          {/* Intro Paragraph */}
          <div className="hero-line mt-12 max-w-md">
            <p className="text-zinc-400 text-lg leading-relaxed">
              Crafting high-performance digital experiences with a focus on 
              <span className="text-white"> scalable architecture</span> and 
              <span className="text-white"> minimalist design.</span>
            </p>
          </div>
        </div>
      </main>

      {/* 5. LAYER: Corner Stats/Details */}
      {/* <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="hero-line flex flex-col gap-1">
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Availability</span>
          <span className="text-xs font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Open for New Projects
          </span>
        </div>
      </div> */}

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
        .stroke-text:hover {
          -webkit-text-stroke: 1px #f97316;
          transition: all 0.5s ease;
        }
      `}</style>
    </div>
  );
}