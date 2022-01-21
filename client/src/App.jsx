// #Filename: App.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React, { useState, useEffect } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import "./Css/App.css";
import Header from "./components/Header";
import Filter from "./components/Filter";
import PhotoGrid from "./components/PhotoGrid";
import Footer from "./components/Footer";
import Lightbox from "./components/lightbox";
import Loading from "./components/loading";

function App() {
  //declaring state for the APP
  const [pics, updatePics] = useState(0);

  useEffect(() => {
    axios
      .get("/api/images")
      .then(({ data }) =>
        updatePics({
          images: data,
          popupImage: "",
          popupAuthor: "",
          popupImageTitle: "",
          popupOriginRes: null,
          rating: null,
          showLightbox: false
        })
      )
      .catch((e) => console.log("there was error"));
  }, []);
  console.log(pics);

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

  const handleLightbox = (url, author, title, originRes, rating) => {
    //wouldnt let me just inverse the booleanm
    //so had to destructure the property and the object itself
    updatePics(({ showLightbox, ...previousState }) => {
      return {
        ...previousState,
        popupImage: url,
        popupAuthor: author,
        popupImageTitle: title,
        popupOriginRes: originRes,
        rating: rating,
        showLightbox: !showLightbox
      };
    });
  };

  return (
    <>
      <div className="gallery">
        <Header />
        <Filter />
        {pics ? (
          <PhotoGrid images={pics.images} open={handleLightbox} />
        ) : (
          <Loading />
        )}

        <Footer />
      </div>
      {pics.showLightbox ? (
        <div className="lightbox-container">
          <Lightbox
            popupImage={pics.popupImage}
            popupAuthor={pics.popupAuthor}
            popupTitle={pics.popupImageTitle}
            originRes={pics.popupOriginRes}
            rating={pics.rating}
            closePopup={handleLightbox}
            download={downloadRequest}
          />
        </div>
      ) : null}
    </>
  );
}

export default App;
