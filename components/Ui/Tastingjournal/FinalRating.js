import React, { useState } from "react";
import '../../Ui/Tastingjournal/FinalRating.css'

const FinalRating = (props) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <div className="flex-star">{props.name}
            <div className="star-array-con">
                    <div className="stars"> 
                        {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <label>
                            <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? "on-final" : "off-final"}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            >
                            <span className="star">&#9733;</span>
                            </button>
                                 </label>
                        );
                        })}
                    </div>
            </div>

            <div></div>

        </div>
    );
  };

  function Final() {
    return (
        <div className="rating-con">
            <FinalRating name="Appearance"/> 
            <FinalRating name="Aroma"/> 
            <FinalRating name="Taste"/> 
            <FinalRating name="Mouth Feel"/>
        </div>
        )
  }

  export default Final