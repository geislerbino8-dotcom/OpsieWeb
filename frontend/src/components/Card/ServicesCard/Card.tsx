import React from "react";
import { CardLogic, type CardOptions } from "../../../types/components/ServicesCard/Card";

export const Card: React.FC<CardOptions> = (props) => {
  const logic = new CardLogic(props);

  return (
    <div className=" transition-all duration-500 ease-out
        hover:bg-gradient-to-br hover:from-[#8B5CF6]/20 hover:to-[#4C1D95]/40
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
        hover:scale-[1.02] hover:border hover:border-white/20" style={logic.getCardStyle()}>
  
  <div className="p-6  md:px-6">
    <h2 className="text-lg font-poppins  font-medium text-center text-white text-[20px]">{props.title}</h2>
    {props.image && (
    <img
      src={props.image}
      alt={props.title}
      className="w-full object-cover my-4 rounded-xl w-[350px] h-[160px]"
    />
  )}
    {props.description && (
      <p className="text-[12px] font-poppins text-center text-gray-300 leading-[18px]">{props.description}</p>
    )}
  </div>
</div>
  );
};