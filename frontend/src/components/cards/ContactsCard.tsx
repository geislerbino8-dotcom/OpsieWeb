import React from "react";

type ContactsCardType = {
  color?: string
  textColor?: string
  title: string;
  children: React.ReactNode;
  className?: string; // Added for extra flexibility
};

function ContactsCard({ title, children, className, color, textColor  }: ContactsCardType) {
  return (
    <div 
      
      className={`
        flex-1 w-full p-8 rounded-xl bg-[${color}] 
        border border-gray-100 shadow-xl hover:shadow-md 
        transition-shadow duration-300 text-left flex flex-col
        ${className}
      `}
    >
      <h3 
        style={{
        color: textColor && textColor
      }}
        className="font-poppins font-bold text-xl mb-4 text-gray-900 tracking-tight">
        {title}
      </h3>
      <div className="w-full text-gray-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default ContactsCard;