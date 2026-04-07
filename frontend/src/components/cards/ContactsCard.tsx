import React from "react";

type ContactsCardType = {
  title: string;
  children: React.ReactNode;
  className?: string; // Added for extra flexibility
};

function ContactsCard({ title, children, className = "" }: ContactsCardType) {
  return (
    <div 
      className={`
        flex-1 w-full p-8 rounded-xl bg-white 
        border border-gray-100 shadow-sm hover:shadow-md 
        transition-shadow duration-300 text-left flex flex-col
        ${className}
      `}
    >
      <h3 className="font-poppins font-bold text-xl mb-4 text-gray-900 tracking-tight">
        {title}
      </h3>
      <div className="w-full text-gray-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default ContactsCard;