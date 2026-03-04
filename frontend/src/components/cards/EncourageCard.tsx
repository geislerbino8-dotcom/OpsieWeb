import React from "react";

function EncourageCard() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#3CBDE6] rounded-xl my-4 mx-auto p-12 md:p-16 text-center">

      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-6 leading-snug">
        Your <span className="underline decoration-white">Vision</span>. Our <span className="underline decoration-white">expertise</span>.  
        One <span className="underline decoration-white">Powerful Collaboration</span>
      </h1>

      {/* Description */}
      <p className="text-white text-base md:text-lg mb-6 max-w-2xl">
        Great products are built through teamwork. We work side by side with our clients, combining strategy, creativity, and technology to create solutions that drive real growth and measurable impact.
      </p>

      {/* Button */}
      <button className="bg-white text-[#3CBDE6] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-300">
        Contact Us Now
      </button>

    </div>
  );
}

export default EncourageCard;