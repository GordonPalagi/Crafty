import { useContext, useRef } from "react";
import "../breweries/newBreweryForm.css";
import React from "react";
import BreweryContext from "../../../store/contexts/BreweryContext";
const EventsAddNewForm = (props) => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  const breweryCtx = useContext(BreweryContext);

  const titleRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const dateStartRef = useRef();
  const dateEndRef = useRef();

  const startTimeRef = useRef();
  const endTimeRef = useRef();

  const handleNewEventSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    const newEventData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      breweryId: props.breweryId,
      startTime: `${dateStartRef.current.value} ${startTimeRef.current.value}:00`,
      endTime: `${dateEndRef.current.value} ${endTimeRef.current.value}:00`,
      brewerId: props.userId,
    };

    formData.append(
      "data",
      new Blob([JSON.stringify(newEventData)], {
        type: "application/json",
      })
    );
    formData.append("image", imageRef.current.files[0]);
    console.log(newEventData);
    if (window.confirm("Are you sure you want to Add this Event?")) {
      props.onSubmitForm(formData);
    } else {
      return;
    }

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    imageRef.current.value = "";
  };
  return (
    <form className="add-brewery-form" onSubmit={handleNewEventSubmit}>
      <label htmlFor="name">Event Title:</label>
      <input required type="text" id="name" name="event_name" ref={titleRef} />

      <label htmlFor="image">upload a logo</label>
      <input
        required
        type="file"
        name="event_logo"
        accept="image/*"
        ref={imageRef}
      />
      <label for="start">Event Start date:</label>

      <input
        required
        type="date"
        id="start"
        name="event-date"
        min={`${year}-${month}-${day}`}
        max={`${year + 2}-12-30`}
        ref={dateStartRef}
      />
      <label for="appt">Choose a starting time </label>

      <input
        type="time"
        id="appt"
        name="start"
        min="08:00"
        max="8:30"
        required
        ref={startTimeRef}
      />

      <label for="start">Event End date:</label>

      <input
        required
        type="date"
        id="start"
        name="event-date"
        min={`${year}-${month}-${day}`}
        max={`${year + 2}-12-30`}
        ref={dateEndRef}
      />

      <label for="appt">Choose an ending time</label>

      <input
        ref={endTimeRef}
        type="time"
        id="appt"
        name="end"
        min="08:30"
        max="9:00"
        required
      />

      <label htmlFor="description">description:</label>
      <textarea minLength={10} name="Event_description" ref={descriptionRef} />
      {props.error && (
        <p style={{ color: "red" }}>
          Adding/Updating an Event Failed, Please try again
        </p>
      )}

      <button type="submit">
        {!props.isUpdate ? "Add new Event" : "Update The Event"}
      </button>
    </form>
  );
};
export default EventsAddNewForm;
