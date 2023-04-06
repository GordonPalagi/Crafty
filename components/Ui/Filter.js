import { useEffect, useState } from "react";
import "./filter.css";
import React from "react"

const Filter = (props) => {
  const [selected, setSelected] = useState("Choose an option");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    const arr = props.options;
    const index = arr.findIndex((obj) => {
      return obj.optionName === event.target.value;
    });

    props.onFilterChange(index);
  };

  return (
    <div className="filter">
      <p>Sort items by: </p>
      <div className="select" tabIndex="1">
        <select value={selected} onChange={handleChange}>
          {props.options.map((item, index) => {
            return (
              <option key={index} value={item.optionName}>
                {item.optionName}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
export default Filter;
