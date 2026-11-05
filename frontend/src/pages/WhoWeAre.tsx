import { useNavigate } from "react-router-dom";
import { SiFacebook, SiInstagram, SiGmail, SiGithub } from "react-icons/si";
import LogoLoop from "@/components/LogoLoop";
import FAQAccordion from "../components/FaqSection/Faq";
import CountUp from "../components/CountUp";
import MapDesign from "@/components/sections/MapDesign";
import SuperHeader from "@/types/components/SuperHeader";
import { useContext } from "react";
import { ContentContext } from "@/App";
import CoreValuesSection from "./sections/CoreValuesSection";
import OperationalStructure from "@/components/sections/OperationalStructure";
import SoftAurora from "@/components/SoftAurora";

const myLogos = [
  { node: <span className="font-bold overflow-hidden">Simple</span> },
  { node: <span className="font-bold overflow-hidden">Connected</span> },
  { node: <span className="font-bold overflow-hidden">Reliable</span> },
];


export default function WhoWeAre() {


  const content = useContext(ContentContext)
  const navigate = useNavigate();


  return (
    <div className="w-full overflow-x-hidden text-center">
      {/* --- 1. FULL PAGE HERO SECTION --- */}
      {/* breakout classes: w-screen and negative margins ensure it hits the browser edges */}
      <div 
        data-aos="fade-right" 
        className="relative w-full min-h-[100svh] overflow-hidden"
      >
        {/* Background Image */}
        <img
          src="/WhatWeDo-Hero7.svg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                        <div 
                          className="relative w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[900px] md:h-[900px] aspect-square opacity-40 mix-blend-screen flex items-center justify-center"
                          style={{
                            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)',
                            maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)'
                          }}
                        >
                          <SoftAurora
                            speed={0.8}
                            scale={1.0}
                            brightness={5}
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
        
        {/* Overlay Gradient    - Darker at bottom/left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 md:bg-gradient-to-r md:from-black/90 md:via-black/50 to-transparent"></div>
        
        {/* Content Wrapper - Centered to match your site's max-width */}
        <div className="relative z-10 min-h-[100svh] w-full max-w-[1280px] mx-auto flex flex-col justify-end pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6 md:px-12 text-white">
          

            

          <div className="flex flex-col items-center md:items-start w-full">
            <SuperHeader text={content?.whoWeArePage.header} type="hero" position="left" />

            <p className="text-xl sm:text-3xl md:bg-black/60"> empowering businesses through smarter technology.</p>
            
            
            <p data-aos="fade-up" className="mt-6 sm:mt-8 text-base sm:text-lg md:text-2xl text-center md:text-left max-w-2xl text-gray-200">
                { content?.whoWeArePage.subHeader}
            </p>

            <div data-aos="fade-up" data-aos-delay="400" className="mt-8 sm:mt-10">
              <button 
                onClick={() => navigate("/what-we-do")}
                className="bg-white text-black px-8 sm:px-12 py-3 font-semibold hover:bg-[#3CBDE6] hover:text-white transition-all duration-500 uppercase tracking-widest shadow-lg"
              >
                Get to Know
              </button>
            </div>
          </div>

          {/* Desktop Socials - Pinned to bottom right */}
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

      {/* --- 2. MAIN CONTENT WRAPPER --- */}
      <div className="max-w-[1280px] mx-auto px-2 mt-16 sm:mt-20">
        
        {/* Mobile Social Bar (Only visible if not on Desktop) */}
        <div className="flex items-center justify-center md:hidden gap-4 sm:gap-6 mb-12 sm:mb-16">
          {[SiFacebook, SiInstagram, SiGithub, SiGmail].map((Icon, idx) => (
            <div key={idx} className="  w-12 h-12 sm:w-14 sm:h-14 border border-[#3CBDE6] rounded-full flex items-center justify-center">
              <Icon className="text-[#3CBDE6] text-2xl sm:text-3xl" />
            </div>
          ))}
        </div>


         <div className="flex flex-col items-center justify-center md:flex-row gap-2 md:gap-16  sm:px-[4%] md:px-[6%]">
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-0 md:gap-0  lg:mt-10">
            <div className="flex flex-col items-center md:items-start justify-center md:w-1/2 gap-6 md:gap-10 px-2 md:mt-0">
            
           <div className="text-center md:text-left">
             <SuperHeader text={content?.whoWeArePage.section2.header} position="left" />
           </div>

          
            <p data-aos="fade-right" data-aos-delay="200" className="w-full text-center md:text-left text-[16px] sm:text-[14px] md:text-[18px] font-light">
                {content?.whoWeArePage.section2.subHeader}        
            </p>

        </div>
        
        <div data-aos="fade-left" data-aos-offset="50" data-aos-delay="600" className="flex justify-center md:justify-end md:w-1/2 mt-6 md:mt-0 ">
            <div className="relative w-full max-w-[400px] sm:max-w-[450px] md:max-w-[300px] lg:min-w-[350px] xl:max-w-[500px]">
                    <img
                    src="https://images.pexels.com/photos/7988089/pexels-photo-7988089.jpeg"
                    alt="Results Background"
                    className="w-full h-[280px] sm:h-[350px] md:h-[400px] object-cover rounded-2xl"
                    />
                    {/* Floating Card — hidden on very small screens to prevent overflow */}
                    <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -left-10 sm:-left-16 md:-left-18 lg:-left-28 z-50">
                        <div className="skew-x-[-16deg] w-[160px] sm:w-[180px] md:w-[200px] lg:w-[250px] bg-white h-[120px] sm:h-[130px] md:h-[130px] lg:h-[150px] shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-2xl">
                            <div className="flex flex-col items-center justify-center pt-2 sm:pt-4">
                                <div className="text-[#3CBDE6] text-2xl sm:text-3xl">★★★★★</div>
                                    <div className="flex flex-row -space-x-2 ml-4">
                                        <img src="/profiles/prof1.svg" className="w-7 h-7 sm:w-8 sm:h-8" />
                                        <img src="/profiles/prof4.svg" className="w-7 h-7 sm:w-8 sm:h-8" />
                                        <img src="/profiles/prof3.svg" className="w-7 h-7 sm:w-8 sm:h-8" />
                                        <img src="/profiles/prof2.svg" className="w-7 h-7 sm:w-8 sm:h-8" />
                                    </div>
                                    <h1 className="text-xl sm:text-2xl font-semibold">
                                        <span className="text-gray-400 text-2xl sm:text-3xl">★</span> 4.8
                                        <span className="text-xs sm:text-sm font-light"> [Rating]</span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                 </div>
             </div>
            </div>

            
         </div>
       <div className="p-cards-container no-scrollbar  text-gray-600 w-full flex justify-center items-center overflow-hidden ">
            <div className="w-[90%] mt-16 sm:mt-20">
                         <LogoLoop
                        logos={myLogos}
                        speed={60}
                        direction="left"
                        logoHeight={40}
                        gap={60}
                        scaleOnHover
                        fadeOut
                        fadeOutColor="#ECEDF1"
                   />
            </div>
            </div>

         <div className="flex items-center justify-center flex-col justify-between mt-4 lg:mt-20">
            <div className="w-full px-2 h-[1px] bg-[#B3B3B3]">
            </div>
                    <div className="grid w-full grid-cols-1 gap-4 mt-4 mx-auto max-w-4xl sm:grid-cols-3 sm:gap-2 lg:mt-10">
                        <div data-aos="fade-left" data-aos-offset="50" data-aos-delay="200" className="flex items-center justify-center border-b border-[#B3B3B3] pb-4 sm:border-b-0 sm:pb-0">
                            <div className="flex flex-col items-center text-center px-3 sm:px-2 lg:px-4">
                            <h1  className="text-[36px] sm:text-[55px] md:text-[80px] font-bold lg:text-[90px]  lg:leading-16" ><CountUp
                                    from={0}
                                    to={20}
                                    direction="up"
                                    duration={1}
                                    delay={0.5}
                                    className="count-up-text"
                                    startCounting={true}
                                    separator=","
                             
                                />+</h1>
                            <p className="text-[11px] sm:text-[14px] md:text-[16px] lg:text-[20px]">Satisfied Clients</p>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-offset="50" data-aos-delay="500" className="flex items-center justify-center border-b border-[#B3B3B3] pb-4 sm:border-b-0 sm:border-l sm:pb-0">
                            <div className="flex flex-col items-center text-center px-3 sm:px-2 lg:px-4">
                            <h1 className="text-[36px] sm:text-[55px] md:text-[80px] font-bold lg:text-[90px] lg:leading-16">
                                <CountUp
                                    from={0}
                                    to={100}
                                    direction="up"
                                    duration={1}
                                    delay={0.5}
                                    className="count-up-text"
                                    startCounting={true}
                                    separator=","
                                
                                />
                                %
                            </h1>
                                <p  className="text-[11px] sm:text-[14px] md:text-[16px] lg:text-[20px]">Commitment to Quality</p>
                            </div>
                            
                        </div>
                        <div data-aos="fade-left" data-aos-offset="50" data-aos-delay="800" className="flex items-center justify-center sm:border-l">
                                <div className="flex flex-col items-center text-center px-3 sm:px-2 lg:px-4">
                                    <h1  className="text-[36px] sm:text-[55px] md:text-[80px] font-bold lg:text-[90px]  lg:leading-16" ><CountUp
                                    from={0}
                                    to={10}
                                    direction="up"
                                    duration={1}
                                    delay={0.5}
                                    className="count-up-text"
                                    startCounting={true}
                                    separator=","
                                  
                                />+</h1>
                                    <p className="text-[11px] sm:text-[14px] md:text-[16px] lg:text-[20px]">Projects Delivered</p>
                                </div>
                            </div>
                        </div>
                </div>

            {/* ---- VISION / MISSION SECTIONS ---- */}
            {/* These sections previously used fixed-pixel widths (w-[380px], w-[190px])
                that caused horizontal overflow on mobile. Now using responsive max-w + w-full. */}

            <div className="flex flex-col gap-8 px-[2%] sm:px-[4%] max-w-[1400px] mx-auto mt-6 sm:mt-10 md:px-[6%]">
                <div className="flex flex-col gap-6">
                     <div className="flex flex-col gap-6 items-center justify-center lg:items-start">
                         <div className="flex flex-col  lg:flex-row  lg:gap-6">
                         <div className="flex justify-center mt-4 md:mt-0">
                            <div data-aos="fade-right" data-aos-offset="50" data-aos-delay="800" className="flex justify-center items-center relative w-full max-w-[280px] sm:max-w-[330px] overflow-visible">
                                    <img
                                        src="/Results-bg.png"
                                        alt=""
                                        className="w-full h-[280px] sm:h-[350px] md:h-[400px] object-contain -scale-x-100 skew-x-6"
                                    />
                                {/* Floating Card — hidden on small screens */}
                                <div data-aos="fade-left" data-aos-offset="50" data-aos-delay="1000" className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-[140px] sm:-right-[160px] md:-right-[180px] z-50 ">
                                    <div className="flex flex-col gap-1 ml-12 sm:ml-20">
                                            {["Simple Systems", "Reliable Operations", "Connected Workflows"].map((item) => (
                                            <div key={item} className="flex items-center gap-1 bg-green-600">
                                                <img src="/ICONS/check.svg" className="ml-3 sm:ml-5 w-4 h-4 shrink-0" />
                                                <span className="text-white text-[12px] sm:text-[14px]  font-light">{item}</span>
                                            </div>
                                            ))}
                                        </div>

                                        {/* Overlapping image */}
                                        <div className="my-2 bg-[#ECEDF1] w-[180px] sm:w-[220px] h-[120px] sm:h-[140px] shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] flex items-center justify-center rounded-2xl">
                                            <img src="https://images.pexels.com/photos/7644064/pexels-photo-7644064.jpeg" alt="" className="w-[160px] sm:w-[200px] h-[100px] sm:h-[120px] object-cover rounded-2xl" />
                                        </div>

                                        {/* Bottom Checkmarks */}
                                        <div className="flex flex-col gap-1 ml-12 sm:ml-20">
                                            {["Partner-First Support", "Future-Ready Solutions", "Built-Around Your Business"].map((item) => (
                                            <div key={item} className="flex items-center gap-1 bg-green-600">
                                                <img src="/ICONS/check.svg" className="w-4 h-4 shrink-0" />
                                                <span className="text-white text-[12px] sm:text-[14px]">{item}</span>
                                            </div>
                                            ))}
                                        </div>
                                </div>
                        </div>
                    </div>
                            <div className="flex flex-col items-center lg:items-start gap-4 mt-8 sm:mt-10">
                                <div className="text-center lg:text-left">
                                    <SuperHeader text={content?.whoWeArePage.section3.header} position="left" />
                                </div>
                                <p data-aos="fade-right" data-aos-offset="50" data-aos-delay="500" className="w-full text-center lg:text-left text-[15px] sm:text-[16px]">
                                    {content?.whoWeArePage.section3.subHeader}
                                </p>
                                </div>
                                </div>
                                </div>
           </div>
       <div className="flex flex-col gap-8 mt-2 ">
                <div className="flex flex-col gap-2 px-2 items-center justify-center lg:items-start">
                <div 
                        data-aos="fade-up"
                        className="mt-6 flex items-center justify-center lg:items-start"
                            >
                            </div>
                            <h1 className="text-center leading-[34px] text-[32px] md:text-[42px] lg:text-[50px]">The <span className="text-[#3CBDE6] font-semibold">Vision</span></h1>
                            <p className="md:text-left text-[15px] sm:text-[16px] w-full lg:w-[600px] lg:mt-6">
                             {content?.whoWeArePage.section4.vision}
                            </p>
                        </div>
                </div>
                {/* Vision image grid — responsive, no fixed widths */}
                <div className="flex items-center justify-center mt-6 overflow-x-auto">
                 <div className="grid grid-cols-2 gap-3 sm:gap-4 place-items-center w-full max-w-[400px] sm:max-w-none">
                    {/* Left Tall Card */}
                    <div  data-aos="fade-right" data-aos-delay="800" className="row-span-2">
                        <div className="flex items-center justify-center shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] w-[min(43vw,190px)] sm:w-[190px] lg:w-[210px] xl:w-[250px] h-[320px] sm:h-[380px] lg:h-[440px] xl:h-[500px] rounded-3xl">
                            <img src="/vision1st-pic.svg" alt="" className="w-full h-full object-cover p-2 rounded-3xl " />
                        </div>
                    </div>  

                    {/* Right Top Small */}
                    <div>
                        <div data-aos="fade-right"  className="flex items-center justify-center bg-white 
                            shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] 
                            w-[min(43vw,190px)] sm:w-[190px] lg:w-[210px] xl:w-[240px] h-auto min-h-[160px] sm:min-h-[180px] lg:min-h-[210px] xl:min-h-[240px] rounded-3xl overflow-hidden">

                            <div className="flex flex-col items-center justify-center gap-2 px-2">
                                 <div className="flex items-center justify-center shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[40px] h-[40px]">
                                    <img src="/ICONS/modernization-icon.svg" alt="" className="w-7 h-7"/>
                                </div>
                            <div className="flex flex-col items-center justify-center gap-2 px-2">
                                <h1 className="text-[15px] sm:text-[18px]">Modernization</h1>
                                <p className=" text-center text-[11px] sm:text-[12px]">To help business move towards more connected, scalable, and efficient system. </p>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Right Bottom */}
                    <div>
                        <div data-aos="fade-left" data-aos-delay="800" className="flex items-center justify-center 
                            shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] 
                            w-[min(43vw,190px)] sm:w-[190px] lg:w-[210px] xl:w-[240px] h-[160px] sm:h-[180px] lg:h-[210px] xl:h-[240px] rounded-3xl overflow-hidden">

                            <img 
                                src="/vision2nd-pic.svg" 
                                alt="" 
                                className="w-full h-full object-cover p-2 rounded-3xl" 
                            />
                        </div>
                    </div>

                    {/* Wide bottom card spanning 2 columns */}
                    <div className="col-span-2">
                    <div data-aos="fade-right" className="bg-white flex flex-col items-center justify-center p-4 sm:p-6 gap-3 sm:gap-4 shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-2xl w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[410px] xl:max-w-[440px] h-auto min-h-[160px] sm:min-h-[180px] lg:min-h-[210px] xl:min-h-[240px] mx-auto">
                        <div className="flex flex-row gap-3 sm:gap-4 ">
                            <div className="flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[36px] sm:w-[40px] h-[36px] sm:h-[40px]">
                                <img src="/ICONS/digital-leader-icon.svg" alt="" className="w-6 sm:w-7 h-6 sm:h-7"/>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className=" text-[17px] sm:text-[20px]">Digital Leadership</h1>
                                <p className=" text-left font-light text-[11px] sm:text-[12px]">To build a trusted technology partner that supports businesses with practical and reliable solutions. </p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-3 sm:gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[36px] sm:w-[40px] h-[36px] sm:h-[40px]">
                                <img src="/ICONS/innovation-icon.svg" alt="" className="w-6 sm:w-7 h-6 sm:h-7"/>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="text-[17px] sm:text-[20px]">Innovation</h1>
                                <p className=" text-left font-light text-[11px] sm:text-[12px]">To continously improve how systems work by developing solutions that are simple, effective, and build for real use. </p>
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* Last image card spanning 2 columns */}
                    <div className="col-span-2">
                    <div data-aos="fade-left" data-aos-delay="800" className="flex flex-col p-2 shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-2xl w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[410px] xl:max-w-[440px] h-[160px] sm:h-[180px] lg:h-[210px] xl:h-[240px] mx-auto overflow-hidden">
                        <img src="vision3rd-pic.svg" alt="" className="w-full h-full object-cover p-2 rounded-3xl  " />
                        </div>
                    </div>

                </div>
                </div>

                {/* MISSION */}
                <div className="flex flex-col gap-8 mt-6 sm:mt-8">
                <div className="flex flex-col gap-2 px-2 items-center justify-center lg:items-start">
                    <div 
                        data-aos="fade-up"
                        className="mt-2 lg:mt-6 flex items-center justify-center lg:items-start"
                            >
                            </div>
                            <h1 className="text-center leading-[34px] text-[32px] md:text-[42px] lg:text-[50px]">The <span className="text-[#3CBDE6] font-semibold">Mission</span></h1>
                            <p className="md:text-left text-[15px] sm:text-[16px] w-full lg:w-[600px] lg:mt-6">
                                {content?.whoWeArePage.section5.mission}
                             </p>
                        </div>
                </div>
                
                {/* Mission image grid — same responsive approach as Vision */}
                <div className="flex items-center justify-center mt-4 overflow-x-auto">
                 <div className="grid grid-cols-2 gap-3 sm:gap-4 place-items-center w-full max-w-[400px] sm:max-w-none">
                    {/* Left Tall Card */}
                    <div  data-aos="fade-right" data-aos-delay="800" className="row-span-2">
                        <div className="flex items-center justify-center shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] 
                        w-[min(43vw,190px)] sm:w-[190px] lg:w-[210px] xl:w-[250px] h-[320px] sm:h-[380px] lg:h-[440px] xl:h-[500px] rounded-3xl overflow-hidden
                        ">
                            <img src="/empowerment.jpg"  alt="" className="w-full h-full object-cover p-2 rounded-3xl 
                            transition-all hover:scale-110 duration-1000" />
                        </div>
                    </div>

                    {/* Right Top Small */}
                    <div>
                        <div data-aos="fade-right"  className="flex items-center justify-center 
                            bg-white
                            shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] 
                            w-[min(43vw,190px)] sm:w-[190px] lg:w-[210px] xl:w-[240px] h-auto min-h-[160px] sm:min-h-[180px] lg:min-h-[210px] xl:min-h-[240px] rounded-3xl overflow-hidden">

                            <div className="flex flex-col items-center justify-center gap-2 px-2">
                                <div className="flex items-center justify-center shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[40px] h-[40px]">
                                    <img src="/ICONS/modernization-icon.svg" alt="" className="w-7 h-7"/>
                                </div>
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="text-[15px] sm:text-[18px]">Excellence</h1>
                                <p className=" text-center font-light text-[11px] sm:text-[12px]">To deliver consistent quality through systems that are stable, secure, and easy to manage. </p>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* Right Bottom */}
                    <div>
                        <div data-aos="fade-left" data-aos-delay="800" className="flex items-center justify-center 
                            shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] 
                            w-[min(43vw,190px)] sm:w-[190px] lg:w-[210px] xl:w-[240px] h-[160px] sm:h-[180px] lg:h-[210px] xl:h-[240px] rounded-3xl overflow-hidden
                            ">

                            <img 
                                src="/sol-building.jpg" 
                                alt="" 
                                className="hover:scale-110 w-full h-full object-cover p-2 rounded-3xl transition-all duration-1000"
                            />
                          </div>
                        </div>

                    {/* Wide bottom card */}
                    <div className="col-span-2">
                    <div data-aos="fade-right" className="flex flex-col items-center justify-center p-4 sm:p-6 gap-3 sm:gap-4 shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-2xl w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[410px] xl:max-w-[440px] h-auto min-h-[160px] sm:min-h-[180px] lg:min-h-[210px] xl:min-h-[240px] mx-auto
                    bg-white
                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition duration-1000 ease-in-out">
                        <div className="flex flex-row gap-3 sm:gap-4 ">
                            <div className="flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[36px] sm:w-[40px] h-[36px] sm:h-[40px]">
                                <img src="/ICONS/digital-leader-icon.svg" alt="" className="w-6 sm:w-7 h-6 sm:h-7 "/>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="text-[17px] sm:text-[20px]">Empowerment</h1>
                                <p className=" text-left font-light text-[11px] sm:text-[12px]">To give business more clarity and control through better systems. </p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-3 sm:gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[36px] sm:w-[40px] h-[36px] sm:h-[40px]">
                                <img src="/ICONS/innovation-icon.svg" alt="" className="w-6 sm:w-7 h-6 sm:h-7"/>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="text-[17px] sm:text-[20px]">Solution Building</h1>
                                <p className=" text-left font-light text-[11px] sm:text-[12px]">To design solutions that solve real problems and improve how teams work. </p>
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* Last image */}
                    <div className="col-span-2">
                    <div data-aos="fade-left" data-aos-delay="800" className="flex flex-col p-2 shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-2xl w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[410px] xl:max-w-[440px] h-[160px] sm:h-[180px] lg:h-[210px] xl:h-[240px] mx-auto overflow-hidden">
                        <img src="laptop.png" alt="" className="w-full h-full object-cover p-2 rounded-3xl transition-all duration-1000 hover:scale-110" />
                        </div>
                    </div>

                </div>
                </div>
            </div>

            <CoreValuesSection />

            <div className="text-center md:text-left">
                <OperationalStructure />

            </div>
                          
             <div className="my-12 sm:my-20">
          
          <div className="bg-[#0F4C5C] md:p-10 p-3 sm:p-6 text-white rounded-xl">
            <MapDesign />
          </div>
        </div>

        <FAQAccordion />
      </div>
    </div>
  );
}
