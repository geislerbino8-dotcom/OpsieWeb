import React from "react";
import { CardLogic, type CardOptions } from "../../../types/components/ServicesCard/Card";

export const Card: React.FC<CardOptions> = (props) => {
  const logic = new CardLogic(props);

  return (
    <div className=" transition-all duration-500 ease-out
        hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-100
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
        hover:scale-[1.02] hover:border border-gray-300" style={logic.getCardStyle()}>
  
  <div className="p-6  md:px-6">
    <h2 className="text-lg font-poppins  font-medium text-center text-[20px]">{props.title}</h2>
    {props.image && (
    <img
      src={props.image}
      alt={props.title}
      className="w-full object-cover my-4 rounded-xl w-[350px] h-[160px]"
    />
  )}
    {props.description && (
      <p className="text-[12px] font-poppins text-center leading-[18px]">{props.description}</p>
    )}
  </div>
</div>
  );
};