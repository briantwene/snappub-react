// TODO: Change  when component is going to be used, its bad
// @ts-nocheck
import React from 'react';
import { decode } from 'html-entities';

function sortAspectRatios(aspectRatio) {
  return function (element) {
    if (element.aspect === aspectRatio) {
      return element;
    }
  };
}

type aspectRatio = {};

function createInputs(aspectArray) {
  return aspectArray.map((res, index) => (
    <div className="res" key={index}>
      <label>
        <input type="radio" />
        {`${res.width} X ${res.height} ${
          res.hasOwnProperty('original') ? '(Original)' : ''
        }`}
      </label>
    </div>
  ));
}


interface DownlaodOptionsProps {
  res: any;
}

export const DownloadOptions: React.FC<DownlaodOptionsProps> = ({ res }) => {
  const twentyOneNine = res.filter(sortAspectRatios('21:9'));
  const twentyOneNineArray = createInputs(twentyOneNine);
  const sixteenNine = res.filter(sortAspectRatios('16:9'));
  const sixteenNineArray = createInputs(sixteenNine);
  const sixteenTen = res.filter(sortAspectRatios('16:10'));
  const sixteenTenArray = createInputs(sixteenTen);
  const fourThree = res.filter(sortAspectRatios('4:3'));
  const fourThreeArray = createInputs(fourThree);

  return (
    <>
      <label className="aspect">21:9</label>
      <div className="aspect-container">
        {twentyOneNineArray.length != 0 ? (
          twentyOneNineArray
        ) : (
          <div className="res">Not Avaliable</div>
        )}
      </div>
      <label className="aspect">16:9</label>
      <div className="aspect-container">
        {' '}
        {sixteenNineArray.length != 0 ? (
          sixteenNineArray
        ) : (
          <div className="res">Not Avaliable</div>
        )}
      </div>
      <label className="aspect">16:10</label>
      <div className="aspect-container">
        {' '}
        {sixteenTenArray.length != 0 ? (
          sixteenTenArray
        ) : (
          <div className="res">Not Avaliable</div>
        )}
      </div>
      <label className="aspect">4:3</label>
      <div className="aspect-container">
        {' '}
        {fourThreeArray.length != 0 ? (
          fourThreeArray
        ) : (
          <div className="res">Not Avaliable</div>
        )}
      </div>
    </>
  );
};
