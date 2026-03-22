import React, { useState } from "react";
import { Card } from "../Card/ServicesCard";
import { Button } from "../Button";
import leftArrow from '../../assets/icons/left-arrow1.svg'
import rightArrow from '../../assets/icons/right-arrow.svg'

const ServicesSection: React.FC = () => {
  

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const cards = [
    { title: "Custom Web Development", image: "/WebDevServices.png", description: "Lorem ipsum dolor sit amet..." },
    { title: "UI / UX Design", image: "/UI&UX.png", description: "Lorem ipsum dolor sit amet..." },
    { title: "AI Integration", image: "/WebDevServices.png", description: "Lorem ipsum dolor sit amet..." },
    { title: "Mobile Design", image: "/UI&UX.png", description: "Lorem ipsum dolor sit amet..." },
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % cards.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <section className="w-full flex flex-col "
  >
    {/* ================= MOBILE VIEW ================= */}
    <div className="md:hidden w-full overflow-x-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {cards.map((card, idx) => (
          <div key={idx} className="flex-shrink-0 w-full px-4"> {/* 90% width + horizontal margin */}
            <Card
              title={card.title}
              image={card.image}
              description={card.description}
              className="mt-20"
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-center gap-x-4">
        <Button
          variant="shadow"
          iconImage={leftArrow}
          className="w-10 h-10 flex items-center justify-center"
          onClick={handlePrev}
        />
        <hr className="w-[200px] border border-black" />
        <Button
          variant="shadow"
          iconImage={rightArrow}
          className="w-10 h-10 flex items-center justify-center"
          onClick={handleNext}
        />
      </div>
    </div>

      {/* ================= MD AND ABOVE ================= */}
      <div data-aos="fade-right"  className="hidden md:flex flex-col w-full mt-6">
        {/* Navigation above cards */}
        <div  className="flex items-center gap-x-4 mb-6 ">
          <Button variant="shadow" iconImage="/left-arrow1.svg" className="w-10 h-10 flex items-center justify-center cursor-pointer" onClick={handlePrev} />
          <hr className="w-[100px] border border-black" />
          <Button variant="shadow" iconImage="/right-arrow.svg" className="w-10 h-10 flex items-center justify-center cursor-pointer pl-4" onClick={handleNext} />
        </div>

        {/* Cards Container */}
        <div className="relative w-full flex h-[420px] overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 40}%)` }}
          >
            {cards.map((card, idx) => {
              const scale = idx === currentIndex ? 0.95 : 0.9;
              const opacity = idx === currentIndex ? 1 : 0.6;

              return (
                <div
                  key={idx}
                  className="flex-shrink-0 md:w-[40%]"
                  style={{
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    transition: "all 0.5s ease-in-out",
                  }}
                >
                  <Card title={card.title} image={card.image} description={card.description} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;