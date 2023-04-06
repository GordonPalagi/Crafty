import { useState, useEffect, useRef } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";
import "./uploader.css";
import Notification from "./components/Ui/Notification";
const Uploader = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const change = (e) => {
    const pushed = e.target.value;
    let s;
    let t;
    let m;
    if (pushed === "error") {
      s = "error";
      t = "not working";
      m = "something is wrong";
    }
    if (pushed === "success") {
      s = "success";
      t = "it is done";
      m = "seccesfully done";
    }
    if (pushed === "pending") {
      s = "pending";
      t = "please waite...";
      m = "waiting for data to be send..";
    }

    dispatch(
      uiActions.showNotification({
        status: s,
        title: t,
        message: m,
      })
    );
  };
  ///////////// image upload stuff
  const imageRef = useRef();

  const handleUpload = () => {
    const image = imageRef.current.files[0];
    const formData = new FormData();

    const data = {
      name: "brewery test",
      address: "olathe,kansas",
      description: "just a randon description for now",
      hours: "10am - 6pm",
      email: "xxx@g.com",
    };
    formData.append("image", image);

    formData.append(
      "data",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );

    fetch("http://localhost:8081/brewery/create", {
      method: "PUT",
      body: formData,
    }).then((res) => {
      console.log("succes== Res:200");
      console.log("The returned data: ");
      console.log(data);
    });
  };

  return (
    <>
      {/*  {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <p>This page is just to try things --- you can ignore it</p>
      <button onClick={change} value="error">
        error
      </button>
      <button onClick={change} value="success">
        succes
      </button>
      <button onClick={change} value="pending">
        pending
      </button>*/}

      <label htmlFor="image">upload a logo</label>
      <input
        type="file"
        id="image"
        name="brewery_logo"
        accept="image/*"
        ref={imageRef}
      />
      <a style={{ cursor: "pointer" }} onClick={handleUpload}>
        Add a fast brewery
      </a>

      <img src="http://localhost:8081/image/200018.jpg"></img>
    </>
  );
};
export default Uploader;
