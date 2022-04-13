import { useState, useEffect } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import "../Css/App.css";
import { ReactComponent as Logo } from "../components/loading.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import Filter from "../components/Filter";

function Home() {
  //declaring state for the APP
  const [pics, updatePics] = useState([]);
  const [loaded, setIsLoaded] = useState(false);

  const fetchImages = () => {
    axios
      .get("/api/images")
      .then(({ data }) => {
        updatePics(data);
        setIsLoaded(true);
      })
      .catch((e) => console.log("there was error", e));
  };

  useEffect(() => {
    fetchImages();
  }, []);
  console.log(pics);

  //will go to the view page
  const downloadRequest = (url, title) => {
    axios
      .get("/download/image", {
        params: { url: url, title: title },
        responseType: "blob"
      })
      .then(({ data, headers }) => {
        console.log(data);
        fileDownload(data, headers.imgfilename);
      });
  };

  //function for creating images
  const renderedImages = () => {
    return pics.map((image, key) => (
      <div className="grid" key={key}>
        <img
          src={image.pic}
          key={key}
          author={image.author}
          alt=""
          loading="lazy"
        />
        <div className="resolution">
          {`${image.originRes.height}`} &#10005; {`${image.originRes.width}`}
        </div>
      </div>
    ));
  };

  return (
    <>
      <Filter />
      <InfiniteScroll
        style={{ display: "flex", alignItems: "center" }}
        dataLength={pics.length}
        hasMore={false}
        loader={<Logo />}
      >
        <div className="photo_grid">{pics ? renderedImages() : ""}</div>
      </InfiniteScroll>
    </>
  );
}

export default Home;
