import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as RiIcons from 'react-icons/ri';
import axios from 'axios';
import numeral from 'numeral';
import fileDownload from 'js-file-download';

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

function View() {
  const location = useLocation();
  const imgData = location.state.data;
  const [author, setAuthor] = useState({});

  const fetchAuthor = () => {
    axios
      .get('/info/author', { params: { author: imgData.author } })
      .then(({ data }) => setAuthor(data));
  };

  useEffect(() => {
    fetchAuthor();
  }, []);
  return (
    <>
      <div className="view">
        <div className="view-body">
          <div className="view-top">
            <div className="view-left">
              <div className="view-title">{imgData.title}</div>
              <div className="view-author">
                <img className="view-author-img" src={author.avatar} />

                <div className="view-author-text">{imgData.author}</div>
              </div>
            </div>

            <div className="view-download">
              <a className="download download-link" href="#">
                Download
              </a>
              <span className="view-download-dropdown download-link">
                <p>
                  Avaliable Resoultions <RiIcons.RiArrowDownSLine />
                </p>
              </span>
            </div>
          </div>
          <div className="view-image">
            <div className="view-image-container">
              <img class="image" src={imgData.pic} />
            </div>
          </div>
          <div className="view-info">
            <div className="author-info infobox">
              <div className="author-info-inner">
                <div className="author-info-title">Author</div>
                <div className="author-info-content">
                  <img className="view-author-img" src={author.avatar} />
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
                        {imgData.originRes.width} &#215;{' '}
                        {imgData.originRes.height}
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
        </div>
      </div>
    </>
  );
}

export default View;
