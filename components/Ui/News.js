import "./news.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../shared/base-url";
import unavailable from "../../assets/unavailable.png";
const News = (props) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(baseUrl + "event/brewery/" + props.breweryId).then((res) => {
      setEvent(res.data);
    });
  }, [setEvent]);

  return (
    <div className="news">
      {event &&
        event.map((e, i) => {
          return (
            <div className="news-item">
              <h3>Event Title</h3>
              <img src={e.imageUrl ? e.imageUrl : unavailable}></img>
              <p>
                {e.description.substring(0, 200)}
                {"..."}
              </p>
              <h5>Date:</h5>
              <p>
                <span>From: {e.startTime ? e.startTime : "#"}</span>
                <span>To: {e.endTime ? e.endTime : "#"}</span>
              </p>
            </div>
          );
        })}
    </div>
  );
};
export default News;
