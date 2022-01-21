import React from "react";
import InfoBox from "./InfoBox";
import ImageBox from "./ImageBox";

function Lightbox(props) {
  return (
    <>
      <div className="lightbox">
        <ImageBox image={props.popupImage} />
        <InfoBox
          author={props.popupAuthor}
          title={props.popupTitle}
          close={props.closePopup}
          originRes={props.originRes}
          rating={props.rating}
          download={props.download}
          link={props.popupImage}
        />
      </div>
    </>
  );
}

export default Lightbox;
