import React from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { Link } from 'react-router-dom';

function ImageRenderer({ image, key }) {
  const { originRes, pic, author, title } = image;
  const { width, height } = originRes;

  return (
    <AspectRatio
      ratio={`${width}/${height}`}
      style={{ height: '20vh', flexGrow: '1' }}
    >
      <Link to="/view" state={{ data: image }}>
        <img src={pic} className="image" alt={`${title} from ${author}`} />
        <div className="resolution">
          {`${image.originRes.height}`} &#10005; {`${image.originRes.width}`}
        </div>
      </Link>
    </AspectRatio>
  );
}

export default ImageRenderer;
