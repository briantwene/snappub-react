import React from "react";

function sortAspectRatios(aspectRatio) {
  return function (element) {
    if (element.aspect === aspectRatio) {
      return element;
    }
  };
}

function createInputs(aspectArray) {
  return aspectArray.map((res) => (
    <div className="res">
      <label>
        <input type="radio" />
        {`${res.width} X ${res.height} ${
          res.hasOwnProperty("original") ? "(Original)" : ""
        }`}
      </label>
    </div>
  ));
}

function DownloadOptions(props) {
  const twentyOneNine = props.res.filter(sortAspectRatios("21:9"));
  const twentyOneNineArray = createInputs(twentyOneNine);
  const sixteenNine = props.res.filter(sortAspectRatios("16:9"));
  const sixteenNineArray = createInputs(sixteenNine);
  const sixteenTen = props.res.filter(sortAspectRatios("16:10"));
  const sixteenTenArray = createInputs(sixteenTen);
  const fourThree = props.res.filter(sortAspectRatios("4:3"));
  const fourThreeArray = createInputs(fourThree);

  console.log(twentyOneNineArray);
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
        {" "}
        {sixteenNineArray.length != 0 ? (
          sixteenNineArray
        ) : (
          <div className="res">Not Avaliable</div>
        )}
      </div>
      <label className="aspect">16:10</label>
      <div className="aspect-container">
        {" "}
        {sixteenTenArray.length != 0 ? (
          sixteenTenArray
        ) : (
          <div className="res">Not Avaliable</div>
        )}
      </div>
      <label className="aspect">4:3</label>
      <div className="aspect-container">
        {" "}
        {fourThreeArray.length != 0 ? (
          fourThreeArray
        ) : (
          <div className="res">Not Avaliable</div>
        )}
      </div>
    </>
  );
}

export default DownloadOptions;
