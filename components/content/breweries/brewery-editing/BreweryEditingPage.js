import "./breweryEditPage.css";
import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import EditingPopup from "../EditingPoopUp";
import BreweryContext from "../../../../store/contexts/BreweryContext";
import EditingBreweryImage from "./EditingBreweryImage";
import EditingBreweryName from "./EditingBreweryName";
import EditingBrewerDescription from "./EditingBrewerDescription";
import axios from "axios";
import { baseUrl } from "../../../../shared/base-url";
import NewBeer from "../../beers/NewBeer";
import BeerItemMini from "../../beers/BeerItemMini";
import EditingBeerDetails from "../../beers/EditingBeerDetails";
import EditingBreweryDetails from "./EditingBreweryDetails";
import unavailableImg from "../../../../assets/unavailable.png";
import EventsAddNewForm from "../../events/EventsAddNewForm";
import { useSelector } from "react-redux";
import EventsUpdateAndAdd from "../../events/EventsUpdateAndAdd";
import EventMiniItem from "../../events/EventMiniItem";
import BrewerUsers from "../../users/BrewerUsers";
import authHeader from "../../../../services/auth-headers";
import AddUserToBrewery from "../../users/AddUserToBrewery";
const BreweryEditingPage = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showPopup, setShowpopup] = useState(false);
  const [componentToEdit, setComponentToEdit] = useState("");
  const [updated, setUpdated] = useState(false);
  console.log("hey");
  const updateCurrentPage = () => {
    setUpdated((prev) => !prev);
  };

  const showPopupOnclick = (event) => {
    const compname = event.target.parentElement.id;
    if (compname === "brewery-Name-Edit") {
      setComponentToEdit(<EditingBreweryName onSave={handleHidePopup} />);
    }
    if (compname === "brewery-details-Edit") {
      setComponentToEdit(<EditingBreweryDetails onSave={handleHidePopup} />);
    }
    if (compname === "brewery-Image-Edit") {
      setComponentToEdit(<EditingBreweryImage onSave={handleHidePopup} />);
    }
    if (compname === "brewery-history-description-Edit") {
      setComponentToEdit(<EditingBrewerDescription onSave={handleHidePopup} />);
    }

    if (compname === "brewery-users-add-new") {
      setComponentToEdit(
        <AddUserToBrewery
          userId={currentUser.user.id}
          onSave={handleHidePopup}
        />
      );
    }
    if (compname === "brewery-events-add-new") {
      setComponentToEdit(
        <EventsUpdateAndAdd
          breweryId={breweryCtx.brewery.id}
          userId={currentUser ? currentUser.user.id : ""}
          onSave={handleHidePopup}
          onUpdate={false}
        />
      );
    }
    if (compname === "brewery-beers-add-new") {
      setComponentToEdit(
        <NewBeer
          onSave={handleHidePopup}
          breweryName={breweryCtx.brewery.name}
          breweryId={breweryCtx.brewery.id}
        />
      );
    }
    setShowpopup(true);
  };

  const breweryCtx = useContext(BreweryContext);
  const handleUpdateBeer = (beerId) => {
    setComponentToEdit(
      <EditingBeerDetails selectedBeerId={beerId} onSave={handleHidePopup} />
    );
  };

  const handleUpdateEvent = (eventId) => {
    setComponentToEdit(
      <EventsUpdateAndAdd
        onUpdate={true}
        userId={currentUser ? currentUser.user.id : ""}
        selectedEventId={eventId}
        onSave={handleHidePopup}
        breweryId={breweryCtx.brewery.id}
      />
    );
  };

  const handleRemoveBeerById = (id) => {
    if (window.confirm("Are you sure you want to delete this Beer ?")) {
      axios.delete(`${baseUrl}beer/${id}/delete`).then((res) => {
        if (res) {
          updateCurrentPage();
          return;
        }
      });
    } else {
      return;
    }
  };

  const handleRemoveEventById = (id) => {
    if (window.confirm("Are you sure you want to delete this Event ?")) {
      axios.delete(`${baseUrl}event/${id}/delete`).then((res) => {
        if (res) {
          updateCurrentPage();
          return;
        }
      });
    } else {
      return;
    }
  };

  const EditButton = (props) => {
    return (
      <span className="edit-button" onClick={showPopupOnclick} id={props.name}>
        <span className="edit-button-icon">
          <FaIcons.FaEdit />
        </span>
        <span className="edit-button-span">Edit</span>
      </span>
    );
  };

  const AddButton = (props) => {
    return (
      <span className="edit-button" onClick={showPopupOnclick} id={props.name}>
        <span className="edit-button-icon">
          <FaIcons.FaPlusSquare />
        </span>
        <span className="edit-button-span">Add new</span>
      </span>
    );
  };

  const RemoveButton = (props) => {
    return (
      <span className="edit-button" id={props.name}>
        <span className="edit-button-icon">
          <FaIcons.FaTimes />
        </span>
        <span className="edit-button-span">Remove</span>
      </span>
    );
  };

  const handleHidePopup = () => {
    setShowpopup(false);
  };

  const handleRemoveBrewery = () => {
    if (window.confirm("Are you sure you want to delete this Brewery ?")) {
      axios
        .delete(`${baseUrl}brewery/${breweryCtx.brewery.id}/delete`)
        .then((res) => {
          if (res) {
            props.onBack();
          }
        });
    } else {
      return;
    }
  };

  const handleUpdateBrewery = () => {
    const formData = new FormData();

    let BreweryAfterChange = {
      name: breweryCtx.brewery.name,
      address: breweryCtx.brewery.address,
      description: breweryCtx.brewery.description,
      hours: breweryCtx.brewery.hours,
      email: breweryCtx.brewery.email,
      imageUrl: breweryCtx.brewery.imageUrl,
    };

    if (breweryCtx.breweryIsFromLocal) {
      BreweryAfterChange = {
        name: breweryCtx.brewery.name,
        address: breweryCtx.brewery.address,
        description: breweryCtx.brewery.description,
        hours: breweryCtx.brewery.hours,
        email: breweryCtx.brewery.email,
      };

      formData.append("image", breweryCtx.tempImageObject);
    }

    breweryCtx.breweryIsFromLocal = false;
    formData.append(
      "data",
      new Blob([JSON.stringify(BreweryAfterChange)], {
        type: "application/json",
      })
    );

    if (window.confirm("Are you sure you want to delete this Brewery ?")) {
      axios
        .put(`${baseUrl}brewery/${breweryCtx.brewery.id}/update`, formData)
        .then((res) => {
          if (res.status == 200) {
            props.onBack();
            breweryCtx.breweryImageFromLocal = "";
            breweryCtx.breweryIsFromLocal = false;
            breweryCtx.tempImageObject = null;
          }
        });
    } else {
      return;
    }
  };
  const handleChangeStatus = (e) => {
    e.preventDefault();
    if (
      window.confirm("Are you sure you want to change this Brewery status?")
    ) {
      const myHeaders = new Headers({
        Authorization: "Bearer " + currentUser.token,
        "Content-Type": "application/x-www-form-urlencoded",
      });
      fetch(
        `${baseUrl}brewery/${breweryCtx.brewery.id}/togglestatus?force=${e.target.value}`,
        {
          headers: myHeaders,
          method: "PUT",
        }
      );
    } else {
      return;
    }
  };

  return (
    <section className="brewery-edit">
      <a onClick={() => props.onBack()}>Back to all breweries list</a>
      {showPopup && (
        <EditingPopup
          onClose={handleHidePopup}
          componentToShowForEdit={componentToEdit}
        />
      )}

      <div className="brewery-type-change">
        <label>Change Brewery Status: </label>

        <select
          onChange={handleChangeStatus}
          defaultValue={breweryCtx.brewery.status}
        >
          <option id="active">active</option>
          <option id="inactive">inactive</option>
          {currentUser.user.authorities[0].name === "ROLE_ADMIN" && (
            <option id="pending">pending</option>
          )}
          {currentUser.user.authorities[0].name === "ROLE_ADMIN" && (
            <option id="locked">locked</option>
          )}
        </select>
      </div>
      <h3>
        Name: {breweryCtx.brewery.name}
        {<EditButton name={"brewery-Name-Edit"} />}
      </h3>
      <h4>Brewery Image:</h4>
      <div className="brewery-editin-image">
        <img
          src={
            breweryCtx.breweryIsFromLocal
              ? breweryCtx.breweryImageFromLocal
              : breweryCtx.brewery.imageUrl
              ? breweryCtx.brewery.imageUrl
              : unavailableImg
          }
        />
        {<EditButton name={"brewery-Image-Edit"} />}
      </div>
      <h4>
        Brewery history{" "}
        {<EditButton name={"brewery-history-description-Edit"} />}
      </h4>
      <p>{breweryCtx.brewery.description}</p>
      <h4>Brewery Details: {<EditButton name={"brewery-details-Edit"} />}</h4>
      <p>Hours/Days: {breweryCtx.brewery.hours}</p>
      <p>Address: {breweryCtx.brewery.address}</p>
      <p>Email: {breweryCtx.brewery.email}</p>
      <h4>
        Recently added beers {<AddButton name={"brewery-beers-add-new"} />}
      </h4>
      <BeerItemMini
        breweryId={breweryCtx.brewery.id}
        editBtn={<EditButton />}
        removeBtn={<RemoveButton name={"beer-remove"} />}
        onRemove={handleRemoveBeerById}
        onUpdateBeer={handleUpdateBeer}
        onUpdate={updateCurrentPage}
      />

      <h4>Events {<AddButton name={"brewery-events-add-new"} />}</h4>

      <EventMiniItem
        breweryId={breweryCtx.brewery.id}
        editBtn={<EditButton />}
        removeBtn={<RemoveButton name={"event-remove"} />}
        onRemove={handleRemoveEventById}
        onUpdateEvent={handleUpdateEvent}
        onUpdate={updateCurrentPage}
      />

      <h4>Brewery Users {<AddButton name={"brewery-users-add-new"} />}</h4>
      <BrewerUsers
        breweryId={breweryCtx.brewery.id}
        onUpdate={updateCurrentPage}
      />

      <div className="brewery-actions-buttons">
        <button onClick={handleUpdateBrewery}>Save Brewery</button>
        <button onClick={handleRemoveBrewery}>Remove this Brewery</button>
      </div>
    </section>
  );
};
export default BreweryEditingPage;
