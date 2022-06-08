import React from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { Link } from 'react-router-dom';

function ImageRenderer({ image, key }) {
  const { originRes, pic, author, avatar, title } = image;
  const { width, height } = originRes;

  return (
    <div className="img-info">
      <div className="author">
        <img className="avatar" src={avatar} alt={avatar} />
        <span>u/{author}</span>
      </div>
      <AspectRatio ratio={`${width}/${height}`}>
        <Link to="/view" state={{ data: image }}>
          <img src={pic} className="image" alt={`${title} from ${author}`} />
          <div className="resolution">
            {`${image.originRes.height}`} &#10005; {`${image.originRes.width}`}
          </div>
        </Link>
      </AspectRatio>
      <div className="mobile-res">
        {`${image.originRes.height}`} &#10005; {`${image.originRes.width}`}
      </div>
    </div>
  );
}

export default ImageRenderer;
