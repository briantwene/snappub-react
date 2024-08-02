import React from 'react';

function InfoBox(props) {
  return (
    <div className="box-info">
      <button className="close" onClick={() => props.close()}>
        X
      </button>
      <div className="img-title">
        <span className="name">{props.title}</span>
        <br />
        <span className="author">Posted By: u/{props.author}</span>
        <span className="originRes">
          Original Resolution:{' '}
          {`${props.originRes.width} X ${props.originRes.height}`}
        </span>
        <span>Rating: {props.rating} Upvotes</span>
      </div>
      {/* <div className="download">
        <form id="download-form" className="download-form">
          <DownloadOptions res={props.resolutions} />
        </form>
      </div> */}
      <div className="set-as">
        <div>
          <button
            className="set"
            onClick={() => {
              props.download(props.link, props.title);
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoBox;
