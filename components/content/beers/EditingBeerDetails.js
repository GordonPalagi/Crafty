import React, { useContext, useRef, useState } from "react";
import "../breweries/newBreweryForm.css";
import BreweryContext from "../../../store/contexts/BreweryContext";
import EditingBeerForm from "./EditingBeerForm";
import axios from "axios";
import { baseUrl } from "../../../shared/base-url";
const EditingBeerDetails = (props) => {
  const breweryCtx = useContext(BreweryContext);

  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(false);
  const UpdateTheBeer = (beerData) => {
    axios
      .put(baseUrl + "beer/" + props.selectedBeerId + "/update", beerData)
      .then((res) => {
        if (res.status === 200) {
          setError(false);
          setIsDone(true);
          props.onSave();
        }
      })
      .catch((error) => {
        setIsDone(false);
        setError(true);
      });
  };

  return (
    <div className="new-brewery">
      {isDone ? (
        <p>Update beer request is done!</p>
      ) : (
        <>
          <p>you can fill this form to Update a beer to the beer:</p>
          <EditingBeerForm
            breweryId={breweryCtx.brewery.id}
            onSubmitForm={UpdateTheBeer}
            error={error}
          />
        </>
      )}
    </div>
  );
};
export default EditingBeerDetails;
