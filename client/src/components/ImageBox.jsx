import React from "react";

function ImageBox(props) {
  return (
    <div className="img-box">
      {/* <img src="https://i.redd.it/gakgutj5z2781.png" className="img" alt="" /> */}
      {/* <img src="https://i.imgur.com/JpJVEmw.jpg" alt="" className="img" /> */}
      <img src={props.image} alt="" className="img" />
    </div>
  );
}

export default ImageBox;
