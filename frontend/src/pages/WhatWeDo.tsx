import ServicesSection from "../components/sections/ServicesSections";
import ClientCard from "../components/sections/ClientReviewsSection";
import FAQAccordion from "../components/FaqSection/Faq"
import WhyChooseUs from "../components/sections/WhyChooseUs";
import { useNavigate } from "react-router-dom";
import SoftAurora from "@/components/SoftAurora";
import { useContext,  } from "react";
import SuperHeader from "@/types/components/SuperHeader";
import { ContentContext } from "@/App";


export default function WhatWeDo() {
  const Navigate = useNavigate();
  const content = useContext(ContentContext)

  if(!content) return <div><h1>No content</h1></div>

  return (
    <div className="w-full overflow-hidden">
      
      {/* HERO SECTION - Now truly Full Width */}
      <section className="bg-[#0F4C5C] relative w-full h-[90vh] h-screen min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/WhoWeAre-Hero (1).svg"
          alt="Hero Image"
          className="absolute inset-0 w-full h-full object-cover"
        />

         <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div 
                  className="relative w-[600px] h-[600px] md:w-[900px] md:h-[900px] aspect-square opacity-40 mix-blend-screen flex items-center justify-center"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
                    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)'
                  }}
                >
                  <SoftAurora
                    speed={1}
                    scale={1.0}
                    brightness={100}
                    color1="#0ab3f1"
                    color2="#3CBDE6"
                    noiseFrequency={2.5}
                    noiseAmplitude={1}
                    bandHeight={0.4}
                    bandSpread={0.8}
                    octaveDecay={0.1}
                    layerOffset={0}
                    colorSpeed={1}
                    enableMouseInteraction
                    mouseInfluence={0.25}
                  />
                </div>
              </div>
        
        {/* Responsive Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/80 to-transparent md:bg-gradient-to-r md:from-black/100 md:via-black/80 md:to-transparent"></div>

        {/* Hero Content Container - Keeps text aligned with the rest of your site */}
        <div className="relative z-10 h-full max-w-[1280px] mx-auto px-6 flex flex-col justify-end pb-20">
          
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between w-full gap-10">
            
            {/* Left Content */}
            <div className="w-full md:w-[80%]">
              <h1 data-aos="fade-right" className="text-[40px] leading-[44px] md:text-[60px] md:leading-[65px] lg:text-[75px] lg:leading-[80px] text-center md:text-left font-light text-white">
                {
                  content?.whatWeDoPage.hero.header.firstLine
              }<br/> 
                <span className="font-semibold text-[#3CBDE6]">{content?.whatWeDoPage.hero.header.secondLine}</span>
              </h1>
              <p data-aos="fade-right" data-aos-delay="300" className="mt-6 text-sm md:text-xl text-gray-200 text-center md:text-left max-w-xl font-light">
                {
                  content?.whatWeDoPage.hero.subHeader
                }
              </p>
              <div className="flex justify-center md:justify-start" data-aos="fade-right" data-aos-delay="400">
                <button 
                  onClick={() => Navigate("/contact-us")}
                  className="mt-8 bg-white text-black px-12 py-3 font-medium hover:bg-[#3CBDE6] hover:text-white transition-all duration-500 uppercase tracking-wider"
                >
                 {
                  content?.whatWeDoPage.hero.button.text
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

      {
        /** <div className="w-full flex justify-center items-center py-10 my-5">
          <div className="w-[80%] bg-[#242424]/20">
            <LogoLoop
            logos={imageLogos}
            speed={100}
            direction="left"
            logoHeight={50}
            gap={60}
            scaleOnHover
            fadeOut
            fadeOutColor="#ECEDF1"
          />
          </div>
        </div> */
      }

      {/* BODY CONTENT - Wrapped in container to keep alignment */}
      <main className="md:w-[75%] mx-auto pt-10 py-10 mt-10">
        
        {/* Intro Heading */}
     <div className="flex flex-col md:flex-row justify-between items-start gap-8">
  {/* Left: Heading - items-start ensures it sits at the top */}

  <SuperHeader text={
    content?.whatWeDoPage.secondSection.header
  } position="left"/>
 

  {/* Right: Paragraph - md:mt-2 helps "visually" align the smaller text with the large header text */}
  <p 
    data-aos="fade-left" 
    className="md:w-1/3 text-lg text-gray-600 font-light text-center md:text-right leading-relaxed md:mt-2"
  >{
    content?.whatWeDoPage.secondSection.subHeader
  }
  </p>
</div>

        <ServicesSection />

       <div className="relative mb-10 flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
  
  {/* Decorative background glow for depth */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#3CBDE6]/10 blur-[100px] -z-10" />

  <div className="relative max-w-4xl w-full p-12 md:p-16 flex flex-col items-center space-y-8 bg-neutral-900 overflow-hidden"
     style={{ clipPath: 'polygon(0% 0%, 93% 0%, 100% 15%, 100% 100%, 7% 100%, 0% 85%)' }}>
  
  {/* Subtly back-lighting the cut edges */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-[#3CBDE6]/20 blur-3xl rounded-full" />
  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#3CBDE6]/10 blur-3xl rounded-full" />

  <div className="max-w-2xl flex flex-col items-center space-y-8 relative z-10">
    <h1 className="text-3xl md:text-5xl font-bold text-gray-300 text-center leading-[1.2] tracking-tight">
      We focus on <span className="text-[#3CBDE6]">simplifying your systems</span>, 
      improving connectivity, and making operations effortless.
    </h1>

    <button 
      onClick={() => window.location.href = "/book-a-schedule"}
      className="group relative flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-[#3CBDE6] hover:text-white hover:shadow-[0_10px_25px_-5px_rgba(60,189,230,0.4)] hover:-translate-y-1 active:scale-95"
    >
      Book a Consultation
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </button>
  </div>
</div>
</div>

        {/* Video Section - Full Width inside container */}
       {
        /**
         *  <div className="w-full">
          <iframe
            className="w-full aspect-video rounded-3xl shadow-2xl"
            src="https://www.youtube.com/embed/aAvDI1qae-U"
            title="YouTube video"
            allowFullScreen
          ></iframe>
        </div>
         */
       }


        <WhyChooseUs />



          <ClientCard />

        {/* Logos Section */}


       

        <FAQAccordion />
      </main>
    </div>
  );
}