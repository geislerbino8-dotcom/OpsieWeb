import React, { useEffect, useState } from "react";
import { Card } from "../Card/ServicesCard";
import { Button } from "../Button";
import leftArrow from '../../assets/icons/left-arrow1.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';

const cards = [
  { title: "Cloud Solutions", image: "/services/cloud.jpg", description: "Cloud hosting, remote access systems, centralized database management, securebackup solutions, and scalable SaaS deployment." },
  { title: "Systems Integration", image: "/services/software_integration.jpg", description: "API integrations, ERP integrations, HRIS integrations, centralized workflows, and connected business systems." },
  { title: "Cybersecurity", image: "/services/cybersecurity.jpg", description: "Data encryption, access control, firewall protection, backup security, user authentication, and secure cloud infrastructure.." },
  { title: "Automation & AI", image: "/services/ai_automation.jpg", description: "Workflow automation, AI analytics, AI chatbot solutions, predictive reporting, smart process automation, and intelligent business insights." },
  { title: "Web and Mobile Development", image: "/services/web_mobile_dev.jpg", description: "Android and iOS mobile applications, web-based systems, custom portals, ERP platforms, and responsive business applications.." },
  { title: "UI / UX Design", image: "/services/ui_design.jpg", description: "User-focused and responsive designs that enhance usability, engagement, and overall digital experience.." },

];

const ServicesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // Track the breakpoint reactively: reading window.innerWidth only at render
  // left the slide step stale when a phone/tablet was rotated across 768px.
  const [isNarrow, setIsNarrow] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsNarrow(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % cards.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <section className="w-full pt-16 pb-5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Carousel Wrapper */}
        <div className="relative px-6">
          
          {/* DESKTOP Navigation (Hover triggered) */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-10 right-10 justify-between z-6 pointer-events-none group-hover:opacity-100">
            <Button 
              variant="shadow" 
              iconImage={leftArrow} 
              className="w-14 h-14 rounded-full bg-white shadow-xl pointer-events-auto hover:scale-110 transition-transform hover:bg-[#8B5CF6]"
              onClick={handlePrev} 
            />
            <Button 
              variant="shadow" 
              iconImage={rightArrow} 
              className="w-14 h-14 rounded-full bg-white shadow-xl pointer-events-auto hover:scale-110 transition-transform hover:bg-[#8B5CF6]"
              onClick={handleNext} 
            />
          </div>

          {/* Cards Slider */}
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ 
              transform: `translateX(-${currentIndex * (isNarrow ? 100 : 33.33)}%)` 
            }}
          >
            {cards.map((card, idx) => {
              const isActive = idx === currentIndex;
              
              return (
                <div
                  key={idx}
                  className="flex-shrink-0 w-full md:w-1/3 px-2 md:px-4 transition-all duration-500"
                  style={{
                    filter: isActive ? "none" : "grayscale(0.3) opacity(0.5)",
                    transform: isActive ? "scale(1)" : "scale(0.92)",
                  }}
                >
                  <Card 
                    title={card.title} 
                    image={card.image} 
                    description={card.description} 
                    className={`rounded-3xl card-side-glow border-none transition-shadow ${isActive ? 'shadow-2xl' : 'shadow-sm'}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE & TABLET Controls (Always Visible) */}
        <div className="mt-12 px-6 flex flex-col items-center gap-8">
          
          {/* Progress Pill Bar */}
          <div className="flex gap-2">
            {cards.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentIndex === idx ? "w-8 bg-[#8B5CF6]" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons for Mobile */}
          <div className="flex items-center gap-12">
            <button 
              onClick={handlePrev}
              className="p-4 active:scale-90 transition-transform md:hidden"
            >
              <img src={leftArrow} alt="Previous" className="w-6 h-6 opacity-60" />
            </button>

            <div className="text-xs font-bold tracking-[0.2em] text-gray-400">
              <span className="text-white">{currentIndex + 1}</span> / {cards.length}
            </div>

            <button 
              onClick={handleNext}
              className="p-4 active:scale-90 transition-transform md:hidden"
            >
              <img src={rightArrow} alt="Next" className="w-6 h-6 opacity-60" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;