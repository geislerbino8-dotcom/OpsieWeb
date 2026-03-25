import React from "react";

export type CardOptions = {
  title?: string;
  image: string;
  description: string;
  className?: string;
  disabled?: boolean;
  bg?: "gray" | "white";
  variant?: "primary" | "secondary" | "danger";
  weight?: "light" | "medium" | "bold";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export class CardLogic {
  private options: CardOptions;

  private static variantClasses: Record<string, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  private static weightClasses: Record<string, string> = {
    light: "font-light",
    medium: "font-medium",
    bold: "font-bold",
  };
  public getCardClass(): string {
    const { className, bg = "gray" } = this.options;
  
    const backgroundClasses: Record<string, string> = {
      gray: "bg-[#ECEDF1]",
      white: "bg-white",
    };
  
    const base = "rounded-xl overflow-hidden";
  
    return `${base} ${backgroundClasses[bg]} ${className || ""}`.trim();
  }

  public getCardStyle(): React.CSSProperties {
    return {
      borderRadius: "25px",
      boxShadow: "-5px -5px 10px 0px #FAFBFF, 5px 5px 10px 0px rgba(166, 171, 189, 0.25) ",
    };
  }

  constructor(options: CardOptions) {
    this.options = options;
  }

  public getButtonClass(): string {
    const {
      disabled,
      className,
      variant = "primary",
      weight = "medium",
    } = this.options;

    const base =
      "px-2 py-1 rounded-xl font-medium flex items-center justify-center transition";

    const variantStyle =
      CardLogic.variantClasses[variant] ?? CardLogic.variantClasses["primary"];

    const weightStyle =
      CardLogic.weightClasses[weight] ?? CardLogic.weightClasses["medium"];

    const disabledStyle = disabled ? " opacity-50 cursor-not-allowed" : "";

    return `${base} ${variantStyle} ${weightStyle} ${disabledStyle} ${className || ""}`.trim();
  }

  public handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!this.options.disabled) {
      this.options.onClick?.(e);
    }
  }
}