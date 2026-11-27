import React from "react";

type PrimaryButtonProps = {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: string;
  className?: string;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  className = "",
}) => {
  // 🎨 Variants
  const variants = {
    primary:
      "text-[#062e3b] bg-[#3cbde7] hover:bg-[#77d8f5]",
    outline:
      "border border-[#3cbde7] text-[#3cbde7] hover:bg-[#3cbde7] hover:text-[#062e3b]",
    ghost:
      "text-[#3cbde7] hover:bg-[#3cbde7]/10",
  };

  // 📏 Sizes
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2
        rounded-full
        font-semibold
        transition-all duration-1000 ease-out
        active:scale-95
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : "inline-flex"}
        ${className}
      `}
    >
      <span>{text}</span>

      {icon && (
        <img
          src={icon}
          alt=""
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </button>
  );
};

export default PrimaryButton;