import { useState } from "react";
import axios from "axios";
import NewBreweryForm from "./NewBreweryForm";
import { baseUrl } from "../../../shared/base-url";
import React from "react";
import { Navigate } from "react-router-dom";
const NewBrewery = () => {
  const [isDone, setIsDone] = useState(false);
  const [isReturningToHome, setIsReturningToHome] = useState(false);
  const [error, setError] = useState(false);

  const makeNewBrewery = (breweryData) => {
    axios
      .put(baseUrl + "brewery/create", breweryData)
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => setIsReturningToHome(true), 3000);
          setIsDone(true);
        }
      })
      .catch((error) => {
        setError(true);
      });

    //// fetch api post request ---=> the body is " breweryData";
  };

  return (
    <div className="new-brewery">
      {isDone ? (
        <div>
          <p>Add brewery request is done!</p>
          <p>
            Please wait for admin approval, usually it takes 24 hours to get an
            admin approval
          </p>
          <p>
            Returning to Home page ...{isReturningToHome && <Navigate to="/" />}
            ;
          </p>
        </div>
      ) : (
        <>
          {!error && (
            <>
              <NewBreweryForm onSubmitForm={makeNewBrewery} />{" "}
            </>
          )}
          {error && (
            <p>
              Sending a new brewery request is failed, please try again, or
              contact admin
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default NewBrewery;
