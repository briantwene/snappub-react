import axios from 'axios';

import ImageRenderer from '../components/ImageRenderer';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import * as RiIcons from 'react-icons/ri';
import { useSubredditStore } from '../utils/store';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import React, { useEffect } from 'react';

function Home() {
  //declare page state variable
  const { ref, inView } = useInView();

  const currentSubreddit = useSubredditStore(
    (state) => state?.current_subreddit
  );
  const page = useSubredditStore((state) => state?.page);
  const pageMap = useSubredditStore((state) => state?.pageMap);
  const incrementPage = useSubredditStore((state) => state?.incrementPage);
  const decrementPage = useSubredditStore((state) => state?.decrementPage);
  const updatePageMap = useSubredditStore((state) => state?.updatePageMap);
  const subredditBanner = useSubredditStore((state) => state?.subredditBanner);

  // const lastPage = () => {
  //   if (page !== 0 && pageMap[page] === null) return true;
  //   return false;
  // };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [currentSubreddit],
    queryFn: fetchImages,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  });

  async function fetchImages({ pageParam }) {
    console.log('pageParam', pageParam);
    const { data } = await axios.get(`/api/images`, {
      params: { page: pageParam, subreddit: currentSubreddit },
    });
    if (!data) throw new Error('there was an error in fetching image data');
    return data;
  }

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

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
        {status === 'loading'
          ? 'LOADING....'
          : status === 'error'
            ? `Error: ${error.message}`
            : data.pages.map((group, key) => (

              <React.Fragment key={key}>

                {group.images?.map((image) => (
                  <ImageRenderer image={image} key={image.id} />
                ))}

              </React.Fragment>
            ))}
        <div></div>
      </div>
      <div ref={ref} className={!hasNextPage ? 'hidden' : ''}>
        {isFetchingNextPage ? 'Loading more...' : ''}
      </div>

    </>
  );
}

export default Home;
