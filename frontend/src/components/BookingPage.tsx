import { InlineWidget } from "react-calendly";
import logo from '../assets/icons/opsie_logo_only.png';

function BookingPage() {
  return (
    <div className="min-h-screen w-full bg-[#FAFBFF] relative overflow-hidden flex flex-col items-center">
      
      {/* --- BACKGROUND DECOR --- */}
      {/* Large faint logo watermark */}
      <img 
        src={logo} 
        alt="" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] opacity-[0.03] pointer-events-none select-none"
      />
      
      {/* Subtle Gradient Blobs for depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#3CBDE6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#3CBDE6]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 w-full max-w-[1280px] px-6 py-20 flex flex-col items-center">

        {/* --- CALENDLY WRAPPER --- */}
        <div 
          className="w-full max-w-5xl overflow-hidden"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div className="">
            <div className="text-center" data-aos="fade-down">
          
          <h1 className="text-4xl md:text-6xl font-poppins leading-tight">
            Let’s Discuss <span className="text-[#3CBDE6] font-semibold">Your Vision.</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Select a time that works best for you. Our experts are ready to help you 
            turn complex challenges into simple digital solutions.
          </p>
        </div>
             <InlineWidget
              url="https://calendly.com/inquiry-opsiesoftwaresolutions/30min"
              styles={{ height: "700px", width: '100%', margin: 0, padding: 0}}
              pageSettings={{
                backgroundColor: 'ffffff',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: '3cbde6',
                textColor: '242424',
              }}
              prefill={{
                name: "Juan Dela Cruz",
                email: "juanD@example.com",
              }}
            />
          </div>
        </div>

        {/* --- ALTERNATIVE CTA --- */}
        <div className="text-center space-y-6" data-aos="fade-up" data-aos-delay="400">
          <div className="h-[1px] w-20 bg-gray-300 mx-auto"></div>
          <p className="text-gray-500 font-light">
            Prefer a different way to connect? 
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:support@example.com" 
              className="text-[#242424] font-semibold hover:text-[#3CBDE6] transition-colors flex items-center gap-2"
            >
              Email us directly →
            </a>
            <span className="hidden md:block text-gray-300">|</span>
            <button className="text-[#242424] font-semibold hover:text-[#3CBDE6] transition-colors">
              Chat on Messenger
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BookingPage;