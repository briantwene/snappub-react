/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { AspectRatio } from 'react-aspect-ratio';

import Link from 'next/link';
import Image from 'next/image';
import { Wallpaper } from '../../models/reddit';
import styles from './ImageRenderer.module.scss';

interface ImageRendererProps {
  image: Wallpaper;
}

export const ImageRenderer: React.FC<ImageRendererProps> = ({ image }) => {
  const { src, thumb, author, avatar, id, title, metadata } = image;
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.masonry_item}>
      <div className={styles.author}>
        <Image
          alt={author}
          width="32"
          height="32"
          src={avatar.avatar}
          className={styles.avatar}
        />
        <span>u/{author}</span>
      </div>
      <Link href={`/app/view/${id}`}>
        <img alt={title} src={src} className={styles.image} loading="lazy" />
        <div className={styles.masonry_item_overlay}>
          <div className={styles.author_inner}>
            <Image
              alt={author}
              width="32"
              height="32"
              src={avatar.avatar}
              className={styles.avatar}
            />
            <span>u/{author}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

// export const ImageRenderer: React.FC<ImageRendererProps> = ({ image }) => {
//   const { src, thumb, author, avatar, id, title, metadata } = image;
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <div className={styles.img_info}>
//       <div className={styles.author}>
//         <Image
//           alt={author}
//           width="32"
//           height="32"
//           className={styles.avatar}
//           src={avatar}
//         />
//         <span>u/{author}</span>
//       </div>
//       <AspectRatio ratio={`${metadata?.width}/${metadata?.height}`}>
//         <Link href={`/app/view/${id}`}>
//           <img alt={title} src={src} className={styles.image} />

//           <div className="resolution">
//             {`${metadata?.height}`} &#10005; {`${metadata?.width}`}
//           </div>
//         </Link>
//       </AspectRatio>
//       <div className={styles.mobile_res}>
//         {`${metadata?.height}`} &#10005; {`${metadata?.width}`}
//       </div>
//     </div>
//   );
// };

// export default ImageRenderer;
