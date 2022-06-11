import { useState, useEffect } from 'react';
import axios from 'axios';

import '../Css/App.css';
import { ReactComponent as Logo } from '../components/loading.svg';
import Filter from '../components/Filter';
import { Link } from 'react-router-dom';
import ImageRenderer from '../components/ImageRenderer';
import PhotoGrid from '../components/PhotoGrid';
import { useQuery } from 'react-query';
import * as RiIcons from 'react-icons/ri';
import { useSubredditStore } from '../utils/store';

function Home() {
  //declare page state variable

  const currentSubreddit = useSubredditStore(
    (state) => state.current_subreddit
  );
  const page = useSubredditStore((state) => state.page);
  const pageMap = useSubredditStore((state) => state.pageMap);
  const incrementPage = useSubredditStore((state) => state.incrementPage);
  const decrementPage = useSubredditStore((state) => state.decrementPage);
  const updatePageMap = useSubredditStore((state) => state.updatePageMap);

  const lastPage = () => {
    if (page !== 0 && pageMap[page] === null) return true;
    return false;
  };

  const { isLoading, isError, data, error, isPreviousData, isFetching } =
    useQuery(
      [currentSubreddit, pageMap.get(page)],
      () => fetchImages(pageMap.get(page), currentSubreddit),
      {
        keepPreviousData: true,
      }
    );

  async function fetchImages(page = null, subreddit) {
    const { data } = await axios.get(`/api/images`, {
      params: { page: page, subreddit: subreddit },
    });

    if (!data) {
      throw new Error('there was an error in fetching image data');
    }

    updatePageMap(data.next);
    return data.data;
  }

  return (
    <>
      <div className="gallery-title-overlay">
        <h1 className="title">r/{currentSubreddit}</h1>
      </div>
      {/* <Filter /> */}
      <div className="photo_grid">
        {isLoading || isFetching
          ? 'LOADING....'
          : isError
          ? `Error: ${error.message}`
          : data.map((image, key) => <ImageRenderer image={image} key={key} />)}
        <div></div>
      </div>
      <div className="pagination-container">
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
      </div>
    </>
  );
}

export default Home;
