import { ContentContext } from "@/App";
import SuperHeader from "@/types/components/SuperHeader";
import { useContext } from "react";

export default function WhyChooseUs() {
  const content = useContext(ContentContext);

  // Fallback data structure to prevent errors if context is loading
  const cards = content?.whatWeDoPage.thirdSection.cards || [];

  return (
    <div className="py-10 my-10 px-6">
      {/* --- HEADER --- */}
      <div 
        data-aos="fade-down"
        className="flex items-center justify-center md:items-start flex-col gap-4 max-w-[1280px] mx-auto"
      >
        <div className="text-center">
          <SuperHeader text={content?.whatWeDoPage.thirdSection.header} />
        </div>
        
        <p  
          data-aos="fade-right" 
          data-aos-delay="500" 
          className="text-center md:text-start text-[16px] md:text-[18px] font-light w-full md:w-[600px] text-gray-600 leading-relaxed"
        >
          {content?.whatWeDoPage.thirdSection.subHeader} 
        </p>
      </div>

      {/* --- RESPONSIVE BENTO GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 max-w-[1280px] mx-auto">
        
        {/* Card 1: Technology (Large) */}
        <div 
          data-aos="fade-up" 
          data-aos-duration="1000" 
          className="sm:col-span-2 lg:col-span-2 rounded-[2rem] shadow-md bg-white border border-gray-50 overflow-hidden group hover:shadow-xl transition-all duration-500"
        >
          <img
            src="/whyChooseUs1stCard3.svg"
            alt="Cutting Edge"
            className="w-full h-56 md:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="p-6 md:p-8">
            <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-2">{cards[0]?.header}</h2>
            <p className="text-gray-500 font-poppins text-[15px] md:text-[16px] font-light leading-relaxed max-w-xl">
              {cards[0]?.subHeader}
            </p>
          </div>
        </div>

        {/* Card 2: Expert Team (Small) */}
        <div 
          data-aos="fade-up" 
          data-aos-duration="1000" 
          data-aos-delay="100"
          className="col-span-1 rounded-[2rem] shadow-md bg-white border border-gray-50 overflow-hidden group hover:shadow-xl transition-all duration-500"
        >
          <img
            src="/whyChooseUs2ndCard3.svg"
            alt="Expert Team"
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="p-6">
            <h2 className="font-poppins text-[20px] font-bold text-gray-900 mb-1">{cards[1]?.header}</h2>
            <p className="text-gray-500 font-poppins font-light leading-snug text-[14px]">
              {cards[1]?.subHeader}
            </p>
          </div>
        </div>

        {/* Card 3: Strategy (Small) */}
        <div 
          data-aos="fade-up" 
          data-aos-duration="1000" 
          data-aos-delay="200"
          className="col-span-1 rounded-[2rem] shadow-md bg-white border border-gray-50 overflow-hidden group hover:shadow-xl transition-all duration-500"
        >
          <img
            src="/whyChooseUs3rdCard2.svg"
            alt="Strategic Insight"
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="p-6">
            <h2 className="font-poppins text-[20px] font-bold text-gray-900 mb-1">{cards[2]?.header}</h2>
            <p className="text-gray-500 font-poppins font-light leading-snug text-[14px]">
              {cards[2]?.subHeader}
            </p>
          </div>
        </div>

        {/* Card 4: Support (Large) */}
        <div 
          data-aos="fade-up" 
          data-aos-duration="1000" 
          data-aos-delay="300"
          className="sm:col-span-2 lg:col-span-2 rounded-[2rem] shadow-md bg-white border border-gray-50 overflow-hidden group hover:shadow-xl transition-all duration-500"
        >
          <img
            src="/whyChooseUs4thCard4.svg"
            alt="Reliable Support"
            className="w-full h-56 md:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="p-6 md:p-8">
            <h2 className="font-poppins text-[22px] md:text-[28px] font-bold text-gray-900 mb-2">{cards[3]?.header}</h2>
            <p className="text-gray-500 font-poppins text-[15px] md:text-[16px] font-light leading-relaxed max-w-xl">
              {cards[3]?.subHeader}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}