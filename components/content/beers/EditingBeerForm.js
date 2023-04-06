import { useContext, useRef } from "react";
import "../breweries/newBreweryForm.css";
import React from "react";
const EditingBeerForm = (props) => {
  const nameRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const alcoholRef = useRef();

  const handleNewBeerSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    const newBeerData = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      alcoholPercent: alcoholRef.current.value,
      breweryId: props.breweryId,
    };
    formData.append(
      "data",
      new Blob([JSON.stringify(newBeerData)], {
        type: "application/json",
      })
    );
    formData.append("image", imageRef.current.files[0]);
    if (window.confirm("Are you sure you want to update this Beer?")) {
      props.onSubmitForm(formData);
    } else {
      return;
    }

    nameRef.current.value = "";
    alcoholRef.current.value = "";
    descriptionRef.current.value = "";
    imageRef.current.value = "";
  };
  return (
    <form className="add-brewery-form" onSubmit={handleNewBeerSubmit}>
      <label htmlFor="name">Name:</label>
      <input required type="text" id="name" name="brewery_name" ref={nameRef} />

      <label htmlFor="alcohol_percent">alcohol percent</label>
      <input required type="text" name="alcohol_percent" ref={alcoholRef} />

      <label htmlFor="image">upload a logo</label>
      <input
        required
        type="file"
        name="brewery_logo"
        accept="image/*"
        ref={imageRef}
      />

      <label htmlFor="description">description:</label>
      <textarea minLength={10} name="breer_description" ref={descriptionRef} />

      {props.error && (
        <p style={{ color: "red" }}>
          Updating the beer Failed, Please try again
        </p>
      )}

      <button type="submit">Update beer</button>
    </form>
  );
};
export default EditingBeerForm;
