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
      // backgroundColor must be an inline style: `bg-[${color}]` is composed at
      // runtime, so Tailwind never generates a matching utility.
      style={{ backgroundColor: color }}
      className={`
        flex-1 w-full p-8 rounded-xl
        border border-white/10 card-side-glow hover:shadow-md 
        transition-shadow duration-300 text-left flex flex-col
        ${className}
      `}
    >
      <h3 
        style={{
        color: textColor && textColor
      }}
        className="font-poppins font-bold text-xl mb-4 text-white tracking-tight">
        {title}
      </h3>
      <div className="w-full text-gray-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default ContactsCard;