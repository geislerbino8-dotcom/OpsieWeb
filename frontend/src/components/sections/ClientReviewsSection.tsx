import React, { useContext, useState } from "react";
import { TestimonialCard } from "../Card/ClientCard/Card";
import { Button } from "../Button";

import leftArrow from '../../assets/icons/left-arrow1.svg'
import rightArrow from '../../assets/icons/right-arrow.svg'

import { reviews } from "@/data/clientReviewsData";
import SuperHeader from "@/types/components/SuperHeader";
import { ContentContext } from "@/App";


const ClientReview: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const content = useContext(ContentContext)

  

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % reviews.length);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center md:px-10 md:py-20 py-10"
      data-aos="slide-up" data-aos-delay="500"
    >
      

<div className="flex items-center h-full md:items-start md:justify-start flex-col gap-4">
      
        <div className="text-left">
          <SuperHeader text={content?.clientSection.header} position="left" />
        </div>

        <p className="text-center md:text-left">We take the time to get it right, so everything works better for your business.</p>
       
          
        <div className="hidden md:flex items-center gap-x-4 mb:8 md:mb-20">
          <Button
            variant="shadow"
            iconImage={leftArrow}
            className="w-8 h-8 flex items-center justify-center pr-3 hover:bg-[#3CBDE6] transition-all-ease"
            onClick={handlePrev}
          />
          <hr className="w-[100px] border border-black" />
          <Button
            variant="shadow"
            iconImage={rightArrow}
            className="w-8 h-8 flex items-center justify-center  pl-3 hover:bg-[#3CBDE6] transition-all duration-200 ease-in-out"
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
          {reviews.map((reviews, idx) => (
            <div key={idx} className="flex-shrink-0 w-full px-4">
              <TestimonialCard {...reviews} className="mt-8 md:mt-20" />
            </div>
          ))}
        </div>

        
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex flex-col w-full   ">

        {/* Navigation */}
        

        {/* Slider */}
        <div className="relative w-full flex h-[300px] overflow-x-hidden overflow-y-visible">
  {/* Slider */}
  <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{ transform: `translateX(-${currentIndex * 60}%)` }}
  >
    {reviews.map((card, idx) => {
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

  {/* Right gradient overlay */}
  {/* Right gradient overlay */}
<div
    className="pointer-events-none absolute top-0 right-0 h-full w-24 
      bg-gradient-to-l from-[#ECEDF1] via-[#ECEDF1]/10 to-transparent"
  ></div>

</div>
        

      </div>
      <div className="flex md:hidden items-center gap-x-4 mt-8">
          <Button
            variant="shadow"
            iconImage={leftArrow}
            className="w-8 h-8 flex items-center justify-center pr-3"
            onClick={handlePrev}
          />
          <hr className="w-[100px] border border-black" />
          <Button
            variant="shadow"
            iconImage={rightArrow}
            className="w-8 h-8 flex items-center justify-center  pl-3"
            onClick={handleNext}
          />
        </div>
    </section>
  );
};

export default ClientReview;