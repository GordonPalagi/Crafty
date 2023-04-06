import { useState } from "react";
import NewBeerForm from "./NewBeerForm";
import React from "react";
import axios from "axios";
import { baseUrl } from "../../../shared/base-url";
const NewBeer = (props) => {
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(false);
  const makeNewBeer = (beerData) => {
    axios
      .put(baseUrl + "beer/create", beerData)
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
        <p>Add beer request is done!</p>
      ) : (
        <>
          <p>
            you can fill this form to add a beer to the brewery:{" "}
            {props.breweryName}
          </p>
          <NewBeerForm
            onSubmitForm={makeNewBeer}
            breweryId={props.breweryId}
            error={error}
          />
        </>
      )}
    </div>
  );
};
export default NewBeer;
