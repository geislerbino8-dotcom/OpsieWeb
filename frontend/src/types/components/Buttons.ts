import React from "react";

export type ButtonOptions = {
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconClassName?: string;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "shadow";
  weight?: "light" | "medium" | "bold";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  iconImage?: string;
};

export class ButtonLogic {
  private options: ButtonOptions;

  private static variantClasses: Record<string, string> = {
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer gap-4 text-md",
    danger: "bg-red-500 text-white hover:bg-red-600",
    shadow: "bg-white text-gray-800 ",
  };
  
  private static variantStyles: Record<string, React.CSSProperties> = {
    shadow: {
      boxShadow:
        "rgba(60, 189, 230, 0.25) 2px 3px 4px 0px inset, rgba(250, 251, 255, 1) -2px -2px 4px 0px inset",
      
    },
  };
  
  public getButtonStyle(): React.CSSProperties {
    const { variant = "primary" } = this.options;
    return ButtonLogic.variantStyles[variant] ?? {};
  }

  private static weightClasses: Record<string, string> = {
    light: "font-light",
    medium: "font-medium",
    bold: "font-bold",
  };

  constructor(options: ButtonOptions) {
    this.options = options;
  }

  public getButtonClass(): string {
    const { disabled, className, variant = "primary", weight = "medium" } = this.options;

    const base = "px-2 py-1 rounded-full font-medium flex items-center justify-center transition";
    const variantStyle = ButtonLogic.variantClasses[variant] ?? ButtonLogic.variantClasses["primary"];
    const weightStyle = ButtonLogic.weightClasses[weight] ?? ButtonLogic.weightClasses["medium"];
    const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

    return `${base} ${variantStyle} ${weightStyle} ${disabledStyle} ${className || ""}`.trim();
  }

  

  public getIconSpacing(): string {
    return this.options.iconPosition === "right" ? "ml-2" : "mr-2";
  }
  public handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!this.options.disabled) {
      this.options.onClick?.(e);
    }
  }
}