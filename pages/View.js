import React, { useEffect, useState } from 'react';


import axios from 'axios';
import numeral from 'numeral';
import fileDownload from 'js-file-download';

//will go to the view page

function View() {
  const location = useLocation();
  const imgData = location.state.data;
  const [author, setAuthor] = useState({});

  const fetchAuthor = () => {
    axios
      .get('/info/author', { params: { author: imgData.author } })
      .then(({ data }) => setAuthor(data));
  };

  const downloadRequest = () => {
    axios
      .get('/download/image', {
        params: { url: imgData.pic, title: imgData.title },
        responseType: 'blob',
      })
      .then(({ data, headers }) => {
        fileDownload(data, headers.imgfilename);
      });
  };

  useEffect(() => {
    fetchAuthor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="view-top">
        <div className="view-top-info">
          <div className="view-top-title">{imgData.title}</div>
          <div className="view-top-poster">
            <img alt="avatar" className="view-top-avatar" src={author.avatar} />

            <div className="view-top-name">{imgData.author}</div>
          </div>
        </div>

        <div className="view-top-download">
          <button className="download-btn" onClick={downloadRequest}>
            Download
          </button>
          {/* <span className="view-download-dropdown download-link">
            <p>
              Avaliable Resoultions <RiIcons.RiArrowDownSLine />
            </p>
          </span> */}
        </div>
      </div>
      <div className="view-image">
        <img alt={imgData.title} class="image" src={imgData.pic} />
      </div>
      <div className="view-info">
        <div className="author-info infobox">
          <div className="author-info-inner">
            <div className="author-info-title">Author</div>
            <div className="author-info-content">
              <img
                alt={imgData.author}
                className="view-author-img"
                src={author.avatar}
              />
              <div className="author-info-stats">
                <span className="author-name">{`u/${author.name}`}</span>
                <span className="author-karma">
                  {numeral(author.karma).format('0.0a')} Karma
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="image-info infobox">
          <div className="author-info-inner">
            <div className="image-info-title">
              <span className="author-info-title">Image Info</span>
              <span>{imgData.title}</span>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>Date Posted</td>
                  <td> Sunday 24 JUN</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{imgData.size}</td>
                </tr>
                <tr>
                  <td>Resoultion</td>
                  <td>
                    {imgData.originRes.width} &#215; {imgData.originRes.height}
                  </td>
                </tr>
                <tr>
                  <td>Karma</td>
                  <td>{numeral(imgData.rating).format('0,0')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
