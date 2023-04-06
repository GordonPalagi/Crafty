import { useRef } from "react";
import React from "react";
import "./newBreweryForm.css";

const NewBreweryForm = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const operationTimeRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const addressRef = useRef();

  const handleNewBrewerySubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    const brewery = {
      name: nameRef.current.value,
      hours: operationTimeRef.current.value,
      description: descriptionRef.current.value,
      address: addressRef.current.value,
      email: emailRef.current.value,
    };
    const imageFile = imageRef.current.files[0];
    formData.append("image", imageFile);

    formData.append(
      "data",
      new Blob([JSON.stringify(brewery)], {
        type: "application/json",
      })
    );

    if (window.confirm("Are you sure you want to Add this Brewery?")) {
      props.onSubmitForm(formData);
      nameRef.current.value = "";
      emailRef.current.value = "";
      descriptionRef.current.value = "";
      imageRef.current.value = "";
      operationTimeRef.current.value = "";
      addressRef.current.value = "";
    } else {
      return;
    }
  };
  return (
    <form className="add-brewery-form" onSubmit={handleNewBrewerySubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="brewery_name" ref={nameRef} />

      <label htmlFor="mail">E-mail:</label>
      <input type="email" id="mail" name="brewery_email" ref={emailRef} />

      <label htmlFor="operation_time">Days/Hours of operation</label>
      <input
        type="text"
        id="operation_time"
        name="brewery_operation_time"
        ref={operationTimeRef}
      />

      <label htmlFor="image">upload a logo</label>
      <input
        type="file"
        id="image"
        name="brewery_logo"
        accept="image/*"
        ref={imageRef}
      />

      <label htmlFor="name">Address:</label>
      <input type="text" id="name" name="brewery_address" ref={addressRef} />
      <label htmlFor="address">Brewery Address:</label>
      <textarea
        id="description"
        minLength={10}
        name="brewer_description"
        ref={descriptionRef}
      />

      <button type="submit">Add new brewery</button>
    </form>
  );
};
export default NewBreweryForm;
