import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import unavailable from "../../../assets/unavailable.png";
import { baseUrl } from "../../../shared/base-url";
import "./beerShowPage.css";
import RatingBeer from "./RatingBeer";
import BreweryOfBeer from "./BreweryOfBeer";
import BreweryContext from "../../../store/contexts/BreweryContext";
const BeerShowPage = (props) => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const beerId = location.pathname.substring(11, location.pathname.length);
  const [beer, setBeer] = useState("");
  useEffect(() => {
    axios.get(baseUrl + "beer/" + beerId).then((res) => {
      if (res) {
        setBeer(res.data);
      }
    });
  }, [setBeer]);

  return (
    <section className="beer-show-page">
      <div className="beer-show-top">
        <div className="beer-show-left">
          <img
            className="beer-show-page_image"
            src={beer.imageUrl ? beer.imageUrl : unavailable}
          ></img>
        </div>

        <div className="beer-show-right">
          <div className="beer-show-page__details">
            <h2 className="beer-show-page_h2">{beer.name}</h2>
            <h3>Alcohol level:</h3>
            <p>{beer.alcoholPercent ? beer.alcoholPercent : "#"}</p>
            <h3>Overall Rating</h3>
            <p>
              <RatingBeer beerId={beer.id} />
            </p>
          </div>
        </div>
      </div>

      <div className="beer-show-bottom">
        <h3>description</h3>
        <p>{beer.description}</p>
        <div className="beer-show-page__brewery">
          <h3>brewery name: {beer.breweryId}</h3>
          <div>
            <BreweryOfBeer breweryId={beer.breweryId} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default BeerShowPage;
