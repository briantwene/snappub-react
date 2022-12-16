// #Filename: Button.jsx
// #Author: Brian Twene (@bt521)
// #Date:11/12/21
import React from "react";

function Button(props) {
  return (
    <button className={props.className} onClick={props.handleClick}>
      {props.label}
    </button>
  );
}

export default Button;
