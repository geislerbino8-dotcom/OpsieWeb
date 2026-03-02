import React from "react";
import { ButtonLogic, type ButtonOptions } 
from "../../types/components/Buttons";

export const Button: React.FC<ButtonOptions> = (props) => {
  const logic = new ButtonLogic(props);

  return (
    <button
      type="button"
      className={logic.getButtonClass()}
      style={logic.getButtonStyle()}
      onClick={(e) => logic.handleClick(e)}
      disabled={props.disabled}
    >
      {props.icon && props.iconPosition !== "right" && (
       <span className={props.iconClassName}>
          {props.icon}
        </span>
      )}

      {props.iconImage && (
        <img src={props.iconImage} alt="" className={props.iconClassName}  />
      )}

      {props.label}

      {props.icon && props.iconPosition === "right" && (
        <span className={props.iconClassName}>
          {props.icon}
        </span>
      )}
    </button>
  );
};