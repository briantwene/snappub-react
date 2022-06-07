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

function Home() {
  //declare page state variable
  const [page, setPage] = useState(0);
  const [pageMap, setPageMap] = useState(new Map([[0, null]]));

  const lastPage = () => {
    if (page !== 0 && pageMap[page] === null) return true;
    return false;
  };
  const modMap = (value) => {
    //then add the next value
    if (!pageMap.has(page + 1))
      setPageMap((prevMap) => prevMap.set(page + 1, value));
  };
  const { isLoading, isError, data, error, isPreviousData, isFetching } =
    useQuery(
      ['pictures', pageMap.get(page)],
      () => fetchImages(pageMap.get(page)),
      {
        keepPreviousData: true,
      }
    );

  async function fetchImages(page = null) {
    return await axios
      .get(`/api/images`, { params: { page: page, subreddit: 'wallpaper' } })
      .then(({ data }) => {
        modMap(data.next);
        return data.data;
      })
      .catch((e) => console.log('there was error', e));
  }

  if (isLoading) {
    return <span>Loading....</span>;
  }

  if (isError) {
    return <span>{error.message}</span>;
  }

  return (
    <>
      <div className="gallery-title-overlay">
        <img src="/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpeg" alt="" />
        <section className="gallery-title">
          <div className="title">Wallpapers from Reddit</div>
        </section>
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
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          <RiIcons.RiArrowDropLeftLine />
        </button>
        <span>{page + 1}</span>
        <button
          className="pagination-btn"
          onClick={() => setPage((old) => old + 1)}
          disabled={lastPage()}
        >
          <RiIcons.RiArrowDropRightLine />
        </button>
      </div>
    </>
  );
}

export default Home;
