import "./beerItem.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import React from "react";
import unavailableImg from "../../../assets/unavailable.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../shared/base-url";
const BeerItem = (props) => {
  const [reviews, setReviews] = useState({
    reviewsNumber: 0,
    overallRating: 0,
  });

  useEffect(() => {
    axios(baseUrl + "review/beer/" + props.id).then((res) => {
      if (res.data.length > 0) {
        console.log(res.data.length + "----" + res.data[0].overallRating);
        setReviews({
          reviewsNumber: res.data.length,
          overallRating: res.data[0].overallRating,
        });
      }
    });
  }, [setReviews]);

  const ratingWidth = (reviews.overallRating * 100) / 5;
  return (
    <div className="beer-card">
      <div className="beer-card__image">
        <img src={props.image ? props.image : unavailableImg} />
      </div>
      <div className="beer-card__content">
        <div className="beer-card__head">
          <div className="beer-card__top-info">
            <h3 className="beer-card__name">{props.name}</h3>
            <div className="beer-card__rating">
              <div className="stars-outer">
                <div
                  className="stars-inner"
                  style={{ width: `${ratingWidth}%` }}
                ></div>
              </div>
            </div>
          </div>

          <p>
            brewery: {props.brewery} - Alcohol Percent:{" "}
            {props.alcohol ? parseInt(props.alcohol) : "#"} - comments:{" "}
            {reviews.reviewsNumber}
          </p>
        </div>

        <div className="beer-card__info">
          {props.info.substring(0, 300)}
          {" ..."}
        </div>
      </div>
    </div>
  );
};
export default BeerItem;
