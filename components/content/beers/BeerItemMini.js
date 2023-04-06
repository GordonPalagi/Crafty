import axios from "axios";
import { useEffect, useState } from "react";
import img3 from "../../../assets/img4.jpg";
import { baseUrl } from "../../../shared/base-url";
import "./beerItemMini.css";
import unavailableImg from "../../../assets/unavailable.png";

const BeerListMini = (props) => {
  const [beersList, setBeersList] = useState([]);
  const [beerIsActive, setBeerIsActive] = useState(true);
  const [hideShowList, setHideShowList] = useState(true);

  useEffect(() => {
    if (beerIsActive) {
      axios.get(baseUrl + "beer/brewery/" + props.breweryId).then((res) => {
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
  const editBeer = (e) => {
    const id = e.target.parentElement.parentElement.id;
    props.onUpdateBeer(id);
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
        {beersList.map((beer, index) => {
          return (
            <div key={beer.id} className="beer-mini-card">
              <section className="mini-beer">
                <div className="beer-card-mini-top">
                  <h5>{beer.name.split(" ").slice(0, 3).join(" ")}</h5>{" "}
                </div>
                <img src={beer.imageUrl ? beer.imageUrl : unavailableImg} />
                <div className="beer-card-mini-bottom">
                  <div className="beer-card-mini-bottom-left">
                    <h5>Alcohol Level:</h5>
                    <div className="beer-card_alcohol">
                      <span
                        className="stars-inner-alcohol"
                        style={{
                          width: `${parseInt(beer.alcoholPercent)}%`,
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </section>
              <div className="mini-beer-btns">
                <div id={beer.id} onClick={editBeer}>
                  {props.editBtn}
                </div>
                <div id={beer.id} onClick={removeBeer}>
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
export default BeerListMini;
