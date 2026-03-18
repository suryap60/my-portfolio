"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Heading
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".reveal-text",
          start: "top 90%",
        }
      });

      // Animate form fields one by one
      gsap.from(".form-field", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".form-field",
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen selection:bg-orange-500 selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT COLUMN: Sticky Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="overflow-hidden">
              <h2 className="reveal-text text-sm font-mono text-orange-500 tracking-[0.4em] uppercase mb-6">
                Connect
              </h2>
              <h1 className="reveal-text text-6xl md:text-8xl font-bold leading-none tracking-tighter">
                LET&apos;S <br />TALK.
              </h1>
            </div>

            <div className="space-y-8 pt-12 border-t border-zinc-800">
              <div className="reveal-text">
                <p className="text-zinc-500 uppercase text-xs tracking-widest mb-2">Email</p>
                <a href="mailto:suryp6061@gmail.com" className="text-2xl hover:text-orange-500 transition-colors">
                  suryp6061@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Modern Form */}
          <div className="lg:col-span-7">
            <form className="space-y-12">
              <div className="form-field group relative">
                <input
                  type="text"
                  name="name"
                  placeholder="What's your name?"
                  className="w-full bg-transparent border-b border-zinc-800 py-6 text-2xl outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-700"
                  onChange={handleChange}
                />
                <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-orange-500 transition-all duration-500 group-focus-within:w-full" />
              </div>

              <div className="form-field group relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="w-full bg-transparent border-b border-zinc-800 py-6 text-2xl outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-700"
                  onChange={handleChange}
                />
                <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-orange-500 transition-all duration-500 group-focus-within:w-full" />
              </div>

              <div className="form-field group relative">
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  className="w-full bg-transparent border-b border-zinc-800 py-6 text-2xl outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-700 resize-none"
                  onChange={handleChange}
                />
                <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-orange-500 transition-all duration-500 group-focus-within:w-full" />
              </div>

              <div className="form-field pt-6">
                <button className="group relative overflow-hidden bg-orange-500 px-12 py-6 rounded-full text-black font-bold uppercase tracking-widest transition-all hover:pr-16">
                  <span className="relative z-10 text-white">Send </span>
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                    →
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Background Subtle Watermark */}
      {/* <div className="absolute bottom-0 right-0 p-8 opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[20vw] leading-none font-bold">CONTACT</h2>
      </div> */}
    </div>
  );
}