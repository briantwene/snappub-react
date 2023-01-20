import axios from 'axios';


import ImageRenderer from '../components/ImageRenderer';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import * as RiIcons from 'react-icons/ri';
import { useSubredditStore } from '../utils/store';
import Image from 'next/image';
import { useInView } from "react-intersection-observer"
import { useEffect } from 'react';

function Home() {
  //declare page state variable
  const { ref, inView } = useInView()

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

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: [currentSubreddit],
    queryFn: fetchImages,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined
  });

  async function fetchImages({ pageParam }) {
    console.log("pageParam", pageParam)
    const { data } = await axios.get(`/api/images`, {
      params: { page: pageParam, subreddit: currentSubreddit },
    });
    if (!data) throw new Error('there was an error in fetching image data');
    return data;
  }



  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <>
      <div
        className={`gallery-title-overlay${subredditBanner ? '' : '-noBanner'}`}
      >
        {subredditBanner && <Image src={subredditBanner} priority alt="" fill className="image-overlay" />}


        <h1 className={`title${subredditBanner ? '' : '-noBanner'}`}>
          r/
          {currentSubreddit?.toLowerCase().endsWith('porn')
            ? currentSubreddit?.toLowerCase().replace('porn', '****')
            : currentSubreddit}
        </h1>
      </div>
      {/* <Filter /> */}
      <div className="photo_grid">
        {status === "loading"
          ? 'LOADING....'
          : status === "error"
            ? `Error: ${error.message}`

            : data.pages.map((group, key) => (
              <>
                {group.images?.map((image) => (
                  <ImageRenderer image={image} key={key} />)
                )}
              </>
            )

            )}
        < div  >
        </div>


      </div>
      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load Newer'
              : 'Nothing more to load'}
        </button></div>
      {/* <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={decrementPage}
          disabled={page === 0}
        >
          <RiIcons.RiArrowDropLeftLine />
        </button>
        <span>{page + 1}</span>
        <button
          className="pagination-btn"
          onClick={incrementPage}
          disabled={lastPage()}
        >
          <RiIcons.RiArrowDropRightLine />
        </button>
      </div> */}
    </>
  );
}

export default Home;
