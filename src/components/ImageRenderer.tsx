'use client';

import React, { useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';

import Link from 'next/link';
import ProgressiveImg from 'react-progressive-graceful-image';
import Image from 'next/image';
import { Wallpaper } from '../models/Wallpaper';

interface ImageRendererProps {
  image: Wallpaper;
}

export const ImageRenderer: React.FC<ImageRendererProps> = ({ image }) => {
  const { src, thumb, author, avatar, id, title } = image;
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="img-info">
      <div className="author">
        <Image
          alt={author}
          width="32"
          height="32"
          className="avatar"
          src={avatar}
        />
        <span>u/{author}</span>
      </div>
      <AspectRatio
        ratio={`${image.resolution?.width}/${image.resolution?.height}`}
      >
        <Link href={`/app/view/${id}`} state={{ data: image }}>
          <Image
            alt={title}
            src={src}
            className="image"
            placeholder="blur"
            blurDataURL={thumb}
            layout="fill"
            className={`image-${loaded ? 'loading' : 'loaded'}`}
            onLoadingComplete={() => setLoaded(true)}
          />

          <div className="resolution">
            {`${image?.resolution?.height}`} &#10005;{' '}
            {`${image?.resolution?.width}`}
          </div>
        </Link>
      </AspectRatio>
      <div className="mobile-res">
        {`${image.resolution?.height}`} &#10005; {`${image.resolution?.width}`}
      </div>
    </div>
  );
};

export default ImageRenderer;
