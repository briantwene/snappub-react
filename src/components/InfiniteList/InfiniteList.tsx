'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ImageRenderer } from '../ImageRenderer/ImageRenderer';
import { SubredditResponseModel, Wallpaper } from '../../models/reddit';
import { useAppStore } from '../../utils/store';
import styles from './InfiniteList.module.scss';

const fetchImages = async (subreddit: string) => {
  const pageParam = '';

  const res = await fetch(
    '/api/images?' +
      new URLSearchParams({
        page: pageParam,
        subreddit: subreddit,
      }).toString()
  );
  if (!res.ok) {
    throw new Error(`${res.status} - ${res.statusText}`);
  }
  const data: SubredditResponseModel = await res.json();
  return data;
};

const InfiniteList: React.FC = () => {
  const subreddit = useAppStore((state) => state?.current_subreddit);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['wallpapers', subreddit],
    queryFn: () => fetchImages(subreddit),
    enabled: !!subreddit,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.masonry_grid}>
      {data?.posts?.map((image: Wallpaper) => (
        <ImageRenderer image={image} key={image.id} />
      ))}
      <div></div>
    </div>
  );
};

export default InfiniteList;
