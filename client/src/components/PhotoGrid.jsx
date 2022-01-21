// #Filename: PhotoGrid.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React from "react";
import ImageDiv from "./ImageDiv";

function PhotoGrid(props) {
  console.log(props);
  const renderedImages = props.images.map((image, key) => (
    <div className="grid" key={key}>
      <img
        src={image.pic}
        key={key}
        author={image.author}
        alt=""
        loading="lazy"
        onClick={() => {
          props.open(
            image.pic,
            image.author,
            image.title,
            image.originRes,
            image.rating
          );
        }}
      />
    </div>
  ));

  return <div className="photo_grid">{renderedImages}</div>;
}

export default PhotoGrid;
