'use client';
import axios from 'axios';

import AccessDenied from '../../components/AccessDenied';
import { useSession } from 'next-auth/react';

import ImageRenderer from '../../components/ImageRenderer';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import * as RiIcons from 'react-icons/ri';
import { useAppStore } from '../../utils/store';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import InfiniteList from '../../components/InfiniteList';
// import React, { useEffect } from 'react';

function Home() {
  // //declare page state variable
  const { ref, inView } = useInView();
  // const { session, loading } = useSession();

  const currentSubreddit = useAppStore((state) => state?.current_subreddit);
  const page = useAppStore((state) => state?.page);
  const pageMap = useAppStore((state) => state?.pageMap);
  const incrementPage = useAppStore((state) => state?.incrementPage);
  const decrementPage = useAppStore((state) => state?.decrementPage);
  const updatePageMap = useAppStore((state) => state?.updatePageMap);
  const subredditBanner = useAppStore((state) => state?.subredditBanner);

  // if (typeof window !== 'undefined' && loading) return null;

  // if (!session) {
  //   return <AccessDenied />;
  // }

  // // const lastPage = () => {
  // //   if (page !== 0 && pageMap[page] === null) return true;
  // //   return false;
  // // };

  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery({
  //   queryKey: [currentSubreddit],
  //   queryFn: fetchImages,
  //   getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  // });

  // async function fetchImages({ pageParam }) {
  //   console.log('pageParam', pageParam);
  //   const { data } = await axios.get(`/api/images`, {
  //     params: { page: pageParam, subreddit: currentSubreddit },
  //   });
  //   if (!data) throw new Error('there was an error in fetching image data');
  //   return data;
  // }

  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage();
  //   }
  // }, [inView]);

  const { data: session } = useSession();

  if (!session) {
    return <AccessDenied />;
  }

  return (
    <>
      <div
        className={`gallery-title-overlay${subredditBanner ? '' : '-noBanner'}`}
      >
        {subredditBanner && (
          <Image
            src={subredditBanner}
            priority
            alt=""
            fill
            className="image-overlay"
          />
        )}

        <h1 className={`title${subredditBanner ? '' : '-noBanner'}`}>
          r/
          {currentSubreddit?.toLowerCase().endsWith('porn')
            ? currentSubreddit?.toLowerCase().replace('porn', '****')
            : currentSubreddit}
        </h1>
      </div>
      {/* <Filter /> */}
      <div className="photo_grid">
        <InfiniteList />
        <div></div>
      </div>
      {/* <div ref={ref} className={!hasNextPage ? 'hidden' : ''}>
        {isFetchingNextPage ? 'Loading more...' : ''}
      </div> */}
    </>
  );
}

export default Home;
