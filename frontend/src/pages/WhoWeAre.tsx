import { useNavigate } from "react-router-dom";
import { SiFacebook, SiInstagram, SiGmail, SiGithub } from "react-icons/si";

// Internal Components
import { Button } from "../components/Button/Button";
import FAQAccordion from "../components/FaqSection/Faq";
import CountUp from "../components/CountUp";
import MapDesign from "@/components/sections/MapDesign";
import Team from "@/components/Team";

export default function WhoWeAre() {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-hidden text-center">
      {/* --- 1. FULL PAGE HERO SECTION --- */}
      {/* breakout classes: w-screen and negative margins ensure it hits the browser edges */}
      <div 
        data-aos="fade-right" 
        className="bg-[#242424] relative w-screen h-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden"
      >
        {/* Background Image */}
        <img
          src="/WhatWeDo-Hero7.svg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay Gradient - Darker at bottom/left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 md:bg-gradient-to-r md:from-black/90 md:via-black/20 to-transparent"></div>
        
        {/* Content Wrapper - Centered to match your site's max-width */}
        <div className="relative z-10 h-full w-full max-w-[1280px] mx-auto flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 text-white">
          
          <div className="flex flex-col items-center md:items-start w-full">
            <h1 className="max-w-[850px] text-[42px] leading-[46px] md:text-[72px] md:leading-[82px] text-center md:text-left ">
              A Team of Builders, <br className="hidden md:block" />
              <span className="font-semibold text-[#3CBDE6]">Thinkers, and Problem-Solvers</span>
            </h1>
            
            <p className="mt-8 text-lg md:text-2xl text-center md:text-left max-w-2xl text-gray-200">
              Driven by innovation and collaboration, we turn complex challenges into simple, effective digital solutions.
            </p>

            <div data-aos="fade-up" data-aos-delay="400" className="mt-10">
              <button 
                onClick={() => navigate("/what-we-do")}
                className="bg-white text-black px-12 py-3 font-semibold hover:bg-[#3CBDE6] hover:text-white transition-all duration-500 uppercase tracking-widest shadow-lg"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Desktop Socials - Pinned to bottom right */}
          <div className="hidden absolute bottom-[30px] md:flex absolute right-12 bottom-12 gap-5">
            {[SiFacebook, SiInstagram, SiGithub, SiGmail].map((Icon, idx) => (
              <div key={idx} className="w-14 h-14 border-2 border-[#3CBDE6]/40 rounded-full flex items-center justify-center hover:border-[#3CBDE6] hover:bg-[#3CBDE6] group transition-all cursor-pointer">
                <Icon className="text-[#3CBDE6] text-2xl group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 2. MAIN CONTENT WRAPPER --- */}
      <div className="max-w-[1280px] mx-auto px-2 mt-20">
        
        {/* Mobile Social Bar (Only visible if not on Desktop) */}
        <div className="flex items-center justify-center md:hidden gap-6 mb-16">
          {[SiFacebook, SiInstagram, SiGithub, SiGmail].map((Icon, idx) => (
            <div key={idx} className="  w-14 h-14 border border-[#3CBDE6] rounded-full flex items-center justify-center">
              <Icon className="text-[#3CBDE6] text-3xl" />
            </div>
          ))}
        </div>

         <div className="flex flex-col items-center justify-center md:flex-row gap-2 md:gap-16  sm:px-[4%] md:px-[6%]">
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-0 md:gap-0  lg:mt-10">
            <div className="flex flex-col items-center md:items-start justify-center md:w-1/2 gap-6 md:gap-10 px-2 md:mt-14">
            <h1 data-aos="fade-right" className="w-full md:w-[410px] lg:w-[600px]  text-center md:text-left leading-[34px] text-[36px] md:text-[42px] lg:text-[50px] md:leading-[42px] lg:leading-[65px]">
                We Believe in <span className="text-[#3CBDE6] font-semibold">Result </span>
                Driven by <br />
                <span className="font-playfair italic text-[#3CBDE6] font-semibold">Smart Technology</span>
            </h1>
            <p data-aos="fade-right" data-aos-delay="200" className="w-full md:w-[320px] lg:w-[450px] text-center md:text-left text-[16px] sm:text-[14px] md:text-[18px] font-light">
                At <span className="text-[#3CBDE6]  font-semibold">Opsie</span>, we believe that real business growth is rooted in strategy, insight, and execution.
            </p>

            <div className="flex transition-all duration-1000 items-center hover:bg-[#242424] justify-center bg-[#3CBDE6] py-1 md:text-[12px] lg:text-[16px] lg:px-4 text-white lg:mt-4">
                <Button
                label="Get Started"
                iconPosition="right"
                className="cursor-pointer"
                />
            </div>
        </div>
        <div data-aos="fade-left" data-aos-offset="50" data-aos-delay="600" className="flex justify-center md:justify-end md:w-1/2 mt-4 md:mt-0 ">
            <div className="relative max-w-[500px] sm:max-w-[550px] md:max-w-[300px] lg:min-w-[350px] xl:max-w-[950px]  lg:ml-50">
                    <img
                    src="/Results-bg.png"
                    alt="Results Background"
                    className="w-full h-[350px] sm:h-[500px] md:h-[400px] lg:object-contain"
                    />
                    {/* Floating Card */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-10 sm:-left-20 md:-left-18 lg:-left-28 z-50">
                        <div className="skew-x-[-16deg] w-[180px] sm:w-[180px] md:w-[200px] lg:w-[250px] bg-white h-[130px] sm:h-[150px] md:h-[130px] lg:h-[150px] shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-2xl">
                            <div className="flex flex-col items-center justify-center pt-2 sm:pt-4 md:pt-1 lg:pt-4">
                                <div className="text-[#3CBDE6] text-3xl">★★★★★</div>
                                    <div className="flex flex-row -space-x-2 ml-4">
                                        <img src="/profiles/prof1.svg" className="w-8 h-8 sm:w-10 sm:h-10" />
                                        <img src="/profiles/prof4.svg" className="w-8 h-8 sm:w-10 sm:h-10" />
                                        <img src="/profiles/prof3.svg" className="w-8 h-8 sm:w-10 sm:h-10" />
                                        <img src="/profiles/prof2.svg" className="w-8 h-8 sm:w-10 sm:h-10" />
                                    </div>
                                    <h1 className="text-2xl font-semibold">
                                        <span className="text-gray-400 text-3xl">★</span> 4.8
                                        <span className="text-sm font-light"> [Rating]</span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
         </div>
         <div className="flex items-center justify-center flex-col justify-between mt-4 lg:mt-20">
            <div className="w-full px-2 h-[1px] bg-[#B3B3B3]">
            </div>
                    <div className="flex flex-row  gap-2 mt-4 lg:mt-10  m-2">
                        <div data-aos="fade-left" data-aos-offset="50" data-aos-delay="200" className="flex flex-row  items-center ">
                            <div className="flex flex-col  mx-4 sm:mx-6 md:mx-8 lg:mx-10 ">
                            <h1  className="text-[45px] sm:text-[70px] md:text-[80px] font-bold lg:text-[90px]  lg:leading-16" ><CountUp
                                    from={0}
                                    to={20}
                                    direction="up"
                                    duration={1}
                                    delay={0.5}
                                    className="count-up-text"
                                    startCounting={true}
                                    separator=","
                             
                                />+</h1>
                            <p className="text-[12px] sm:text-[16px] md:text-[16px] lg:text-[20px]">Satisfied Clients</p>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-offset="50" data-aos-delay="500" className="flex flex-row items-center justify-center">
                            <div className="h-[85px] bg-[#B3B3B3] w-[2px]"></div>
                            <div className="flex flex-col  mx-4 sm:mx-6 md:mx-8 lg:mx-10 ">
                            <h1 className="text-[45px] sm:text-[70px] md:text-[80px] font-bold lg:text-[90px] lg:leading-16">
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
                                <p  className="text-[12px] sm:text-[16px] md:text-[16px] lg:text-[20px]">Commitment to Quality</p>
                            </div>
                            
                        </div>
                        <div data-aos="fade-left" data-aos-offset="50" data-aos-delay="800" className="flex flex-row  items-center justify-center">
                            <div className="h-[85px] bg-[#B3B3B3] w-[2px] "></div>
                                <div className="flex flex-col mx-4 sm:mx-6  md:mx-8 lg:mx-10 ">
                                    <h1  className="text-[45px] sm:text-[70px] md:text-[80px] font-bold lg:text-[90px]  lg:leading-16" ><CountUp
                                    from={0}
                                    to={10}
                                    direction="up"
                                    duration={1}
                                    delay={0.5}
                                    className="count-up-text"
                                    startCounting={true}
                                    separator=","
                                  
                                />+</h1>
                                    <p className="text-[12px] sm:text-[16px] md:text-[16px] lg:text-[20px]">Projects Delivered</p>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="flex flex-col gap-8 px-[4%] max-w-[1400px] mx-auto mt-4 md:mt-10  sm:px-[4%] md:px-[6%]">
                     <div className="flex flex-col gap-6 flex items-center justify-center lg:items-start">
                         <div className="flex flex-col lg:flex-row  lg:gap-6">
                         <div  data-aos-offset="50" data-aos-delay="600" className="flex justify-center  mt-4 md:mt-0 mr-30 sm:mr-40">
                                 <div data-aos="fade-right" data-aos-offset="50" data-aos-delay="800" className="relative w-full max-w-[230px] sm:max-w-[330px] md:w-[330px] lg:w-[500px] overflow-visible lg:mr-20   ">
                                    <img
                                        src="/Results-bg.png"
                                        alt=""
                                        className="w-full h-[350px] sm:h-[400px] md:h-[400px] lg:object-contain"
                                    />
                                {/* Floating Card */}
                                <div data-aos="fade-left" data-aos-offset="50" data-aos-delay="1000" className="absolute top-1/2 -translate-y-1/2 -right-[140px] sm:-right-[180px] md:-right-[180px] z-50 ">
                                    <div  className="flex flex-col gap-1 ml-16 sm:ml-24 md:ml-24">
                                            {["Humble Beginnings", "Proven Progress", "Dreamed It. Built It."].map((item) => (
                                            <div key={item} className="flex items-center gap-1">
                                                <img src="/ICONS/check.svg" className="w-4 h-4 shrink-0" />
                                                <span className="text-[12px] sm:text-[16px]  font-light">{item}</span>
                                            </div>
                                            ))}
                                        </div>

                                        {/* Overlapping image */}
                                        <div className="my-2 bg-[#ECEDF1] w-[200px] sm:w-[270px] h-[140px] sm:h-[160px] shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] flex items-center justify-center rounded-2xl">
                                            <img src="/Results-bg.png" alt="" className="w-[180px] sm:w-[250px] h-[120px] sm:h-[140px] object-cover rounded-2xl" />
                                        </div>

                                        {/* Bottom Checkmarks */}
                                        <div className="flex flex-col gap-1 ml-16    sm:ml-24">
                                            {["Proven Progress", "Driven by Code", "Powered by Vision"].map((item) => (
                                            <div key={item} className="flex items-center gap-1">
                                                <img src="/ICONS/check.svg" className="w-4 h-4 shrink-0" />
                                                <span className="text-[12px] sm:text-[16px]">{item}</span>
                                            </div>
                                            ))}
                                    </div>
                                </div>
                        </div>
                    </div>
                            <div className="flex flex-col items-center lg:items-start gap-6 md:gap-4  mt-10">
                                <h1 data-aos="fade-left" data-aos-offset="50" data-aos-delay="300" className="w-full text-center lg:text-left leading-[34px] text-[36px] md:text-[40px] lg:text-[44px] md:leading-[50px]">Every Line of  <span className="text-[#3CBDE6] font-semibold">Code</span> Tells <span className="font-playfair italic text-[#3CBDE6] font-semibold">Our Story.</span></h1>
                                <p data-aos="fade-right" data-aos-offset="50" data-aos-delay="500" className="w-full text-center lg:text-left text-[16px] sm:text-[16px]">Founded with a vision to make technology meaningful, our journey began with a single idea. Today, every project we create reflects our commitment to innovation, collaboration, and creating solutions that truly make a difference. This is our story—and it’s just getting started.</p>
                            </div>
                                </div>
            </div>
       <div className="flex flex-col gap-8 mt-2 ">
                <div className="flex flex-col gap-2 px-2  flex items-center justify-center lg:items-start">
                <div 
                        data-aos="fade-up"
                        className="mt-6 flex items-center justify-center lg:items-start"
                            >
                            </div>
                            <h1 className="text-center leading-[34px] text-[36px] md:text-[42px] lg:text-[50px]">The <span className="text-[#3CBDE6] font-semibold">Vision</span></h1>
                            <p className="md:text-left text-[16px] w-full lg:w-[600px] lg:mt-6">Our vision is to become a trusted leader in digital innovation, empowering businesses through modern technology, scalable solutions, and transformative software that shapes the future of the digital world.
                             </p>
                        </div>
                </div>
                <div className="flex items-center justify-center lg:ml-20 ">
                 <div className="grid grid-cols-[180px_180px] gap-4 lg:gap-y-4 place-items-center">
                    {/* Left Tall Card */}
                    <div  data-aos="fade-right" data-aos-delay="800" className="row-span-2 lg:mr-12">
                        <div className="flex items-center justify-center shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] w-[190px] h-[380px] lg:w-[210px] lg:h-[440px] xl:w-[250px] xl:h-[500px]  rounded-3xl lg:ml-6 xl:ml-0">
                            <img src="/vision1st-pic.svg" alt="" className="w-full h-full object-cover p-2 rounded-3xl " />
                        </div>
                    </div>

                    {/* Right Top Small */}
                    <div className="md:col-span-1">
                        <div data-aos="fade-right"  className="flex items-center justify-center 
                            shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] 
                            w-[180px] h-[180px] lg:w-[210px] lg:h-[210px] xl:w-[240px] xl:h-[240px] lg:ml-8 xl:ml-20 rounded-3xl overflow-hidden">

                            <div className="flex flex-col items-center justify-center gap-2 px-2">
                                 <div className="flex items-center justify-center shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[40px] h-[40px]">
                                    <img src="/ICONS/modernization-icon.svg" alt="" className="w-7 h-7"/>
                                </div>
                            <div className="flex flex-col items-center justify-center gap-2 px-2">
                                <h1 className="text-[18px]">Modernization</h1>
                                <p className=" text-center text-[12px]">Digital Infrastructure for Small and Medium Enterprises(SME). </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="md:col-start-4 md:row-start-1">
                        <div data-aos="fade-left" data-aos-delay="800" className="flex items-center justify-center 
                            shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] 
                            w-[180px] h-[180px] lg:w-[210px] lg:h-[210px] xl:w-[240px] xl:h-[240px] lg:mr-8  rounded-3xl overflow-hidden">

                            <img 
                                src="/vision2nd-pic.svg" 
                                alt="" 
                                className="w-full h-full object-cover p-2 rounded-3xl" 
                            />
                        </div>
                    </div>

                    {/* in lg move to behind of tall card */}
                    
                    <div className="col-span-2 md:col-start-2 md:row-start-1 ">
                    <div data-aos="fade-right" className="flex flex-col items-center justify-center p-6 gap-4 shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-2xl w-[380px] h-[180px] lg:w-[410px] lg:h-[210px] xl:w-[440px] xl:h-[240px] xl:ml-2">
                        <div className="flex flex-row gap-4 ">
                            <div className="flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[40px] h-[40px]">
                                <img src="/ICONS/digital-leader-icon.svg" alt="" className="w-7 h-7"/>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className=" text-[20px]">Digital Leadership</h1>
                                <p className=" text-left font-light text-[10px]">To become a trusted software company that shapes the future through technology. </p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[40px] h-[40px]">
                                <img src="/ICONS/innovation-icon.svg" alt="" className="w-7 h-7"/>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="text-[20px]">Innovation</h1>
                                <p className=" text-left font-light text-[10px]">To lead the future of technology by creating innovative and impactful software solutions. </p>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="col-span-2 md:col-start-3 md:row-start-2  lg:col-span-2 lg:col-start-3 lg:row-start-2">
                    <div data-aos="fade-left" data-aos-delay="800" className="flex flex-col p-2 shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-2xl w-[380px] h-[180px] lg:w-[410px] lg:h-[210px] xl:w-[440px] xl:h-[240px]  xl:ml-10  ">
                        <img src="vision3rd-pic.svg" alt="" className="w-full h-full object-cover p-2 rounded-3xl " />
                        </div>
                    </div>

                </div>
                </div>
                <div className="flex flex-col gap-8 mt-2 lg:mt-8">
                <div className="flex flex-col gap-2 px-2 flex items-center justify-center lg:items-start">
                    <div 
                        data-aos="fade-up"
                        className="mt-2 lg:mt-6 flex items-center justify-center lg:items-start"
                            >
                            </div>
                            <h1 className="text-center leading-[34px] text-[36px] md:text-[42px] lg:text-[50px]">The <span className="text-[#3CBDE6] font-semibold">Mission</span></h1>
                            <p className="md:text-left text-[16px] w-full lg:w-[600px] lg:mt-6">Our mission is to develop reliable, secure, and innovative software solutions that help businesses improve efficiency, enhance digital experiences, and grow in the modern technological landscape.
                             </p>
                        </div>
                </div>
                

                <div className="flex items-center justify-center lg:ml-20 ">
                 <div className="grid grid-cols-[180px_180px] gap-4 lg:gap-y-4 place-items-center">
                    {/* Left Tall Card */}
                    <div  data-aos="fade-right" data-aos-delay="800" className="row-span-2 lg:mr-12">
                        <div className="flex items-center justify-center shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] 
                        w-[190px] h-[380px] lg:w-[210px] lg:h-[440px] xl:w-[250px] xl:h-[500px]  rounded-3xl lg:ml-6 xl:ml-0 overflow-hidden
                        ">
                            <img src="/empowerment.jpg"  alt="" className="w-full h-full object-cover p-2 rounded-3xl 
                            transition-all hover:scale-120 duration-1000" />
                        </div>
                    </div>

                    {/* Right Top Small */}
                    <div className="md:col-span-1">
                        <div data-aos="fade-right"  className="flex items-center justify-center 
                            shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] 
                            w-[180px] h-[180px] lg:w-[210px] lg:h-[210px] xl:w-[240px] xl:h-[240px] lg:ml-8 xl:ml-20 rounded-3xl overflow-hidden">

                            <div className="flex flex-col items-center justify-center gap-2 px-2">
                                <div className="flex items-center justify-center shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[40px] h-[40px]">
                                    <img src="/ICONS/modernization-icon.svg" alt="" className="w-7 h-7"/>
                                </div>
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="text-[18px]">Excellence</h1>
                                <p className=" text-center font-light text-[12px]">Digital Infrastructure for Small and Medium Enterprises(SME). </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="md:col-start-4 md:row-start-1">
                        <div data-aos="fade-left" data-aos-delay="800" className="flex items-center justify-center 
                            shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] 
                            w-[180px] h-[180px] lg:w-[210px] lg:h-[210px] xl:w-[240px] xl:h-[240px] lg:mr-8 rounded-3xl overflow-hidden
                            ">

                            <img 
                                src="/sol-building.jpg" 
                                alt="" 
                                className="hover:scale-120 w-full h-full object-cover p-2 rounded-3xl transition-all duration-1000" 
                            />
                        </div>
                    </div>

                    {/* in lg move to behind of tall card */}
                    
                    <div className="col-span-2 md:col-start-2 md:row-start-1 ">
                    <div data-aos="fade-right" className="flex flex-col items-center justify-center p-6 gap-4 shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-2xl w-[380px] h-[180px] lg:w-[410px] lg:h-[210px] xl:w-[440px] xl:h-[240px] xl:ml-2
                    hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-100
                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition duration-1000 ease-in-out">
                        <div className="flex flex-row gap-4 ">
                            <div className="flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[40px] h-[40px]">
                                <img src="/ICONS/digital-leader-icon.svg" alt="" className="w-7 h-7 "/>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="text-[20px]">Empowerment</h1>
                                <p className=" text-left font-light text-[10px]">To become a trusted software company that shapes the future through technology. </p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[40px] h-[40px]">
                                <img src="/ICONS/innovation-icon.svg" alt="" className="w-7 h-7"/>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="text-[20px]">Solution Building</h1>
                                <p className=" text-left font-light text-[10px]">To lead the future of technology by creating innovative and impactful software solutions. </p>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="col-span-2 md:col-start-3 md:row-start-2  lg:col-span-2 lg:col-start-3 lg:row-start-2">
                    <div data-aos="fade-left" data-aos-delay="800" className="flex flex-col p-2 shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-2xl w-[380px] h-[180px] lg:w-[410px] lg:h-[210px] xl:w-[440px] xl:h-[240px]  xl:ml-10  overflow-hidden">
                        <img src="laptop.png" alt="" className="w-full h-full object-cover p-2 rounded-3xl transition-all duration-1000 hover:scale-120" />
                        </div>
                    </div>

                </div>
                </div>
                </div>

        {/* Results Section */}
     

        {/* Vision & Mission Sections */}
        <div className="my-20">
          
          <Team />
          <div className="">
            <MapDesign />
          </div>
        </div>

        <FAQAccordion />
      </div>
    </div>
  );
}