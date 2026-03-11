import { Button } from "../components/Button/Button";
import { Card }  from "../components/Card/ServicesCard/Card";
import FAQAccordion from "../components/FaqSection/Faq";
import { useNavigate } from "react-router-dom";
import { SiFacebook, SiInstagram, SiGmail } from "react-icons/si";
import Header from "../components/Header";
import CountUp from "../components/CountUp";


export default function WhatWeDo() {

  const navigate = useNavigate();
    return (
      <div className="w-full overflow-hidden ">

  {/* HERO SECTION */}
  <div className="w-full px-2 h-[6000px] ">
    <div className="relative w-full  ">
    <div data-aos="fade-right" className="relative h-[90vh] lg:h-[85vh] md:min-h-[600px] rounded-4xl overflow-hidden mb-10">
  
    {/* Background Image */}
    <img
      src="/WhatWeDo-Hero7.svg"
      alt="Hero Image"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="lg:w-[820px] md:via-black/70 absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 sm:bg-gradient-to-t md:bg-gradient-to-r sm:from-black/100 sm:via-black/20 md:from-black/100  to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center justify-end md:justify-end  mt-20 md:mt-10 h-full px-4 text-white">
                <div className="mb-24 flex flex-col items-center md:items-center md:justify-center md:items-start w-full">
                    <h1 data-aos="fade-right" className="w-full max-w-[605px] font-poppins text-[40px] leading-[40px] md:text-[60px] md:leading-[60px] text-center md:text-left font-light">
                        A Team of Builders, Thinkers, and Problem-Solvers
                    </h1>
                    <p data-aos="fade-right" className="font-poppins mt-4 text-[14px] leading-[14px] md:text-xl font-light text-center md:text-left  max-w-2xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolfore magna aliqua. 
                    </p>
                    <div data-aos="fade-right" data-aos-offset="50" data-aos-delay="400">
                    <Button
                    label="Learn More"
                    variant="secondary"
                    icon={<img src="/ICONS/contact-us.svg" className="w-3 h-3" />}
                    iconPosition="right"
                    className="font-poppins font-light my-4 px-4 text-md "
                    weight="light"
                    onClick={() => navigate("/whatWeDo")} //navigate to contact page
                />
                </div>
            </div>
            <div className="absolute inline-block right-1/5 bottom-[-20px] md:right-0 md:bottom-14   lg:right-12 lg:bottom-12  xl:right-24 xl:bottom-12 ">
            <div className="hidden md:flex flex-row md:grid-cols-2 md:gap-1 lg:gap-2 justify-center ">
                <div className="w-14 h-14 md:w-10 md:h-10 lg:w-14 lg:h-14 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                    <SiFacebook className="text-[#3CBDE6] text-3xl object-cover  md:w-4 md:h-4 lg:w-8 lg:h-8 "/>
                </div>
                <div className="w-14 h-14 md:w-10 md:h-10 lg:w-14 lg:h-14 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                    <SiInstagram className="text-[#3CBDE6] text-3xl object-cover  md:w-4 md:h-4 lg:w-8 lg:h-8  " />
                </div>
                <div className="w-14 h-14 md:w-10 md:h-10 lg:w-14 lg:h-14 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                </div>
                <div className="w-14 h-14 md:w-10 md:h-10 lg:w-14 lg:h-14 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                    <SiGmail className="text-[#3CBDE6] text-3xl object-cover  md:w-4 md:h-4 lg:w-8 lg:h-8  " />
                 </div>
            </div>
        </div>
        </div>
        
    </div>
    <div className="flex items-center justify-center md:hidden flex-row gap-4 mb-6 md:mb-10">
        <div className="w-14 h-14 md:w-18 md:h-18 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                 <SiFacebook className="text-[#3CBDE6] text-3xl object-cover "/>
                </div>
                <div className="w-14 h-14  md:w-18 md:h-18 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                    <SiInstagram className="text-[#3CBDE6] text-3xl object-cover " />
                </div>
                <div className="w-14 h-14  md:w-18 md:h-18 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                </div>
                <div className="w-14 h-14  md:w-18 md:h-18 border-1 border-[#3CBDE6] rounded-full object p-1 flex items-center justify-center">
                 <SiGmail className="text-[#3CBDE6] text-3xl object-cover " />
        </div>
    </div>
    <div className="flex flex-col items-center justify-center md:flex-row gap-2 md:gap-16  sm:px-[4%] md:px-[6%]">
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-0 md:gap-0  lg:mt-10">
            <div className="flex flex-col items-center md:items-start justify-center md:w-1/2 gap-6 md:gap-10 px-2 md:mt-14">
            <h1 data-aos="fade-right" className="w-full md:w-[410px] lg:w-[600px] font-poppins text-center md:text-left leading-[34px] text-[36px] md:text-[42px] lg:text-[50px] md:leading-[42px] lg:leading-[65px]">
                We Believe in <span className="text-[#3CBDE6] font-semibold">Result </span>
                Driven by <br />
                <span className="font-playfair italic text-[#3CBDE6] font-semibold">Smart Technology</span>
            </h1>
            <p data-aos="fade-right" data-aos-delay="200" className="w-full md:w-[320px] lg:w-[450px] font-poppins text-center md:text-left text-[16px] sm:text-[14px] md:text-[18px] leading-[18px] font-light">
                At <span className="text-[#3CBDE6]  font-semibold">Opsie</span>, we believe that real business growth is rooted in strategy, insight, and execution.
            </p>
            <div data-aos="fade-right" data-aos-offset="50" data-aos-delay="400">
                <Button
                    label="Get Started"
                    icon={<img src="/ICONS/get-started-arrow.svg" className="w-6 h-6" />}
                    iconPosition="right"
                    className="bg-[#3CBDE6] flex items-center justify-center text-white gap-2 text-lg px-3 w-[200px]"
                    onClick={() => alert("Button clicked!")}
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
                                    <h1 className="font-poppins text-2xl font-semibold">
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
                            <h1  className="font-poppins text-[45px] sm:text-[70px] md:text-[80px] font-bold lg:text-[90px]  lg:leading-16" ><CountUp
                                    from={0}
                                    to={20}
                                    direction="up"
                                    duration={1}
                                    delay={0.5}
                                    className="count-up-text"
                                    startCounting={true}
                                    separator=","
                                    onStart={() => console.log('Counting started')}
                                    onEnd={() => console.log('Counting ended')}
                                />+</h1>
                            <p className="font-poppins text-[12px] sm:text-[16px] md:text-[16px] lg:text-[20px]">Satisfied Clients</p>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-offset="50" data-aos-delay="500" className="flex flex-row items-center justify-center">
                            <div className="h-[85px] bg-[#B3B3B3] w-[2px]"></div>
                            <div className="flex flex-col  mx-4 sm:mx-6 md:mx-8 lg:mx-10 ">
                            <h1 className="font-poppins text-[45px] sm:text-[70px] md:text-[80px] font-bold lg:text-[90px] lg:leading-16">
                                <CountUp
                                    from={0}
                                    to={100}
                                    direction="up"
                                    duration={1}
                                    delay={0.5}
                                    className="count-up-text"
                                    startCounting={true}
                                    separator=","
                                    onStart={() => console.log('Counting started')}
                                    onEnd={() => console.log('Counting ended')}
                                />
                                %
                            </h1>
                                <p  className="font-poppins text-[12px] sm:text-[16px] md:text-[16px] lg:text-[20px]">Commitment to Quality</p>
                            </div>
                            
                        </div>
                        <div data-aos="fade-left" data-aos-offset="50" data-aos-delay="800" className="flex flex-row  items-center justify-center">
                            <div className="h-[85px] bg-[#B3B3B3] w-[2px] "></div>
                                <div className="flex flex-col mx-4 sm:mx-6  md:mx-8 lg:mx-10 ">
                                    <h1  className="font-poppins text-[45px] sm:text-[70px] md:text-[80px] font-bold lg:text-[90px]  lg:leading-16" ><CountUp
                                    from={0}
                                    to={10}
                                    direction="up"
                                    duration={1}
                                    delay={0.5}
                                    className="count-up-text"
                                    startCounting={true}
                                    separator=","
                                    onStart={() => console.log('Counting started')}
                                    onEnd={() => console.log('Counting ended')}
                                />+</h1>
                                    <p className="font-poppins text-[12px] sm:text-[16px] md:text-[16px] lg:text-[20px]">Projects Delivered</p>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="flex flex-col gap-8 px-[4%] max-w-[1400px] mx-auto mt-4 md:mt-10  sm:px-[4%] md:px-[6%]">
                     <div className="flex flex-col gap-6 flex items-center justify-center lg:items-start font-poppins ">
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
                                                <span className="font-poppins text-[12px] sm:text-[16px]  font-light">{item}</span>
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
                                                <span className="font-poppins text-[12px] sm:text-[16px] font-light">{item}</span>
                                            </div>
                                            ))}
                                    </div>
                                </div>
                        </div>
                    </div>
                            <div className="flex flex-col items-center lg:items-start gap-6 md:gap-4  mt-10">
                                <h1 data-aos="fade-left" data-aos-offset="50" data-aos-delay="300" className="w-full  font-poppins text-center lg:text-left leading-[34px] text-[36px] md:text-[40px] lg:text-[44px] md:leading-[50px]">Every Line of  <span className="text-[#3CBDE6] font-semibold">Code</span> Tells <span className="font-playfair italic text-[#3CBDE6] font-semibold">Our Story.</span></h1>
                                <p data-aos="fade-right" data-aos-offset="50" data-aos-delay="500" className="w-full  font-poppins text-center lg:text-left text-[14px] sm:text-[16px]  leading-[16px] sm:leading-[18px] font-light">Founded with a vision to make technology meaningful, our journey began with a single idea. Today, every project we create reflects our commitment to innovation, collaboration, and creating solutions that truly make a difference. This is our story—and it’s just getting started.</p>
                            </div>
                                </div>
            </div>
       <div className="flex flex-col gap-8 mt-2 ">
                <div className="flex flex-col gap-2 px-2  flex items-center justify-center font-poppins lg:items-start">
                <div 
                        data-aos="fade-up"
                        className="mt-6 flex items-center justify-center lg:items-start"
                            >
                            </div>
                            <h1 className="font-poppins text-center leading-[34px] text-[36px] md:text-[42px] lg:text-[50px]">The <span className="text-[#3CBDE6] font-semibold">Vision</span></h1>
                            <p className="font-poppins text-center text-[16px] leading-[15px] font-light w-full text-start lg:w-[600px] lg:mt-6">Our vision is to become a trusted leader in digital innovation, empowering businesses through modern technology, scalable solutions, and transformative software that shapes the future of the digital world.
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
                                <h1 className="font-poppins text-[18px]">Modernization</h1>
                                <p className=" text-center font-poppins font-light text-[12px]">Digital Infrastructure for Small and Medium Enterprises(SME). </p>
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
                                <h1 className="font-poppins text-[20px]">Digital Leadership</h1>
                                <p className=" text-left font-poppins font-light text-[10px]">To become a trusted software company that shapes the future through technology. </p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[40px] h-[40px]">
                                <img src="/ICONS/innovation-icon.svg" alt="" className="w-7 h-7"/>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="font-poppins text-[20px]">Innovation</h1>
                                <p className=" text-left font-poppins font-light text-[10px]">To lead the future of technology by creating innovative and impactful software solutions. </p>
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
                <div className="flex flex-col gap-2 px-2 flex items-center justify-center font-poppins lg:items-start">
                    <div 
                        data-aos="fade-up"
                        className="mt-2 lg:mt-6 flex items-center justify-center lg:items-start"
                            >
                            </div>
                            <h1 className="font-poppins text-center leading-[34px] text-[36px] md:text-[42px] lg:text-[50px]">The <span className="text-[#3CBDE6] font-semibold">Mission</span></h1>
                            <p className="font-poppins text-center text-[16px] leading-[15px] font-light w-full text-start lg:w-[600px] lg:mt-6">Our mission is to develop reliable, secure, and innovative software solutions that help businesses improve efficiency, enhance digital experiences, and grow in the modern technological landscape.
                             </p>
                        </div>
                </div>
                

                <div className="flex items-center justify-center lg:ml-20 ">
                 <div className="grid grid-cols-[180px_180px] gap-4 lg:gap-y-4 place-items-center">
                    {/* Left Tall Card */}
                    <div  data-aos="fade-right" data-aos-delay="800" className="row-span-2 lg:mr-12">
                        <div className="flex items-center justify-center shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] w-[190px] h-[380px] lg:w-[210px] lg:h-[440px] xl:w-[250px] xl:h-[500px]  rounded-3xl lg:ml-6 xl:ml-0">
                            <img src="/empowerment.jpg"  alt="" className="w-full h-full object-cover p-2 rounded-3xl " />
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
                                <h1 className="font-poppins text-[18px]">Excellence</h1>
                                <p className=" text-center font-poppins font-light text-[12px]">Digital Infrastructure for Small and Medium Enterprises(SME). </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="md:col-start-4 md:row-start-1">
                        <div data-aos="fade-left" data-aos-delay="800" className="flex items-center justify-center 
                            shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] 
                            w-[180px] h-[180px] lg:w-[210px] lg:h-[210px] xl:w-[240px] xl:h-[240px] lg:mr-8  rounded-3xl overflow-hidden">

                            <img 
                                src="/sol-building.jpg" 
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
                                <h1 className="font-poppins text-[20px]">Empowerment</h1>
                                <p className=" text-left font-poppins font-light text-[10px]">To become a trusted software company that shapes the future through technology. </p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] rounded-full  w-[40px] h-[40px]">
                                <img src="/ICONS/innovation-icon.svg" alt="" className="w-7 h-7"/>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="font-poppins text-[20px]">Solution Building</h1>
                                <p className=" text-left font-poppins font-light text-[10px]">To lead the future of technology by creating innovative and impactful software solutions. </p>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="col-span-2 md:col-start-3 md:row-start-2  lg:col-span-2 lg:col-start-3 lg:row-start-2">
                    <div data-aos="fade-left" data-aos-delay="800" className="flex flex-col p-2 shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] rounded-2xl w-[380px] h-[180px] lg:w-[410px] lg:h-[210px] xl:w-[440px] xl:h-[240px]  xl:ml-10  ">
                        <img src="laptop.png" alt="" className="w-full h-full object-cover p-2 rounded-3xl " />
                        </div>
                    </div>

                </div>
                </div>
                <div className="flex flex-col  gap-8 my-12">
                <div className="flex flex-col   gap-2 px-2 flex items-center justify-center font-poppins">
                        </div>
                        
                        <div className="flex items-center justify-center  lg:items-start gap-14 ">
                                <div className=" w-full flex flex-col md:flex-row  lg:items-start gap-4">
                                        <div className=" w-full flex flex-col md:flex-col   flex items-center justify-center md:items-start lg:flex-col gap-6">
                                            
                                            <h1 data-aos="fade-down" className="font-poppins text-center md:text-start leading-[34px] md:leading-[44px] lg:leading-[62px] text-[36px] md:text-[42px] lg:text-[50px]">Visit <span className="text-[#3CBDE6] font-semibold">Us</span> Let’s Talk <span className="text-[#3CBDE6] font-semibold"><br />Innovation</span></h1>
                                            <div data-aos="fade-right" data-aos-delay="300" className="flex lg:w-[500px]">
                                                <p className="font-poppins text-center md:text-start w-full text-[16px] leading-[15px] font-light">Our doors are open for clients and partners who are ready to innovate. Drop by our location and start the conversation that turns ideas into real solutions. </p>
                                            </div>
                                            <div data-aos="fade-right" data-aos-delay="500" className="flex items-center justify-center bg-[#3CBDE6] py-1  md:text-[12px] lg:text-[16px] lg:px-4  rounded-3xl text-white lg:mt-4">
                                                <Button
                                                    label="Get Direction"
                                                    icon={<img src="/ICONS/get-started-arrow.svg" className="w-6 h-6" />}
                                                    iconPosition="right"
                                                    onClick={() => alert("Button clicked!")}
                                                    />
                                            </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                            <div data-aos="fade-left" data-aos-delay="700" className="w-[500px] md:w-[400px] p-2 rounded-3xl  flex items-center justify-center shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)]">
                                                <img src="/map-placeholder.png" alt="" />
                                            </div>  
                                    </div>

                            </div>
                        </div>
                    </div>
                <FAQAccordion />
                </div>
            <div>
                   
                </div>
           
       </div>
             
    </div>
</div>
        
      );

}
