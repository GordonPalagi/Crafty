import { useEffect, useState } from "react";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import "./singleBeer.css";
import breweryImage from "../../assets/brewery.jpg";
import StarRating from "../../components/Ui/Tastingjournal/Stars.js";
import React from "react";
import axios from "axios";
import { baseUrl } from "../../shared/base-url";
import unavailable from "../../assets/unavailable.png";
const SingleBeer = (props) => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const breweryId = location.pathname.substring(11, location.pathname.length);
  // const GetBeerDescription = () => {
  //   const [history, setHistory] = useState();
  //   const {description} = useParams();
  //   useEffect(() => {
  //     axios.get(baseUrl + )
  //   },[])
  // }

  const [beer, setBeer] = useState("");
  useEffect(() => {
    axios.get(baseUrl + "beer/" + breweryId).then((res) => {
      if (res) {
        setBeer(res.data);
      }
    });
  }, [setBeer]);

  return (
    <div className="fullpage">
      <div className="flexbeer-con">
        <figure className="beerTitleCard">
          <div>
            <img
              className="beerPhoto"
              src={beer.imageUrl ? beer.imageUrl : unavailable}
            />
            {/* {data.beer_logo_url} */}
            <div className="beerName-con">
              <figcaption className="beerName">{beer.name}</figcaption>
              {/* {data.beer_name} */}
            </div>
          </div>
          <div className="history">{beer.description}</div>
        </figure>
      </div>
      <div className="beerAspects">
        <div>
          <span className="alc-content aspect-name-con">Alcohol Percent</span>
          <div className="vertical-line right"></div>
          <div className="sub-alc-content">{beer.alcoholPercent}%</div>
          {/* {data.beer_alcohol_percent} */}
        </div>
        <div>
          <span className="review-beer-name aspect-name-con">Review Beer</span>
          <div className="vertical-line mid"></div>
          <div className="tastingJournal">Tasting Journal</div>
        </div>
        <div>
          <span className="aspect-name-con">Brewery</span>
          {/* <div>{props.breweryId}</div> */}
          <div className="brewery-name-stat">
            <div>Brewery Name</div>
            <div></div>
            <img src={unavailable} className="breweryLogo" />
          </div>
          <div className="vertical-line left"></div>
        </div>
        <div>
          <span className="overAll aspect-name-con">Overall Rating</span>
          <div className="starRating">
            <StarRating />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBeer;
