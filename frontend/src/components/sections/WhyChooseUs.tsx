export default function WhyChooseUs() {
  return (
    <div className="py-10 my-10 px-6">
      {/* --- HEADER --- */}
      <div 
        data-aos="fade-down"
        className="flex items-center justify-center md:items-start flex-col gap-4 max-w-[1280px] mx-auto"
      >
        <h1 
          data-aos="fade-right" 
          data-aos-delay="200" 
          className="font-poppins text-center md:text-left leading-[1.2] tracking-tight text-[32px] md:text-[50px] text-gray-900"
        >
          Why do businesses<span className="text-[#3CBDE6] font-semibold"> choose Opsie? </span>
        </h1>
        <p  
          data-aos="fade-right" 
          data-aos-delay="500" 
          className="text-center md:text-start text-[16px] md:text-[18px] font-light w-full md:w-[600px] text-gray-600 leading-relaxed"
        >
          We combine technical precision with a deep understanding of business goals to deliver 
          software that doesn't just work—it competes and wins.
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
            <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-2">Simple and practical solutions</h2>
            <p className="text-gray-500 font-poppins text-[16px] font-light leading-relaxed max-w-xl">
              Built around real business needs

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
            <h2 className="font-poppins text-[20px] font-bold text-gray-900 mb-1">A team you can rely on</h2>
            <p className="text-gray-500 font-poppins font-light leading-snug text-[13px]">
              People who understand both tech and business
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
            <h2 className="font-poppins text-[20px] font-bold text-gray-900 mb-1">Connected systems</h2>
            <p className="text-gray-500 font-poppins font-light leading-snug text-[13px]">
              Everything works together, so nothing gets missed
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
            <h2 className="font-poppins text-[24px] md:text-[28px] font-bold text-gray-900 mb-2">Ongoing support</h2>
            <p className="text-gray-500 font-poppins text-[16px] font-light leading-relaxed max-w-xl">
               We stay with you as your business grows
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}