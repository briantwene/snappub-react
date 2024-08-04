'use client';

import React, { useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';

import Link from 'next/link';
import Image from 'next/image';
import { Wallpaper } from '../models/reddit';

interface ImageRendererProps {
  image: Wallpaper;
}

export const ImageRenderer: React.FC<ImageRendererProps> = ({ image }) => {
  const { src, thumb, author, avatar, id, title, metadata } = image;
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
      <AspectRatio ratio={`${metadata?.width}/${metadata?.height}`}>
        <Link href={`/app/view/${id}`}>
          <Image
            alt={title}
            src={src}
            className="image"
            placeholder="blur"
            blurDataURL={thumb}
            layout="fill"
            // className={`image-${loaded ? 'loading' : 'loaded'}`}
            onLoadingComplete={() => setLoaded(true)}
          />

          <div className="resolution">
            {`${metadata?.height}`} &#10005; {`${metadata?.width}`}
          </div>
        </Link>
      </AspectRatio>
      <div className="mobile-res">
        {`${metadata?.height}`} &#10005; {`${metadata?.width}`}
      </div>
    </div>
  );
};

export default ImageRenderer;
