import React, { useState } from "react";
import { TestimonialCard } from "../Card/ClientCard/Card";
import { Button } from "../Button";


const ClientReview: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const cards = [
    {
      name: "John Doe",
      role: "Co-Founder at Skale",
      avatar: "/profiles/prof1.svg",
      review: "The website was very easy to navigate, and booking their service only took a few minutes. Everything was clear and straightforward. The team delivered exactly what was promised. I’m very satisfied with the overall experience!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      role: "CEO at Techwave",
      avatar: "/profiles/prof2.svg",
      review: "I used their website to request a service, and the whole process was smooth and hassle-free. I received confirmation quickly, and their team kept me updated throughout the project. Highly recommended!",
      rating: 5,
    },
    {
      name: "Mark Johnson",
      role: "CTO at Devhub",
      avatar: "/profiles/Rectangle 399.svg",
      review: "After submitting my request through the website, I was contacted almost immediately. Their response time was impressive, and the quality of work exceeded my expectations. I will definitely use their services again.",
      rating: 4,
    },
    {
      name: "Sarah Lee",
      role: "Designer at Pixelco",
      avatar: "/profiles/Rectangle 399.svg",
      review: "I felt confident using their website because everything was secure and well-organized. The service I received matched exactly what was described online. It’s convenient, reliable, and very professional.",
      rating: 5,
    },
  ];

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % cards.length);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <section className="w-full flex flex-col md:flex-row items-center"
    >
      

<div className="flex items-center justify-center md:items-start md:justify-start flex-col gap-4">
      

        <h1 className="font-poppins items-center md:text-start  leading-[35px] md:leading-[52px] tracking-[2px] font-poppins text-center leading-[35px] tracking-[2px] text-[32px] md:text-[50px]">What our <span className="text-[#3CBDE6] font-semibold">customers</span> are saying </h1>
        
          
        <div className="hidden md:flex items-center gap-x-4 mb:8 md:mb-20">
          <Button
            variant="shadow"
            iconImage="/left-arrow1.svg"
            className="w-8 h-8 flex items-center justify-center pr-3"
            onClick={handlePrev}
          />
          <hr className="w-[100px] border border-black" />
          <Button
            variant="shadow"
            iconImage="/right-arrow.svg"
            className="w-8 h-8 flex items-center justify-center  pl-3"
            onClick={handleNext}
          />
        </div>
     </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden w-full overflow-x-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cards.map((card, idx) => (
            <div key={idx} className="flex-shrink-0 w-full px-4">
              <TestimonialCard {...card} className="mt-8 md:mt-20" />
            </div>
          ))}
        </div>

        
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex flex-col w-full mt-16  ">

        {/* Navigation */}
        

        {/* Slider */}
        <div className="relative w-full flex h-[300px] pb-6 mb-10 overflow-x-hidden overflow-y-visible">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 60}%)` }}
          >
            {cards.map((card, idx) => {
              const isActive = idx === currentIndex;

              return (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[60%] px-4"
                  style={{
                    transform: `scale(${isActive ? 1 : 0.9})`,
                    opacity: isActive ? 1 : 0.6,
                    transition: "all 0.5s ease-in-out",
                  }}
                >
                  <TestimonialCard {...card} />
                </div>
              );
            })}
          </div>
          
        </div>
        

      </div>
      <div className="flex md:hidden items-center gap-x-4 mt-8">
          <Button
            variant="shadow"
            iconImage="/left-arrow1.svg"
            className="w-8 h-8 flex items-center justify-center pr-3"
            onClick={handlePrev}
          />
          <hr className="w-[100px] border border-black" />
          <Button
            variant="shadow"
            iconImage="/right-arrow.svg"
            className="w-8 h-8 flex items-center justify-center  pl-3"
            onClick={handleNext}
          />
        </div>
    </section>
  );
};

export default ClientReview;