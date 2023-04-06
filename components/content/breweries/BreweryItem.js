import "./breweryItem.css";
import * as FaIcons from "react-icons/fa";
import React from "react";
import unavailableImg from "../../../assets/unavailable.png";

const Brewery = (props) => {
  console.log(props.images);
  return (
    <div className="brewery">
      <div className="btn">
        <button>
          <span>
            <FaIcons.FaPlusSquare />
          </span>
          Favorite
        </button>
        <button>
          <span>
            <FaIcons.FaShareSquare />
          </span>
          Share
        </button>
      </div>

      <img
        src={props.images ? props.images : unavailableImg}
        alt="brewery alt"
      />
      <div className="info">
        <h5>{props.name}</h5>
        <p>Address:{props.state}</p>
      </div>
    </div>
  );
};

export default Brewery;
