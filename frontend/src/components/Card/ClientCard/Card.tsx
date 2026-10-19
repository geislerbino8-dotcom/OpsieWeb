import React from "react";

type ClientCard = {
  name: string;
  role: string;
  avatar: string;
  review: string;
  rating: number;
  className?: string;
};

export const TestimonialCard: React.FC<ClientCard> = (props) => {
  return (
    <div
      className={`
        group rounded-3xl w-full p-6 bg-[#0a0a0a] ${props.className || ""}
        
        transition-all duration-500 ease-out
        hover:bg-gradient-to-br hover:from-[#8B5CF6]/20 hover:to-[#4C1D95]/40
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.12),0_0_30px_rgba(139,92,246,0.3)]
        hover:scale-[1.02]
      `}
      style={{
        boxShadow: "-24px 0 48px -20px rgba(139, 92, 246, 0.6), 24px 0 48px -20px rgba(139, 92, 246, 0.6)",
      }}
    >
      {/* Header */}
      <div className="flex flex-row items-center gap-3 mb-6">
        <img
          src={props.avatar}
          alt={props.name}
          className="
            w-16 h-16 rounded-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />
        <div className="flex flex-col items-start justify-start">
          <h3 className="
            text-[20px] font-poppins font-semibold text-gray-100
            transition-colors duration-300
            group-hover:text-[#A78BFA]
          ">
            {props.name}
          </h3>
          <p className="
            text-sm font-poppins text-gray-400
            transition-colors duration-300
            group-hover:text-gray-200
          ">
            {props.role}
          </p>
        </div>
      </div>

      {/* Review */}
      <p className="
        text-[16px] font-poppins text-white leading-[22px] mb-4 text-start
        transition-colors duration-300
        group-hover:text-white
      ">
        {props.review}
      </p>

      {/* Stars */}
      <div className="flex flex-row gap-1">
        {Array.from({ length: props.rating }).map((_, i) => (
          <span
            key={i}
            className="
              text-[#8B5CF6] text-2xl
              transition-all duration-300
              group-hover:drop-shadow-[0_0_6px_rgba(60,189,230,0.8)]
            "
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};