"use client";
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wordProgress, setWordProgress] = useState<number[]>([]);

  const text = "Bridging the gap between modern design and technical excellence. As a React Developer, I've spent my career building real-time platforms and scalable front-end solutions for global markets. I combine a deep mastery of the React ecosystem with an agile mindset, utilizing Generative AI tools and Redux to accelerate delivery and optimize state management. I thrive at the intersection of clean architecture and innovative user experience.";
  
  const words = text.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current || !sectionRef.current) return;

      const rect = textRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      // starts when top of text enters bottom of screen, ends when bottom leaves top
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height * 0.5)
      ));

      const newProgress = words.map((_, index) => {
        const wordPosition = index / words.length;
        // The * 5 multiplier makes the transition "snappier" per word
        const wordProgress = Math.max(0, Math.min(1, 
          (scrollProgress - wordPosition) * 5
        ));
        return wordProgress;
      });

      setWordProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [words.length]);

  return (
    <div 
      ref={sectionRef} 
      className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center"
    >
      <div className="max-w-6xl mx-auto px-6 py-24">
        <p 
          ref={textRef}
          className="text-4xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-center font-bold"
          style={{ 
            fontFamily: '"Young Serif", "Young Serif Placeholder", serif',
          }}
        >
          {words.map((word, index) => {
            const progress = wordProgress[index] || 0;
            // Interpolate from zinc-800 to white
            const r = Math.round(39 + (255 - 39) * progress);
            const g = Math.round(39 + (255 - 39) * progress);
            const b = Math.round(42 + (255 - 42) * progress);
            
            return (
              <span
                key={index}
                className="inline-block"
                style={{
                  color: `rgb(${r}, ${g}, ${b})`,
                  transition: "color 0.2s ease-out",
                  marginRight: '0.25em'
                }}
              >
                {word}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}