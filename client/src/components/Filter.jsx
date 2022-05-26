// #Filename: Filter.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React from "react";
import Button from "./Button";

function Filter() {
  return (
    <div className="filter_container">
      <button className="filter-btn hot">Hot</button>
      <button className="filter-btn new">New</button>
      <button className="filter-btn top">Top</button>
    </div>
  );
}

export default Filter;
