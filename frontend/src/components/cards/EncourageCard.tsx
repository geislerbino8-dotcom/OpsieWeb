import { usePageContent } from "@/data/usePageContent";
import SuperHeader from "@/types/components/SuperHeader";
import { useState } from "react";

function EncourageCard() {

  const [ content ] = useState(usePageContent.data[0].encouragecard)

  return (
    <div className="flex flex-col items-center justify-center bg-[#3CBDE6] rounded-2xl p-8 md:p-12 text-center">

      {/* Heading */}
      <SuperHeader text="Smarter systems, built around your business" />

      {/* Description */}
      <p className="text-white/90 text-sm md:text-base max-w-2xl mb-6 leading-relaxed">
       {
          content.subHeader
       }
      </p>

      {/* Button */}
      <button className="bg-white text-[#3CBDE6] text-sm font-medium px-6 py-2 rounded-full shadow-sm hover:bg-black
        hover:text-white transition-all duration-500">
        {
          content.button.text
        }
      </button>

    </div>
  );
}

export default EncourageCard;