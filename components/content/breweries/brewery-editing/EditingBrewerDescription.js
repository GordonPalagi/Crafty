import "./editingBreweryName.css";
import BreweryContext from "../../../../store/contexts/BreweryContext";
import React, { useContext, useState, useRef } from "react";

const EditingBrewerDescription = (props) => {
  const breweryCtx = useContext(BreweryContext);
  const descriptionRef = useRef();

  const saveName = () => {
    const newDescription = descriptionRef.current.value;
    if (
      newDescription !== breweryCtx.brewery.description &&
      newDescription.length > 30
    ) {
      breweryCtx.brewery.description = newDescription;
    }
    props.onSave();
  };
  return (
    <div className="brewery-name-editing">
      <h3>Enter a new Brewery description</h3>
      <div>
        <label htmlFor="name"></label>
        <textarea
          style={{ height: "12rem", width: "90%" }}
          placeholder={breweryCtx.brewery.description}
          id="description"
          minLength={10}
          name="brewer_description"
          ref={descriptionRef}
        />
      </div>

      <button onClick={saveName}>Apply Changes</button>
    </div>
  );
};
export default EditingBrewerDescription;
