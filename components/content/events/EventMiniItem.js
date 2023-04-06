import axios from "axios";
import { useEffect, useState } from "react";
import img3 from "../../../assets/img4.jpg";
import { baseUrl } from "../../../shared/base-url";
import "../beers/beerItemMini.css";
import unavailableImg from "../../../assets/unavailable.png";

const EventMiniItem = (props) => {
  const [beersList, setBeersList] = useState([]);
  const [beerIsActive, setBeerIsActive] = useState(true);
  const [hideShowList, setHideShowList] = useState(true);

  useEffect(() => {
    if (beerIsActive) {
      axios.get(baseUrl + "event/brewery/" + props.breweryId).then((res) => {
        setBeersList(
          res.data.filter((beer) => {
            {
              return (beer && !beer.status) || beer.status === "active";
            }
          })
        );
        if (res.data.length > 0) {
          setHideShowList(true);
        } else {
          setHideShowList(false);
        }
      });
    }

    if (!beerIsActive) {
      axios.get(baseUrl + "beer/brewery/" + props.breweryId).then((res) => {
        setBeersList(
          res.data.filter((beer) => {
            {
              return beer && beer.status === "inactive";
            }
          })
        );
        if (res.data.length > 0) {
          setHideShowList(true);
        } else {
          setHideShowList(false);
        }
      });
    }
  }, [
    setBeersList,
    beerIsActive,
    props.onUpdate,
    setHideShowList,
    beersList.length,
  ]);
  if (!hideShowList) {
    return <p>No beers for this brewery</p>;
  }
  console.log("hey");
  const handleActiveBeers = () => {
    setBeerIsActive(true);
  };
  const handleInActiveBeers = () => {
    setBeerIsActive(false);
  };
  const removeBeer = (e) => {
    const id = e.target.parentElement.parentElement.id;
    props.onRemove(id);
  };
  const editEvent = (e) => {
    const id = e.target.parentElement.parentElement.id;
    props.onUpdateEvent(id);
  };
  return (
    <>
      <div className="mini-beers-buttons">
        <button
          className={
            beerIsActive ? "mini-beers-clicked" : "mini-beers-unClicked"
          }
          onClick={handleActiveBeers}
        >
          Active beers
        </button>
        <button
          className={
            beerIsActive ? "mini-beers-unClicked" : "mini-beers-clicked"
          }
          onClick={handleInActiveBeers}
        >
          InActive beers
        </button>
      </div>
      <section className="mini-beers-list">
        {beersList.map((event, index) => {
          return (
            <div key={event.id} className="beer-mini-card">
              <section className="mini-beer">
                <div className="beer-card-mini-top">
                  <h5>{event.title.split(" ").slice(0, 3).join(" ")}</h5>{" "}
                </div>
                <img src={event.imageUrl ? event.imageUrl : unavailableImg} />
                <div className="beer-card-mini-bottom">
                  <div className="beer-card-mini-bottom-left">
                    <div className="event-card-time">
                      {event.startTime
                        ? `${event.startTime.substring(
                            0,
                            10
                          )} starts: ${event.startTime.substring(
                            10,
                            event.startTime.length - 3
                          )}`
                        : ""}

                      {event.endTime
                        ? ` ends: ${event.endTime.substring(
                            10,
                            event.endTime.length - 3
                          )} `
                        : ""}
                      {!event.startTime && !event.endTime && "No time set"}
                      {console.log("end " + event.endTime)}
                    </div>
                  </div>
                </div>
              </section>
              <div className="mini-beer-btns">
                <div id={event.id} onClick={editEvent}>
                  {props.editBtn} {console.log(event.startTime)}
                </div>
                <div id={event.id} onClick={removeBeer}>
                  {props.removeBtn}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};
export default EventMiniItem;
