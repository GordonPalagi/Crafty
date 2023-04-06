import "./editingBreweryDetails.css";
import BreweryContext from "../../../../store/contexts/BreweryContext";
import React, { useContext, useState, useRef } from "react";

const EditingBreweryDetails = (props) => {
  const breweryCtx = useContext(BreweryContext);
  const hoursDaysRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();

  const saveData = () => {
    const newHoursDays = hoursDaysRef.current.value;
    const newEmail = emailRef.current.value;
    const newAddress = addressRef.current.value;
    if (newAddress !== breweryCtx.brewery.address && newAddress.length > 5) {
      breweryCtx.brewery.address = newAddress;
      props.onSave();
    }
    if (newEmail !== breweryCtx.brewery.email && newEmail.length > 5) {
      breweryCtx.brewery.email = newEmail;
      props.onSave();
    }
    if (newHoursDays !== breweryCtx.brewery.hours && newHoursDays.length > 5) {
      breweryCtx.brewery.hours = newHoursDays;
      props.onSave();
    }
    props.onSave();
  };
  return (
    <div className="brewery-details-editing">
      <h3>Enter a new Brewery name</h3>
      <div className="details-input">
        <label htmlFor="name">Hours/Days:</label>
        <input
          placeholder={breweryCtx.brewery.hours}
          type="text"
          id="name"
          name="brewery_name"
          ref={hoursDaysRef}
        />
        <label htmlFor="name">Address:</label>
        <input
          placeholder={breweryCtx.brewery.address}
          type="text"
          id="name"
          name="brewery_name"
          ref={addressRef}
        />

        <label htmlFor="name">Email:</label>
        <input
          placeholder={breweryCtx.brewery.email}
          type="text"
          id="name"
          name="brewery_name"
          ref={emailRef}
        />
      </div>

      <button onClick={saveData}>Apply Changes</button>
    </div>
  );
};
export default EditingBreweryDetails;
