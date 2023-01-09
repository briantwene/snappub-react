import React, { useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';

import Link from 'next/link';
import ProgressiveImg from 'react-progressive-graceful-image';
import Image from 'next/image';

function ImageRenderer({ image, key }) {
  const { pic, thumb, author, avatar, id } = image;
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="img-info">
      <div className="author">
        <img className="avatar" src={avatar} alt={avatar} />
        <span>u/{author}</span>
      </div>
      <AspectRatio
        ratio={`${image.originRes?.width}/${image.originRes?.height}`}
      >
        <Link href={`/view/${id}`} state={{ data: image }}>
          <Image
            alt={author}
            src={pic}
            className="image"
            placeholder="blur"
            blurDataURL={thumb}
            layout="fill"
            lassName={`image-${loaded ? 'loading' : 'loaded'}`}
            onLoadingComplete={() => setLoaded(true)}
          />

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
