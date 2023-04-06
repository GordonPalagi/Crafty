import "./brewery.css";
import * as FaIcons from "react-icons/fa";
import React from "react";

const Brewery = (props) => {
  return (
    <div className="brewery">
      <div className="btn">
        <button>
          <span>
            <FaIcons.FaPlusSquare />
          </span>
          Add to favorites!
        </button>
        <button>
          <span>
            <FaIcons.FaShareSquare />
          </span>
          Share
        </button>
      </div>

      <img src={props.images} alt="brewery alt" />
      <div className="info">
        <h5>{props.name}</h5>
        <p>State:{props.state}</p>
      </div>
    </div>
  );
};

export default Brewery;
