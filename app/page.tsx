import AboutSection from "@/components/sections/AboutSction";
import HeroSection from "@/components/sections/HeroSection";
import ExperienceSection from "@/components/sections/Experiance";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative bg-black">
      {/* Hero stays stuck to the top */}
      <section className="sticky top-0 h-screen z-0">
        <HeroSection />
      </section>
      
      {/* About slides over the top because it's later in the DOM and has a higher z-index */}
      <section className="relative z-10" id="about">
        <AboutSection />
      </section>

      {/* Skills Section */}
      <section className="relative z-10">
        <Skills />
      </section>

      {/* Experience Section */}
      <section className="relative z-10">
        <ExperienceSection />
      </section>

      {/* Projects Section */}
      <section className="relative z-10" id="projects">
        <Projects />
      </section>

      

      {/* Contact Section */}
      <section className="relative z-10" id="contact">
        <Contact />
      </section>
    </main>
  );
}
