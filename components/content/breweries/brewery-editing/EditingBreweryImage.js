import React, { useContext, useState, useRef } from "react";
import "./editingBreweryImage.css";
import BreweryContext from "../../../../store/contexts/BreweryContext";

const EditingBreweryImage = (props) => {
  const breweryCtx = useContext(BreweryContext);
  const imageRef = useRef();

  const UpdateImageHandler = () => {
    if (imageRef.current.files[0]) {
      const imageTemp = imageRef.current.files[0];
      breweryCtx.breweryImageFromLocal = URL.createObjectURL(imageTemp);
      breweryCtx.breweryIsFromLocal = true;
      breweryCtx.tempImageObject = imageTemp;
    }

    props.onSave();
    //  window.location.reload(false);
  };

  return (
    <div className="brewery-image-Edit">
      <label htmlFor="image">upload a logo (currently not working)</label>
      <input
        type="file"
        id="image"
        name="brewery_logo"
        accept="image/*"
        ref={imageRef}
      />
      <button onClick={UpdateImageHandler}>Apply Changes</button>
    </div>
  );
};
export default EditingBreweryImage;
