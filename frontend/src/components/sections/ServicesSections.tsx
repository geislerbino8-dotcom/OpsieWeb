import React, { useState } from "react";
import { Card } from "../Card/ServicesCard";
import { Button } from "../Button";
import leftArrow from '../../assets/icons/left-arrow1.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';

const cards = [
  { title: "Custom Web Development", image: "/WebDevServices.png", description: "Crafting high-performance, scalable web applications tailored to your business needs." },
  { title: "UI / UX Design", image: "/UI&UX.png", description: "Creating intuitive and beautiful digital experiences that users love." },
  { title: "AI Integration", image: "/WebDevServices.png", description: "Automating workflows and enhancing products with cutting-edge AI solutions." },
  { title: "Mobile Design", image: "/UI&UX.png", description: "Seamless mobile experiences built for performance and engagement." },
];

const ServicesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % cards.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <section className="w-full pt-16 pb-5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Carousel Wrapper */}
        <div className="relative px-6">
          
          {/* DESKTOP Navigation (Hover triggered) */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-10 right-10 justify-between z-20 pointer-events-none group-hover:opacity-100">
            <Button 
              variant="shadow" 
              iconImage={leftArrow} 
              className="w-14 h-14 rounded-full bg-white shadow-xl pointer-events-auto hover:scale-110 transition-transform hover:bg-[#3CBDE6]"
              onClick={handlePrev} 
            />
            <Button 
              variant="shadow" 
              iconImage={rightArrow} 
              className="w-14 h-14 rounded-full bg-white shadow-xl pointer-events-auto hover:scale-110 transition-transform hover:bg-[#3CBDE6]"
              onClick={handleNext} 
            />
          </div>

          {/* Cards Slider */}
          <div
            className="flex transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
            style={{ 
              transform: `translateX(-${currentIndex * (window.innerWidth < 768 ? 100 : 33.33)}%)` 
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
                    className={`rounded-3xl border-none transition-shadow ${isActive ? 'shadow-2xl' : 'shadow-sm'}`}
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
                  currentIndex === idx ? "w-8 bg-black" : "w-2 bg-gray-200"
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
              <span className="text-black">{currentIndex + 1}</span> / {cards.length}
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