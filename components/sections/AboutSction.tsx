"use client";
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [wordProgress, setWordProgress] = useState<number[]>([]);
  const [borderRadius, setBorderRadius] = useState(0);

  const text = "Bridging the gap between modern design and technical excellence. As a React Developer, I've spent my career building real-time platforms and scalable front-end solutions for global markets. I combine a deep mastery of the React ecosystem with an agile mindset, utilizing Generative AI tools and Redux to accelerate delivery and optimize state management. I thrive at the intersection of clean architecture and innovative user experience.";
  
  const words = text.split(" ");

  useEffect(() => {
    // Initialize all words as gray (0 progress)
    // setWordProgress(new Array(words.length).fill(0));

    const handleScroll = () => {
      if (!textRef.current || !sectionRef.current) return;

      const rect = textRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate border radius reveal progress based on section position
      // Starts forming when section enters viewport
      const radiusProgress = Math.max(0, Math.min(1, 
        (windowHeight - sectionRect.top) / (windowHeight * 0.6)
      ));
      
      // Interpolate border radius from 0 to 50% (rounded-full effect)
      const maxRadius = 50; // 50% for full rounded effect
      setBorderRadius(radiusProgress * maxRadius);

      // Calculate how much of the text is visible
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));

      // Update each word's progress based on scroll
      const newProgress = words.map((_, index) => {
        const wordPosition = index / words.length;
        const wordProgress = Math.max(0, Math.min(1, 
          (scrollProgress - wordPosition) * words.length
        ));
        return wordProgress;
      });

      setWordProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [words.length]);

  return (
    <div 
      ref={sectionRef} 
      className="relative min-h-screen bg-black text-white overflow-hidden"
      // style={{
      //   borderTopLeftRadius: `${borderRadius}%`,
      //   borderTopRightRadius: `${borderRadius}%`,
      //   transition: "border-radius 0.3s ease-out"
      // }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <p 
          ref={textRef}
          className="max-w-3xl text-center text-2xl lg:text-3xl leading-relaxed font-medium font-syne"
        >
          {words.map((word, index) => {
            const progress = wordProgress[index] || 0;
            // Interpolate from gray (107, 114, 128) to white (255, 255, 255)
            const r = Math.round(107 + (255 - 107) * progress);
            const g = Math.round(114 + (255 - 114) * progress);
            const b = Math.round(128 + (255 - 128) * progress);
            
            return (
              <span
                key={index}
                style={{
                  color: `rgb(${r}, ${g}, ${b})`,
                  transition: "color 0.3s ease-out"
                }}
              >
                {word}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
