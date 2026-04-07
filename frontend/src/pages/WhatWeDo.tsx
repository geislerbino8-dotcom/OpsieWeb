import ServicesSection from "../components/sections/ServicesSections";
import ClientCard from "../components/sections/ClientReviewsSection";
import LogoLoop from "../components/PartnersLogo/PartnersLogoLoop";
import FAQAccordion from "../components/FaqSection/Faq"
import WhyChooseUs from "../components/sections/WhyChooseUs";
import { useNavigate } from "react-router-dom";

const imageLogos = [
  { src: "/logo/Frame.svg", alt: "Company 1" },
  { src: "/logo/Frame-1.svg", alt: "Company 2" },
  { src: "/logo/Frame-2.svg", alt: "Company 3" },
  { src: "/logo/Frame-4.svg", alt: "Company 4" },
  { src: "/logo/Frame-3.svg", alt: "Company 5" },
];

export default function WhatWeDo() {
  const Navigate = useNavigate();

  return (
    // Removed max-w-1280 from here to allow full width
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/100 md:via-black/20 md:to-transparent"></div>

        {/* Hero Content Container - Keeps text aligned with the rest of your site */}
        <div className="relative z-10 h-full max-w-[1280px] mx-auto px-6 flex flex-col justify-end pb-20">
          
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between w-full gap-10">
            
            {/* Left Content */}
            <div className="w-full md:w-2/3">
              <h1 data-aos="fade-right" className="text-[40px] leading-[44px] md:text-[60px] md:leading-[65px] lg:text-[75px] lg:leading-[80px] text-center md:text-left font-light text-white">
                Code with Purpose.<br/> 
                <span className="font-semibold text-[#3CBDE6]">Solutions with Impact.</span>
              </h1>
              <p data-aos="fade-right" data-aos-delay="300" className="mt-6 text-sm md:text-xl text-gray-200 text-center md:text-left max-w-xl font-light">
                See how we transform ideas into powerful digital experiences. Watch our process, innovation, and expertise come together to build impactful solutions.
              </p>
              <div className="flex justify-center md:justify-start" data-aos="fade-right" data-aos-delay="400">
                <button 
                  onClick={() => Navigate("/contact-us")}
                  className="mt-8 bg-white text-black px-12 py-3 font-medium hover:bg-[#3CBDE6] hover:text-white transition-all duration-500 uppercase tracking-wider"
                >
                  Contact Us 
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
      <img src="/profiles/Rectangle 780.svg" className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border-2 border-black object-cover" alt="client"/>
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

      {/* BODY CONTENT - Wrapped in container to keep alignment */}
      <main className="md:w-[75%] mx-auto py-20">
        
        {/* Intro Heading */}
     <div className="flex flex-col md:flex-row justify-between items-start gap-8">
  {/* Left: Heading - items-start ensures it sits at the top */}
  <h2 
    data-aos="fade-up" 
    className="md:w-1/2 text-4xl md:text-5xl leading-tight text-center md:text-left"
  >
    Building <span className="text-[#3CBDE6] font-semibold">Technology</span> That <span className="text-[#3CBDE6] font-semibold">Works</span> for You
  </h2>

  {/* Right: Paragraph - md:mt-2 helps "visually" align the smaller text with the large header text */}
  <p 
    data-aos="fade-left" 
    className="md:w-1/3 text-lg text-gray-600 font-light text-center md:text-right leading-relaxed md:mt-2"
  >
    We build end-to-end solutions — custom systems, smart integrations, and scalable automation — engineered to transform how businesses operate.
  </p>
</div>

        <ServicesSection />

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
        <div className="py-10 my-10">
          <LogoLoop
            logos={imageLogos}
            speed={100}
            direction="left"
            logoHeight={60}
            gap={60}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
          />
        </div>

        <FAQAccordion />
      </main>
    </div>
  );
}