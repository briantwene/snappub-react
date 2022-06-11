import React from 'react';
import { AspectRatio } from 'react-aspect-ratio';
import { Link } from 'react-router-dom';
import ProgressiveImg from 'react-progressive-graceful-image';

function ImageRenderer({ image, key }) {
  const { originRes, pic, thumb, author, avatar, title } = image;

  return (
    <div className="img-info">
      <div className="author">
        <img className="avatar" src={avatar} alt={avatar} />
        <span>u/{author}</span>
      </div>
      <AspectRatio ratio={`${image.originRes.width}/${image.originRes.height}`}>
        <Link to="/view" state={{ data: image }}>
          <ProgressiveImg src={pic} placeholder={thumb}>
            {(src, loading) => (
              <img
                src={src}
                alt=""
                className={`image-${loading ? 'loading' : 'loaded'}`}
              />
            )}
          </ProgressiveImg>
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
