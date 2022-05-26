import { useState, useEffect } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import '../Css/App.css';
import { ReactComponent as Logo } from '../components/loading.svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import Filter from '../components/Filter';
import { Link } from 'react-router-dom';
import ImageRenderer from '../components/ImageRenderer';
import PhotoGrid from '../components/PhotoGrid';

function Home() {
  //declaring state for the APP
  const [pics, updatePics] = useState([]);
  const [loaded, setIsLoaded] = useState(false);

  const fetchImages = () => {
    axios
      .get('/api/images')
      .then(({ data }) => {
        updatePics(data);
        setIsLoaded(true);
      })
      .catch((e) => console.log('there was error', e));
  };

  useEffect(() => {
    fetchImages();
  }, []);
  console.log(pics);

  //will go to the view page
  const downloadRequest = (url, title) => {
    axios
      .get('/download/image', {
        params: { url: url, title: title },
        responseType: 'blob',
      })
      .then(({ data, headers }) => {
        console.log(data);
        fileDownload(data, headers.imgfilename);
      });
  };

  //function for creating images
  const renderedImages = () => {
    return pics.map((image, key) => (
      <PhotoGrid image={image} key={key} />
      // <div className="grid" key={key}>
      //   <Link to="/view" state={{ data: image }}>
      //     <img
      //       src={image.pic}
      //       key={key}
      //       author={image.author}
      //       alt=""
      //       loading="lazy"
      //     />
      //     <div className="resolution">
      //       {`${image.originRes.height}`} &#10005; {`${image.originRes.width}`}
      //     </div>
      //   </Link>
      // </div>
    ));
  };

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
        {pics &&
          pics.map((image, key) => <ImageRenderer image={image} key={key} />)}
        <div></div>
      </div>
    </>
  );
}

export default Home;
