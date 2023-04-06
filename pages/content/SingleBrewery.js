import breweryImage from "../../assets/brewery.jpg";
import "./singleBrewery.css";
import Events from "../../components/Ui/Events";
import Comments from "../../components/Ui/Comments";
import News from "../../components/Ui/News";
import unavailableImg from "../../assets/unavailable.png";
import * as FaIcons from "react-icons/fa";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  useParams,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import BeersList from "../../components/content/beers/BeersList";
import DummyBeers from "../../shared/BeersListArray";
import Beers from "./Beers";
import { baseUrl } from "../../shared/base-url";

import axios from "axios";
import BreweryBeerShow from "./extra/BreweryBeerShow";
const SingleBrewery = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const breweryId = location.pathname.substring(18, location.pathname.length);
  const [breweryData, setBreweryData] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl + "brewery/" + breweryId)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setBreweryData(data);
      });
  }, [setBreweryData]);

  const refComp = useRef();

  const elements = [
    {
      element: "list of beers",
      component: (
        <BreweryBeerShow breweryId={breweryData.id} fromBrewery={true} />
      ),
    },
    {
      element: "Events",
      component: <News breweryId={breweryData.id} />,
    },
  ];

  const [activeElement, setActiveElement] = useState({
    comp: "",
    e: "",
  });

  return (
    <div className="brewery-page">
      <div className="info">
        <h2>{breweryData.name}</h2>
        <div className="brew">
          <div className="info-left">
            <img
              src={breweryData.imageUrl ? breweryData.imageUrl : unavailableImg}
            ></img>
          </div>

          <div className="info-right">
            <h5>
              <FaIcons.FaRegCalendarAlt />
              Working days/hours:
            </h5>
            <p>{breweryData.hours}</p>
            <h5>
              <FaIcons.FaMap />
              Address:
            </h5>
            <p>{breweryData.address}</p>
            <h5>
              <FaIcons.FaMap />
              Email:
            </h5>
            <p>{breweryData.email}</p>
            <h5>
              <FaIcons.FaHeart /> Rating
            </h5>
            <p>4.5/5</p>
          </div>
        </div>
      </div>

      <div className="details">
        <div className="brewery-history">{breweryData.description}</div>

        {elements.map((component, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setActiveElement({
                  comp: component.component,
                  e: component.element,
                });
                navigate({
                  pathname: location.pathname,
                  search: "?element=" + component.element.replace(/ /g, "-"),
                });
              }}
              className={` item ${
                activeElement.e === component.element ? "clicked" : "unclicked"
              }`}
            >
              {component.element}
            </button>
          );
        })}
        <p ref={refComp}></p>
        {activeElement.comp}
      </div>
    </div>
  );
};

export default SingleBrewery;
