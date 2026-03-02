import React from "react";

interface SectionHeaderProps {
  badgeText: string;
  icon?: string; // image path
  title?: string;
  highlight?: string;
  description?: string;

  // Optional custom class overrides
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  badgeClassName?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  icon,
  containerClassName = "",
  titleClassName = "",
  badgeClassName = "",
}) => {
  return (
    <div className={`flex items-center justify-center flex-col gap-4 ${containerClassName}`}>
      
      {/* Badge */}
      <div
  className={`w-full px-4 py-2 flex items-center justify-center gap-2 ${badgeClassName}`}
  style={{
    backgroundColor: "rgb(240, 242, 245)",
    borderRadius: "50px",
    boxShadow:
      "rgba(60, 189, 230, 0.25) 2px 3px 4px 0px inset , rgba(250, 251, 255, 1) -2px -2px 4px 0px inset",
  }}
>
    <div className="w-7 h-7 rounded-full bg-[#3CBDE6] flex items-center justify-center">
    {icon && (
        <img
        src={icon}
        alt="icon"
        className="w-5 h-5 object-contain"
        />
    )}
    </div>

  <p className="font-poppins text-[#3CBDE6] font-medium text-[16px] leading-none">
    {badgeText}
  </p>
</div>  

      {/* Title */}
      <h1
        className={`font-poppins text-center tracking-[2px] 
        text-[24px] md:text-[32px] lg:text-[40px] 
        leading-[32px] md:leading-[40px] ${titleClassName}`}
      >
      </h1>

      {/* Description */}
      
    </div>
  );
};

export default SectionHeader;