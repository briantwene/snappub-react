import React, { useEffect, useState } from 'react';

import { getOneImage } from "../api/info"
import Image from "next/image";
import Link from 'next/link';

import axios from 'axios';
import numeral from 'numeral';
import fileDownload from 'js-file-download';

//will go to the view page

function View({ data }) {




  return (
    <>
      <div className="view-top">
        <div className="view-top-info">
          <div className="view-top-title">{data?.title}</div>
          <div className="view-top-poster">
            <Image width="32"
              height="32" alt="avatar" className="view-top-avatar" src={data?.avatar} />

            <div className="view-top-name">{data?.author}</div>
          </div>
        </div>

        <div className="view-top-download">
          <button className="download-btn">
            <Link href={`/api/download?title=${data.title}&url=${data.url}`}>
              Download
            </Link>
          </button>
          {/* <span className="view-download-dropdown download-link">
            <p>
              Avaliable Resoultions <RiIcons.RiArrowDownSLine />
            </p>
          </span> */}
        </div>
      </div>
      <div className="view-image">
        <Image alt={data?.title} class="image" fill src={data?.url} />
      </div>
      <div className="view-info">
        <div className="author-info infobox">
          <div className="author-info-inner">
            <div className="author-info-title">Author</div>
            <div className="author-info-content">
              <Image
                width="50"
                height="50"
                alt={data?.author}
                className="view-author-img"
                src={data?.avatar}
              />
              <div className="author-info-stats">
                <span className="author-name">{`u/${data?.author}`}</span>
                <span className="author-karma">
                  {numeral(data?.karma).format('0.0a')} Karma
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="image-info infobox">
          <div className="author-info-inner">
            <div className="image-info-title">
              <span className="author-info-title">Image Info</span>
              <span>{data?.title}</span>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>Subreddit</td>
                  <td>{data?.subreddit}</td>
                </tr>
                <tr>
                  <td>Date Posted</td>
                  <td> Sunday 24 JUN</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{data?.size}</td>
                </tr>
                <tr>
                  <td>Resoultion</td>
                  <td>
                    {data?.originRes.width} &#215; {data?.originRes.height}
                  </td>
                </tr>
                <tr>
                  <td>Karma</td>
                  <td>{numeral(data?.rating).format('0,0')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { id } = query;
  const data = await getOneImage(id);

  return {
    props: {
      data,
    },
  };
}

export default View;


