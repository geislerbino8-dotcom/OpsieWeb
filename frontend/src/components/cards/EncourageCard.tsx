import { ContentContext } from "@/App";
import SuperHeader from "@/types/components/SuperHeader";
import { useContext } from "react";

function EncourageCard() {
  const content = useContext(ContentContext);

  return (
    <div 
      /* 
        1. Applied a smooth diagonal gradient (from bottom-left to top-right)
        2. Added a relative positioning context and overflow-hidden to house ambient background effects
      */
      className="relative flex flex-col items-center justify-center bg-gradient-to-br from-[#2FAEC8] via-[#3CBDE6] to-[#59CCEE] rounded-3xl p-8 md:p-16 text-center overflow-hidden shadow-[0_20px_40px_rgba(60,189,230,0.15)] border border-white/10"
    >
      {/* Soft, modern ambient lens flare inside the card */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-black/5 blur-3xl rounded-full pointer-events-none" />

      {/* Main Content Wrapper to sit safely above background effects */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Heading */}
        <div className="text-white mb-4 drop-shadow-xs">
          <SuperHeader text="Smarter systems, built around your business" defColor="white" />
        </div>

        {/* Description */}
        <p className="text-white/90 text-sm md:text-base max-w-2xl mb-8 leading-relaxed font-light">
          {content?.encouragecard.subHeader}
        </p>

        {/* Button */}
        <button 
          onClick={()=> window.location.href = '/contact-us'}
          className="bg-white text-[#3CBDE6] text-sm font-semibold tracking-wide uppercase px-8 py-3.5 rounded-xl shadow-md hover:bg-gray-900 hover:text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
          {content?.encouragecard.button.text}
        </button>

      </div>
    </div>
  );
}

export default EncourageCard;