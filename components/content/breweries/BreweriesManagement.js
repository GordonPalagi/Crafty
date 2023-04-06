import { useContext, useEffect, useState } from "react";
import React from "react";
import NewBrewery from "../../../components/content/breweries/NewBrewery";
import "../../../pages/content/admin-brewer/brewerPage.css";
import BreweriesListMini from "./BreweriesListMini";
import BreweryPreview from "./BreweryPreview";
import { baseUrl } from "../../../shared/base-url";
import axios from "axios";
import * as FaIcons from "react-icons/fa";

import "./breweriesManagement.css";
import BreweryProviver from "../../../store/contexts/BreweryProvider";
import BreweryContext from "../../../store/contexts/BreweryContext";
import BreweryEditingPage from "./brewery-editing/BreweryEditingPage";
import { useSelector } from "react-redux";
const BreweriesManagementOptions = [
  { option: "Add New Brewery", component: <NewBrewery /> },
];

const BreweriesManagement = (props) => {
  const [listOfBreweries, setListOfBreweries] = useState([]);
  const [listOfBreweriesType, setListOfBreweriesType] = useState("active");
  const breweryCtx = useContext(BreweryContext);
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser.user.authorities[0].name);
  ///const listOfBreweries = props.breweries;
  const [showPreview, setShowPreview] = useState(false);
  const [itemPreview, setItemPreview] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedBrewery, setSelectedBrewery] = useState("");
  useEffect(() => {
    axios
      .get(
        baseUrl +
          `${
            currentUser.user.authorities[0].name !== "ROLE_ADMIN"
              ? `brewery/brewer/${currentUser.user.id}`
              : `brewery/all`
          }`
      )
      .then((res) => {
        setListOfBreweries(res.data);
      });
    console.log(listOfBreweries);
    window.scrollTo(0, 0);
  }, [setListOfBreweries, selectMode, listOfBreweriesType, currentUser]);

  const previewBrewery = (breweryId) => {
    if (breweryId) {
      setShowPreview(true);
      setItemPreview(listOfBreweries[breweryId]);
      const brew = listOfBreweries[breweryId];
      breweryCtx.setBrewery(brew);
    }
  };
  const handleBrewerySelection = (breweryId) => {
    if (breweryId) {
      setSelectMode(true);
      const brew = listOfBreweries[breweryId];
      breweryCtx.setBrewery(brew);
    }
  };
  const handleBackToMain = () => {
    setSelectMode(false);
    setShowPreview(false);
  };
  console.log(listOfBreweriesType + "");
  return (
    <section className="brewery-management">
      {selectMode && <BreweryEditingPage onBack={handleBackToMain} />}

      {!selectMode && (
        <div className="brewery-left-management">
          <div className="brewery-types-buttons">
            <button
              className={
                listOfBreweriesType === "active"
                  ? "brewery-types-buttons-clicked"
                  : "brewery-types-buttons-unClicked"
              }
              onClick={() => setListOfBreweriesType("active")}
            >
              <FaIcons.FaHotjar />
              active
            </button>
            <button
              className={
                listOfBreweriesType === "inactive"
                  ? "brewery-types-buttons-clicked"
                  : "brewery-types-buttons-unClicked"
              }
              onClick={() => setListOfBreweriesType("inactive")}
            >
              <FaIcons.FaBan />
              InActive
            </button>
            {currentUser.user.authorities[0].name === "ROLE_ADMIN" && (
              <button
                className={
                  listOfBreweriesType === "pending"
                    ? "brewery-types-buttons-clicked"
                    : "brewery-types-buttons-unClicked"
                }
                onClick={() => setListOfBreweriesType("pending")}
              >
                <FaIcons.FaClock />
                Pending
              </button>
            )}
            {currentUser.user.authorities[0].name === "ROLE_ADMIN" && (
              <button
                className={
                  listOfBreweriesType === "locked"
                    ? "brewery-types-buttons-clicked"
                    : "brewery-types-buttons-unClicked"
                }
                onClick={() => setListOfBreweriesType("locked")}
              >
                <FaIcons.FaLock />
                Locked
              </button>
            )}
            <p>Choose a brewery to edit or remove</p>
          </div>

          <BreweriesListMini
            breweryType={listOfBreweriesType}
            breweries={listOfBreweries}
            onHoverBrewery={previewBrewery}
            onSelectBrewery={handleBrewerySelection}
          />
        </div>
      )}
      {!selectMode && showPreview ? (
        <div className="brewery-right-management">
          <BreweryPreview />
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default BreweriesManagement;
