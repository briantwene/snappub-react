// #Filename: Filter.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React from "react";
import Button from "./Button";

function Filter() {
  return (
    <div className="filter_container">
      <button className="filter-btn">Hot</button>
      <button className="filter-btn">New</button>
      <button className="filter-btn">Top</button>
    </div>
  );
}

export default Filter;
