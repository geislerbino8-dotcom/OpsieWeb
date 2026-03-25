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
      className={`rounded-3xl w-full p-6 bg-white ${props.className || ""}`}
      style={{
        boxShadow: "-5px -5px 10px 0px #FAFBFF, 5px 5px 10px 0px rgba(166, 171, 189, 0.25)",
      }}
    >
      {/* Header */}
      <div className="flex flex-row items-center gap-2 mb-6">
        <img
          src={props.avatar}
          alt={props.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex flex-col items-start justify-start">
          <h3 className="text-[20px] font-poppins font-semibold text-gray-800">{props.name}</h3>
          <p className="text-sm font-poppins text-gray-500">{props.role}</p>
        </div>
      </div>

      {/* Review */}
      <p className="text-[16px] font-poppins  text-black leading-[18px] mb-4 text-start">{props.review}</p>

      {/* Stars */}
      <div className="flex flex-row gap-1">
        {Array.from({ length: props.rating }).map((_, i) => (
          <span key={i} className="text-[#3CBDE6] text-3xl">★</span>
        ))}
      </div>
    </div>
  );
};