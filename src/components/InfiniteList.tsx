'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ImageRenderer from './ImageRenderer';
import { Wallpaper, WallpaperResponse } from '../models/Wallpaper';

const fetchImages = async () => {
  const pageParam = '';
  const subreddit = 'wallpapers';
  const res = await fetch(
    '/api/images?' +
      new URLSearchParams({
        page: pageParam,
        subreddit: subreddit,
      }).toString()
  );
  if (!res.ok) {
    console.log(res);
    throw new Error(`${res.status} - ${res.statusText}`);
  }
  const data: WallpaperResponse = await res.json();
  return data;
};

const InfiniteList: React.FC = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['wallpapers'],
    queryFn: fetchImages,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="photo_grid">
      {data?.images?.map((image: Wallpaper) => (
        <ImageRenderer image={image} key={image.id} />
      ))}
      <div></div>
    </div>
  );
};

export default InfiniteList;
