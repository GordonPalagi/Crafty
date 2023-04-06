// import React from "react";
// import StarRating from "../Stars";
// import TastingBar from "./TastingBar";
// import "./tastingjournal.css";

// function TastingJournal() {
//   return (
//     <div className="login">
//       <div className="login-features">
//         <h2>Tasting Journal</h2>
//         <ul>
//           <label class="container">
//             Sweet
//             <input type="checkbox" />
//             <span class="checkmark"></span>
//             <StarRating />
//           </label>
//         </ul>
//         <TastingBar />
//       </div>
//     </div>
//   );
// }

// export default TastingJournal;

import React, { useEffect } from "react";
import StarRating from "./Stars";
import TastingBar from "./TastingBar";
import "./tastingjournal.css";
import Final from "../../Ui/Tastingjournal/FinalRating.js";
import ColorPicker from "../Tastingjournal/ColorPicker";



function TastingJournal() {
  return (
    <div className="page">
      <div className="journal-con">
        <h2>Tasting Journal</h2>
        <div>
          <div className="star">
            <div className="over">Overall Score</div>
            <StarRating />
          </div>
          <div className="">
            <div className="vertical-con">
              <div className="verticalBar"></div>
              <div className="verticalBar-2"></div>
            </div>
            <div className="horizantal-con">
              <div className="horizantalBar"></div>
              <div className="horizantalBar-2"></div>
            </div>
          </div>
        </div>
        <div className="tastingBar">
          <div>Flavor Profile</div>
          <TastingBar />
        </div>
        <div className="final-rating-con">
          <Final />
        </div>
        <div className="colorPicker"> Color of the Beer
          <ColorPicker />
        </div>
        <div>
          <div className="additional-notes">Additional Notes
            <label>
              <textarea className="text-area" rows="10"></textarea>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TastingJournal;
