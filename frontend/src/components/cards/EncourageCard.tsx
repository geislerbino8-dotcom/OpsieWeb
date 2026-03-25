
function EncourageCard() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#3CBDE6] rounded-2xl p-8 md:p-12 text-center">

      {/* Heading */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-snug mb-4">
        <span className="text-black font-bold">Your</span>{" "}
        <span className="text-white">Vision.</span>{" "}
        <span className="text-black font-bold">Our</span>{" "}
        <span className="text-white">Expertise.</span>{" "}
        <span className="text-black font-bold">One</span>
        <br />
        <span className="text-white font-semibold">
          Powerful Collaboration.
        </span>
      </h1>

      {/* Description */}
      <p className="text-white/90 text-sm md:text-base max-w-2xl mb-6 leading-relaxed">
        Great products are built through teamwork. We work side by side with our clients,
        combining strategy, creativity, and technology to create solutions that drive real growth
        and measurable impact.
      </p>

      {/* Button */}
      <button className="bg-white text-[#3CBDE6] text-sm font-medium px-6 py-2 rounded-full shadow-sm hover:bg-gray-100 transition">
        Contact Us Now 
      </button>

    </div>
  );
}

export default EncourageCard;