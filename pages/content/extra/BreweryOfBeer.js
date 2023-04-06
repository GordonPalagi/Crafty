import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import unavailable from "../../../assets/unavailable.png";
import { baseUrl } from "../../../shared/base-url";
import BreweryContext from "../../../store/contexts/BreweryContext";
import "./beerShowPage.css";

const BreweryOfBeer = (props) => {
  const [brewery, setBrewery] = useState("");

  useEffect(() => {
    axios
      .get(baseUrl + "brewery/" + props.breweryId)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setBrewery(data);
      });
  }, [setBrewery]);

  return (
    <div className="brewery-from-beer">
      <h4>{brewery.name}</h4>
      <img src={brewery.imageUrl ? brewery.imageUrl : unavailable} />
    </div>
  );
};
export default BreweryOfBeer;
