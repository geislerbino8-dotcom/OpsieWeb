import { ContentContext } from "@/App";
import SuperHeader from "@/types/components/SuperHeader";
import { useContext } from "react";

export default function WhyChooseUs() {
  const content = useContext(ContentContext)

  return (
    <div className="py-10 my-10 px-6">
      {/* --- HEADER --- */}
      <div 
        data-aos="fade-down"
        className="flex items-center justify-center md:items-start flex-col gap-4 max-w-[1280px] mx-auto"
      >

        <SuperHeader text={content?.whatWeDoPage.thirdSection.header} />
       
        <p  
          data-aos="fade-right" 
          data-aos-delay="500" 
          className="text-center md:text-start text-[16px] md:text-[18px] font-light w-full md:w-[600px] text-gray-600 leading-relaxed"
        >
         {content?.whatWeDoPage.thirdSection.subHeader} 
        </p>
      </div>

      {/* --- BENTO GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 mt-12 max-w-[1280px] mx-auto">
        
        {/* Large Card 1: Technology */}
        <div 
          data-aos="fade-right" 
          data-aos-duration="1500" 
          className="col-span-2 md:col-span-2 rounded-[2rem] shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.1)] bg-white border border-gray-50 overflow-hidden group hover:shadow-xl transition-all duration-500"
        >
          <img
            src="/whyChooseUs1stCard3.svg"
            alt="Cutting Edge"
            className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="p-8">
            <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-2">{content?.whatWeDoPage.thirdSection.cards[0].header}</h2>
            <p className="text-gray-500 font-poppins text-[16px] font-light leading-relaxed max-w-xl">
              {content?.whatWeDoPage.thirdSection.cards[0].subHeader}

                </p>
          </div>
        </div>

        {/* Small Card 1: Expert Team */}
        <div 
          data-aos="fade-left" 
          data-aos-duration="1500" 
          data-aos-delay="300" 
          className="col-span-1 md:col-span-1 rounded-[2rem] shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.1)] bg-white border border-gray-50 overflow-hidden group hover:shadow-xl transition-all duration-500"
        >
          <img
            src="/whyChooseUs2ndCard3.svg"
            alt="Expert Team"
            className="w-full h-32 md:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="p-6">
            <h2 className="font-poppins text-[20px] font-bold text-gray-900 mb-1">{content?.whatWeDoPage.thirdSection.cards[1].header}</h2>
            <p className="text-gray-500 font-poppins font-light leading-snug text-[13px]">
              {content?.whatWeDoPage.thirdSection.cards[1].subHeader}
            </p>
          </div>
        </div>

        {/* Small Card 2: Strategy */}
        <div 
          data-aos="fade-right" 
          data-aos-duration="1500" 
          data-aos-delay="400" 
          className="col-span-1 md:col-span-1 rounded-[2rem] shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.1)] bg-white border border-gray-50 overflow-hidden group hover:shadow-xl transition-all duration-500"
        >
          <img
            src="/whyChooseUs3rdCard2.svg"
            alt="Strategic Insight"
            className="w-full h-32 md:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="p-6">
            <h2 className="font-poppins text-[20px] font-bold text-gray-900 mb-1">{content?.whatWeDoPage.thirdSection.cards[2].header}</h2>
            <p className="text-gray-500 font-poppins font-light leading-snug text-[13px]">
              {content?.whatWeDoPage.thirdSection.cards[2].subHeader}
            </p>
          </div>
        </div>

        {/* Large Card 2: Support */}
        <div 
          data-aos="fade-left" 
          data-aos-duration="1500" 
          data-aos-delay="500" 
          className="col-span-2 md:col-span-2 rounded-[2rem] shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.1)] bg-white border border-gray-50 overflow-hidden group hover:shadow-xl transition-all duration-500"
        >
          <img
            src="/whyChooseUs4thCard4.svg"
            alt="Reliable Support"
            className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="p-8">
            <h2 className="font-poppins text-[24px] md:text-[28px] font-bold text-gray-900 mb-2">{content?.whatWeDoPage.thirdSection.cards[3].header}</h2>
            <p className="text-gray-500 font-poppins text-[16px] font-light leading-relaxed max-w-xl">
              {content?.whatWeDoPage.thirdSection.cards[3].subHeader}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}