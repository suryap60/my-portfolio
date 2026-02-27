"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    id: 1,
    role: "React Developer",
    company: "Brandstrek",
    desc: "Developed scalable UI components and managed global state for production-ready apps."
  },
  {
    id: 2,
    role: "Trainee",
    company: "Codeme Hub International",
    desc: "Gained hands-on experience in full-stack React and Node.js development."
  }
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Line Progress Animation
      gsap.to(progressLineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 80%",
          scrub: true,
        },
      });

      // 2. Fly-in content
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const isLeft = index % 2 === 0;
        gsap.fromTo(
          item,
          { x: isLeft ? "-100%" : "100%", opacity: 0 },
          {
            x: "0%",
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black text-white py-32 overflow-hidden isolate">
      {/* Container: px-2 (Reduced from px-6) to push content closer to the edges */}
      <div className="max-w-7xl mx-auto px-2 relative">
        
        {/* Experience Heading - Reduced X-padding via leading alignment */}
        <div className="mb-32"> 
           <h2 className="text-sm font-mono text-orange-500 tracking-[0.3em] uppercase mb-4">
             Career Path
           </h2>
           <h3 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
             EXPERIENCE
           </h3>
        </div>

        {/* Timeline Track (Gray) - Adjusted top to match heading height */}
        <div className="absolute left-1/2 top-[280px] bottom-0 w-[1px] bg-zinc-800 -translate-x-1/2 hidden md:block" />
        
        {/* Animated Progress Line (Orange) */}
        <div 
          ref={progressLineRef}
          className="absolute left-1/2 top-[280px] w-[1px] h-0 bg-orange-500 -translate-x-1/2 hidden md:block z-10" 
        />

        <div className="space-y-40 md:space-y-64 px-4 md:px-0">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`relative flex items-center justify-between w-full ${
                index % 2 === 0 ? "md:flex-row text-right" : "md:flex-row-reverse text-left"
              } flex-col`}
            >
              {/* Content Side */}
              <div className="w-full md:w-[44%]">
                {/* <span className="text-orange-500 font-mono text-sm tracking-widest uppercase">
                  {exp.period}
                </span> */}
                <h3 className="text-4xl md:text-6xl font-bold mt-4 mb-2 tracking-tight leading-tight">
                  {exp.role}
                </h3>
                <p className="text-orange-500 text-lg font-medium mb-6 tracking-widest uppercase">
                  {exp.company}
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-sm md:ml-auto md:mr-0 inline-block">
                  {exp.desc}
                </p>
              </div>

              {/* Static Center Indicator */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex z-20">
                <div className="w-2 h-2 bg-black rounded-full border border-orange-500 shadow-[0_0_8px_#f97316]" />
              </div>

              {/* Layout Spacer */}
              <div className="hidden md:block w-[44%]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}