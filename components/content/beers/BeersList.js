import { Link } from "react-router-dom";
import BeerItem from "./BeerItem";
import React from "react";

const BeersList = (props) => {
  return (
    <>
      {props.list.map((e, i) => {
        if (props.fromBrewery) {
          return (
            <section className="beers-list-page-container">
              <BeerItem
                key={i}
                id={e.id}
                comments={e.id}
                rating={e.id + 1}
                image={e.imageUrl}
                brewery={e.breweryId}
                name={e.name + " " + e.id}
                info={e.description}
                alcohol={e.alcoholPercent}
              />
            </section>
          );
        }
        if (!props.fromBrewery) {
          return (
            <section className="beers-list-page-container">
              {!props.fromBrewery && (
                <Link key={i} to={`beer${e.id}`}>
                  <BeerItem
                    key={i}
                    id={e.id}
                    comments={e.id}
                    rating={e.id + 1}
                    image={e.imageUrl}
                    brewery={e.breweryId}
                    name={e.name + " " + e.id}
                    info={e.description}
                    alcohol={e.alcoholPercent}
                  />
                </Link>
              )}
            </section>
          );
        }
      })}
    </>
  );
};
export default BeersList;
