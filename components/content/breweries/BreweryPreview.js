import "./brewerypreview.css";
import React, { useContext, useState } from "react";
import * as FaIcons from "react-icons/fa";
import BreweryContext from "../../../store/contexts/BreweryContext";
import unavailableImg from "../../../assets/unavailable.png";

const BreweryPreview = (props) => {
  const breweryCtx = useContext(BreweryContext);

  return (
    <section className="brewery-preview">
      <h3>
        {breweryCtx.brewery.name} {breweryCtx.brewery.id}
      </h3>
      <div className="brewery-preview-image">
        <img
          src={
            breweryCtx.brewery.imageUrl
              ? breweryCtx.brewery.imageUrl
              : unavailableImg
          }
        />
      </div>
      <h4>Brewery history </h4>
      <p>
        {breweryCtx.brewery.description.substring(0, 200)}
        {"..."}
      </p>
      <h4>Brewery Details:</h4>
      <p>Hours/Days: Monday- Friday : 8am - 6pm</p>
      <p>Address: Kansas, 15561 w 155rd st</p>
      <p>Email: khkh @ skaj . com</p>
      <p>Overall Rating: 4/5 </p>
    </section>
  );
};
export default BreweryPreview;
