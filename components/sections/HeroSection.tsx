"use client";
import { useEffect, useState } from "react";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

export default function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollPosition / windowHeight, 1);
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const textColor = scrollProgress > 0.5 ? "text-black" : "text-white";
  const navTextColor = scrollProgress > 0.5 ? "text-black" : "text-white";
  const buttonBg = scrollProgress > 0.5 ? "bg-black" : "bg-white";
  const buttonText = scrollProgress > 0.5 ? "text-white" : "text-black";
  const lineColor = scrollProgress > 0.5 ? "bg-black" : "bg-white";

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Portrait with Liquid Glass & Glitch Effect */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div 
          className="relative w-full max-w-2xl h-full"
          style={{
            transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`
          }}
        >
          {/* Main Portrait */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-96 h-96 lg:w-[500px] lg:h-[500px]">
              {/* Glitch Layers */}
              {/* <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full opacity-80"
                style={{
                  filter: 'blur(2px)',
                  transform: `translate(${Math.sin(Date.now() * 0.001) * 3}px, ${Math.cos(Date.now() * 0.001) * 3}px)`
                }}
              /> */}
              
              {/* Liquid Glass Effect */}
              {/* <div className="absolute inset-0 rounded-full overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10"> */}
                {/* Portrait Placeholder - Replace with actual image */}
                {/* <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center grayscale contrast-125">
                  <img 
                    src="/assets/images/banner/Me.png" 
                    alt="Portrait"
                    className="w-full h-full object-cover mix-blend-luminosity opacity-70"
                    style={{
                      filter: 'contrast(1.3) brightness(0.9)',
                      transform: `scale(${1 + scrollProgress * 0.1})`
                    }}
                  />
                </div> */}
                
                {/* Glass Reflection */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-40" /> */}
                
                {/* Glitch Distortion Overlay */}
                {/* <div 
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    background: `
                      repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(255,255,255,0.03) 2px,
                        rgba(255,255,255,0.03) 4px
                      )
                    `
                  }}
                /> */}
              {/* </div> */}

              {/* Orange Accent Glow */}
              <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black pointer-events-none" />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-8 transition-colors duration-300">
        <div className={`${navTextColor} font-bold text-2xl transition-colors duration-300`}>
          <span className="text-orange-500">S</span>
        </div>
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <a href="#" className={`${navTextColor} hover:text-orange-500 transition-all duration-300`}>Home</a>
            <a href="#" className={`${navTextColor} hover:text-orange-500 transition-all duration-300`}>About</a>
            <a href="#" className={`${navTextColor} hover:text-orange-500 transition-all duration-300`}>Works</a>
          </div>
          <button className={`${buttonBg} ${buttonText} flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:bg-orange-500 hover:text-white transition-all duration-300`}>
            Contact <BsArrowUpRightCircleFill />
          </button>
        </div>
      </nav>

      {/* Left Social Icons */}
      {/* <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30 flex flex-col space-y-6">
        <div className={`w-px h-16 ms-2 ${lineColor} transition-colors duration-300`}></div>
        <a href="#" className={`${textColor} hover:text-orange-500 transition-all duration-300`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="#" className={`${textColor} hover:text-orange-500 transition-all duration-300`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
          </svg>
        </a>
        <a href="#" className={`${textColor} hover:text-orange-500 transition-all duration-300`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div> */}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-4">
          {/* Greeting */}
          <div className="relative mb-8">
            <span className={`${textColor} text-lg font-light tracking-wider transition-colors duration-300`}>
              Hi! I&apos;m <span className="text-orange-500">Surya</span>
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className={`text-6xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight ${textColor} transition-colors duration-300`}>
              MERN STACK
            </h1>
            <h2 className={`text-6xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight ${textColor} transition-colors duration-300`}>
              DEVELOPER
            </h2>
          </div>

          {/* Orange Accent Line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-orange-500" />
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        {/* <div className={`${textColor} text-sm font-light tracking-wider transition-colors duration-300 flex flex-col items-center gap-2`}>
          <span>SCROLL DOWN</span>
          <div className="w-px h-12 bg-orange-500 animate-pulse" />
        </div> */}
      </div>
    </div>
  );
}