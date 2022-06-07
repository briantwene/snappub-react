// #Filename: PhotoGrid.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React from 'react';
import { Link } from 'react-router-dom';
import ImageRenderer from './ImageRenderer';

function PhotoGrid({ image }) {
  console.log(image);
  {
    /* <img
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
  /> */
  }

  return (
    <Link to="/view" state={{ data: image }}>
      <ImageRenderer
        width={image.originRes.width}
        height={image.originRes.height}
        url={image.pic}
      />
    </Link>
  );
}

export default PhotoGrid;
