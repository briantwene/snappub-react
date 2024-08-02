// #Filename: Button.jsx
// #Author: Brian Twene (@bt521)
// #Date:11/12/21
import React from "react";

interface ButtonProps {
  label: string;
  className: string;
  handleClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  label,
  handleClick,
}) => {
  return (
    <button className={className} onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
