import { useState } from "react";
import BreweriesList from "../../../components/content/breweries/BreweriesList";
import "./brewerPage.css";
import React from "react";
import Dummy_breweries from "../../../shared/BreweriesListArray";
import NewBrewery from "../../../components/content/breweries/NewBrewery";
import NewBeer from "../../../components/content/beers/NewBeer";
import BreweriesManagement from "../../../components/content/breweries/BreweriesManagement";
import BreweryProviver from "../../../store/contexts/BreweryProvider";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const brewerOptions = [
  {
    option: "Breweries Management",
    component: <BreweriesManagement breweries={Dummy_breweries} />,
  },
  { option: "Users Management", component: "in progress" },
];
const BrewerPage = () => {
  const [activeOption, setActiveOption] = useState(brewerOptions[0]);

  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="brewery-admin">
      <div className="brewery-into">
        <h2>Hello MR "{currentUser.user.username}"</h2>
      </div>
      {brewerOptions.map((e, i) => {
        return (
          <button
            key={i}
            onClick={() => {
              setActiveOption(e);
            }}
            className={` item ${
              activeOption.option === e.option ? "clicked" : "unclicked"
            }`}
          >
            {e.option}
          </button>
        );
      })}
      <BreweryProviver>
        <div>{activeOption.component}</div>
      </BreweryProviver>
    </section>
  );
};

export default BrewerPage;
