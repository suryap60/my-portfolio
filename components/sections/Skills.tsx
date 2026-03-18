"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skillRows = [
  { id: 1, skills: ["React", "Next.js", "TypeScript", "JavaScript", "React", "Next.js", "TypeScript", "JavaScript"] },
  { id: 2, skills: ["Node.js", "Express", "REST APIs", "Auth", "Node.js", "Express", "REST APIs", "Auth"] },
  { id: 3, skills: ["MongoDB", "Tailwind", "Bootstrap", "Mongoose",  "MongoDB", "Tailwind", "Bootstrap", "Mongoose",  ] },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, index) => {
        if (!row) return;

        const isEven = index % 2 === 0;
        // Direction: Even rows move right (positive X), Odd rows move left (negative X)
        const moveDistance = isEven ? 300 : -300;

        gsap.to(row, {
          x: moveDistance,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom", // Start when row enters bottom of screen
            end: "bottom top",   // End when row leaves top of screen
            scrub: 1,            // Smoothly follows scroll
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative bg-black text-white py-32 overflow-hidden isolate"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Section Heading */}
        {/* <div className="px-6 mb-20">
          <h2 className="text-sm font-mono text-orange-500 tracking-[0.4em] uppercase mb-4">
            Technical Stack
          </h2>
          <h3 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
            SKILLS
          </h3>
        </div> */}

        {/* Horizontal Moving Rows */}
        <div className="flex flex-col gap-8 md:gap-12">
          {skillRows.map((row, index) => (
            <div
              key={row.id}
              className="whitespace-nowrap flex"
              style={{
                // Offset start position so movement is visible immediately
                marginLeft: index % 2 === 0 ? "-10%" : "0%",
              }}
            >
              <div
                ref={(el) => { rowsRef.current[index] = el; }}
                className="flex gap-8 md:gap-16 items-center"
              >
                {row.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-8 md:gap-16">
                    <span className="text-5xl md:text-8xl font-black text-zinc-900 outline-text hover:text-orange-500 transition-colors duration-500 uppercase">
                      {skill}
                    </span>
                    {/* Decorative Dot between skills */}
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-orange-500/50" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px #333;
          color: transparent;
        }
        .outline-text:hover {
          -webkit-text-stroke: 1px transparent;
          color: #f97316; /* Orange-500 */
        }
      `}</style>
    </div>
  );
}