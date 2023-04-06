import { useState } from "react";
import "./Tastingbar.css";
import React from "react"
const TastingBar = () => {
  const ratings = [
    { name: "sweet", rating: 5 },
    { name: "hoppy", rating: 2 },
    { name: "bitter", rating: 6 },
    { name: "fruity", rating: 6 },
    { name: "sour", rating: 6 },
  ];
  const labels = [0, 1, 2, 3, 4, 5, 6, 7];

  const handleCheck = (event) => {
    const tryme = event.target.value - 1;
    const parent = event.target.parentElement.parentElement.childNodes;
    const clickedBox = parent[tryme];

    for (let i = 0; i <= tryme; i++) {
      parent[i].lastChild.classList.add("checked");
    }
    const data = " rating" + (tryme + 1) + "of " + event.target.id;
    console.log(data);
  };

  const GraphBeta = (props) => {
    return (
      <>
        {ratings.map((element, index) => {
          return (
            <div className="flex-container">
              {labels.reverse().map((e, i) => {
                return (
                  <label
                    className={`container checkbox${i + 1}`}
                    name={`checkbox${i + 1}`}
                  >
                    <input
                      id={element.name}
                      value={i + 1}
                      onClick={handleCheck}
                      type="checkbox"
                    />
                    <span className="checkmark topBox"></span>
                  </label>
                );
              })}
              {element.name}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="textflex">
      <div className="text"> Intensity </div>
      <div className="flex">
        <GraphBeta />
      </div>
    </div>
  );
};
export default TastingBar;
