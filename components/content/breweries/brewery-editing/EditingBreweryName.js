import "./editingBreweryName.css";
import BreweryContext from "../../../../store/contexts/BreweryContext";
import React, { useContext, useState, useRef } from "react";

const EditingBreweryName = (props) => {
  const breweryCtx = useContext(BreweryContext);
  const nameRef = useRef();

  const saveName = () => {
    const newName = nameRef.current.value;
    if (breweryCtx.brewery.name !== newName && newName.length > 4) {
      breweryCtx.brewery.name = newName;
    }
    props.onSave();
  };
  return (
    <div className="brewery-name-editing">
      <h3>Enter a new Brewery name</h3>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          placeholder={breweryCtx.brewery.name}
          type="text"
          id="name"
          name="brewery_name"
          ref={nameRef}
        />
      </div>

      <button onClick={saveName}>Apply Changes</button>
    </div>
  );
};
export default EditingBreweryName;
