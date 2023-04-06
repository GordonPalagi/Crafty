import { useState } from "react";
import NewBeerForm from "../events/EventsAddNewForm";
import React from "react";
import axios from "axios";
import { baseUrl } from "../../../shared/base-url";
import EventsAddNewForm from "../events/EventsAddNewForm";

const EventsUpdateAndAdd = (props) => {
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(false);

  const AddEditEvent = (eventData) => {
    if (props.onUpdate) {
      axios
        .put(baseUrl + `event/${props.selectedEventId}/update`, eventData)
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
    } else {
      axios
        .put(baseUrl + "event/create", eventData)
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
    }
  };
  return (
    <div className="new-brewery">
      {isDone ? (
        <p>{!props.onUpdate ? "Add" : "Update"} Event request is done!</p>
      ) : (
        <>
          <p>
            you can fill this form to Add/Edit an Event for the brewery:{" "}
            {props.breweryName}
          </p>
          <EventsAddNewForm
            userId={props.userId}
            onSubmitForm={AddEditEvent}
            breweryId={props.breweryId}
            error={error}
            isUpdate={props.onUpdate}
            selectedEventId={props.selectedEventId}
          />
        </>
      )}
    </div>
  );
};
export default EventsUpdateAndAdd;
