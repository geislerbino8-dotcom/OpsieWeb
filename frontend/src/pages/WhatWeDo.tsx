import ServicesSection from "../components/sections/ServicesSections";
import ClientCard from "../components/sections/ClientReviewsSection";
import LogoLoop from "../components/PartnersLogo/PartnersLogoLoop";
import FAQAccordion from "../components/FaqSection/Faq"
import WhyChooseUs from "../components/sections/WhyChooseUs";
import { useNavigate } from "react-router-dom";
import { usePageContent } from "@/data/usePageContent";
import { useState } from "react";
import SuperHeader from "@/types/components/SuperHeader";

const imageLogos = [
  { src: "/staff/p5.jpg", alt: "Company 1" },
  { src: "/logo/Frame-1.svg", alt: "Company 2" },
  { src: "/logo/Frame-2.svg", alt: "Company 3" },
  { src: "/logo/Frame-4.svg", alt: "Company 4" },
  { src: "/logo/Frame-3.svg", alt: "Company 5" },
];

export default function WhatWeDo() {
  const Navigate = useNavigate();
  const [ content ] = useState(usePageContent.data[0].whatWeDoPage)

  return (
    <div className="w-full overflow-hidden">
      
      {/* HERO SECTION - Now truly Full Width */}
      <section className="bg-[#0F4C5C] relative w-full h-[90vh] h-screen min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/WhoWeAre-Hero.svg"
          alt="Hero Image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Responsive Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/100 md:via-black/60 md:to-transparent"></div>

        {/* Hero Content Container - Keeps text aligned with the rest of your site */}
        <div className="relative z-10 h-full max-w-[1280px] mx-auto px-6 flex flex-col justify-end pb-20">
          
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between w-full gap-10">
            
            {/* Left Content */}
            <div className="w-full md:w-[80%]">
              <h1 data-aos="fade-right" className="text-[40px] leading-[44px] md:text-[60px] md:leading-[65px] lg:text-[75px] lg:leading-[80px] text-center md:text-left font-light text-white">
                {
                  content.hero.header.firstLine
              }<br/> 
                <span className="font-semibold text-[#3CBDE6]">{content.hero.header.secondLine}</span>
              </h1>
              <p data-aos="fade-right" data-aos-delay="300" className="mt-6 text-sm md:text-xl text-gray-200 text-center md:text-left max-w-xl font-light">
                {
                  content.hero.subHeader
                }
              </p>
              <div className="flex justify-center md:justify-start" data-aos="fade-right" data-aos-delay="400">
                <button 
                  onClick={() => Navigate("/contact-us")}
                  className="mt-8 bg-white text-black px-12 py-3 font-medium hover:bg-[#3CBDE6] hover:text-white transition-all duration-500 uppercase tracking-wider"
                >
                 {
                  content.hero.button.text
                 } 
                </button>
              </div>
            </div>

            {/* Right Content: Stats (Desktop Only) */}
           {/* Right Content: Stats (Fully Responsive) */}
<div className="
  /* Position: Relative/Static on mobile to stack, Absolute on desktop */
  relative mt-10 w-full 
  md:absolute md:right-0 md:bottom-4 md:mt-0 md:w-auto
  flex flex-col sm:flex-row items-center justify-center md:justify-end 
  text-white pb-4 px-4
">
  {/* Avatar Group */}
  <div className="flex flex-col items-center md:items-end">
    <div className="flex -space-x-3 mb-3 md:mb-0">
      <img src="/staffs/p5.jpg" className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border-2 border-black object-cover" alt="client"/>
      <img src="/profiles/Rectangle 816.svg" className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border-2 border-black object-cover" alt="client"/>
      <img src="/profiles/Rectangle 818.svg" className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border-2 border-black object-cover" alt="client"/>
    </div>
  </div>

  {/* Text Content */}
  <div className="sm:ml-5 flex flex-col items-center md:items-start text-center md:text-left">
    <h3 className="font-semibold text-base lg:text-lg">10+ Satisfied Clients</h3>
    <div className="flex items-center">
      <span className="text-[#3CBDE6] text-xl lg:text-2xl">★★★★★</span>
      <span className="text-lg ml-2 font-light">5/5</span>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>

       <div className="w-full flex justify-center items-center py-10 my-5">
          <div className="w-[80%]">
            <LogoLoop
            logos={imageLogos}
            speed={100}
            direction="left"
            logoHeight={40}
            gap={60}
            scaleOnHover
            fadeOut
            fadeOutColor="#ECEDF1"
          />
          </div>
        </div>

      {/* BODY CONTENT - Wrapped in container to keep alignment */}
      <main className="md:w-[75%] mx-auto pt-10 py-10">
        
        {/* Intro Heading */}
     <div className="flex flex-col md:flex-row justify-between items-start gap-8">
  {/* Left: Heading - items-start ensures it sits at the top */}

  <SuperHeader text={
    content.secondSection.header
  } />
 

  {/* Right: Paragraph - md:mt-2 helps "visually" align the smaller text with the large header text */}
  <p 
    data-aos="fade-left" 
    className="md:w-1/3 text-lg text-gray-600 font-light text-center md:text-right leading-relaxed md:mt-2"
  >{
    content.secondSection.subHeader
  }
  </p>
</div>

        <ServicesSection />

       <div className="relative bg-[#3CBDE6] mb-10 flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
  
  {/* Decorative background glow for depth */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#3CBDE6]/10 blur-[100px] -z-10" />

  <div className="max-w-3xl flex flex-col items-center space-y-8">
    
    {/* Heading with better hierarchy and color balance */}
    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 text-center leading-[1.15] tracking-tight">
      We focus on <span className="text-white">simplifying your systems</span>, 
      improving connectivity, and making operations effortless.
    </h1>

    {/* Modernized Button with animation and shadow */}
    <button className="group relative flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_10px_25px_-5px_rgba(60,189,230,0.4)] hover:-translate-y-1 active:scale-95">
      Book a Consultation
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </button>
    
  </div>
</div>

        {/* Video Section - Full Width inside container */}
        <div className="w-full">
          <iframe
            className="w-full aspect-video rounded-3xl shadow-2xl"
            src="https://www.youtube.com/embed/aAvDI1qae-U"
            title="YouTube video"
            allowFullScreen
          ></iframe>
        </div>

        <WhyChooseUs />

          <ClientCard />

        {/* Logos Section */}
       

        <FAQAccordion />
      </main>
    </div>
  );
}