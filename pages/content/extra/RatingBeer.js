import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../shared/base-url";

const RatingBeer = (props) => {
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
    <div className="beer-card__rating show-beer-page-rating">
      <div className="stars-outer">
        <div className="stars-inner" style={{ width: `${ratingWidth}%` }}></div>
      </div>
    </div>
  );
};
export default RatingBeer;
