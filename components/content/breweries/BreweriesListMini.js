import { useEffect, useRef, useState } from "react";
import unavailableImage from "../../../assets/unavailable.png";
import React from "react";
import "./breweriesListMini.css";
const BreweriesListMini = (props) => {
  const list = props.breweries;
  const handleHoverEffect = (event) => {
    const breweryId = event.target.id;
    props.onHoverBrewery(breweryId);
  };
  const handleClickEffect = (event) => {
    window.scrollTo(0, 0);
    const breweryId = event.target.id;
    props.onSelectBrewery(breweryId);
  };
  return (
    <>
      {list.map((e, i) => {
        if (props.breweryType === e.status) {
          return (
            <div
              key={i}
              id={i}
              onMouseEnter={handleHoverEffect}
              className="brewery-mini"
              onClick={handleClickEffect}
            >
              <img
                id={i}
                onMouseEnter={handleHoverEffect}
                src={e.imageUrl ? e.imageUrl : unavailableImage}
                onClick={handleClickEffect}
              />
              <div
                id={i}
                onMouseEnter={handleHoverEffect}
                className="brew-details"
                onClick={handleClickEffect}
              >
                <h4
                  id={i}
                  onClick={handleClickEffect}
                  onMouseEnter={handleHoverEffect}
                >
                  {`${e.name} ${e.id}`}{" "}
                </h4>
                <p
                  id={i}
                  onMouseEnter={handleHoverEffect}
                  onClick={handleClickEffect}
                >
                  Brewery history or descrition Brewery history or descrition
                  Brewery history or descrition Brewery history or
                  descrition....
                </p>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default BreweriesListMini;
