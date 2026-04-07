
export default function WhyChooseUs() {
    

    return(
        <div className="py-10 my-10">
            <div data-aos="fade-down"
                 className="flex items-center justify-center md:items-start  flex-col gap-4">
                

                    <h1 data-aos="fade-right" data-aos-delay="200" className="font-poppins text-center leading-[35px] tracking-[2px] text-[32px] md:text-[50px]">What Makes Us <span className="text-[#3CBDE6] font-semibold">Different</span></h1>
                    <p  data-aos="fade-right" data-aos-delay="500" className="text-center md:text-start text-[16px] font-light md:font-normal w-full md:w-[600px] text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            <div  className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 mt-10 md:mx-20">
                <div data-aos="fade-right" data-aos-duration="2000" className="col-span-2 md:col-span-2 rounded-3xl shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] bg-white overflow-hidden">
                <img
                    src="/whyChooseUs1stCard3.svg"
                    alt="Cutting Edge"
                    className="w-full overflow-hidden  "
                    />
                    <div className="p-4 flex flex-col items-start justify-start flex-col">
                        <h1 className="text-[22px] font-medium">Cutting-Edge Technology</h1>
                        <p className=" text-left font-poppins text-[16px] font-light ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. </p>
                    </div>
                
                </div>
                <div data-aos="fade-left" data-aos-duration="2000" data-aos-delay="300" className="col-span-1 md:col-span-1 rounded-3xl shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] bg-white overflow-hidden ">
                    <img
                        src="/whyChooseUs2ndCard3.svg"
                        alt="Cutting Edge"
                        className="w-full "
                    />
                    <div className="p-4 flex flex-col items-start justify-start flex-col">
                        <h1 className="font-poppins text-[22px] font-medium">Expert Team</h1>
                        <p className=" text-left font-poppins font-light leading-4 text-[12px] ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. </p>
                    </div>
                </div>
                <div data-aos="fade-right" data-aos-duration="2000" data-aos-delay="300" className="col-span-1 md:col-span-1 rounded-3xl shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] bg-white overflow-hidden ">
                    <img
                        src="/whyChooseUs3rdCard2.svg"
                        alt="Cutting Edge"
                        className="w-full  "
                    />
                    <div className="p-4 flex flex-col items-start justify-start flex-col">
                        <h1 className="font-poppins text-[22px] font-medium">Expert Team</h1>
                        <p className=" text-left font-poppins font-light leading-4 text-[12px] ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. </p>
                    </div>
                </div>
                <div  data-aos="fade-left" data-aos-duration="2000" data-aos-delay="300" className="col-span-2 md:col-span-2 rounded-3xl shadow-[-5px_-5px_10px_0px_#FAFBFF,5px_5px_10px_0px_rgba(166,171,189,0.25)] bg-white overflow-hidden">
                    <img
                        src="/whyChooseUs4thCard4.svg"
                        alt="Cutting Edge"
                        className="w-full "
                    />
                    <div className="p-4 flex flex-col items-start justify-start flex-col">
                        <h1 className="font-poppins text-[22px] font-medium">Reliable Support</h1>
                        <p className=" text-left font-poppins text-[16px] font-light ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. </p>
                    </div>
                </div>
            </div>
        </div>
    )
}