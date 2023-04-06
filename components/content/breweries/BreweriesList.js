import { Link } from "react-router-dom";
import Card from "../../Ui/Card";
import BreweryItem from "../breweries/BreweryItem";
import React from "react";

const BreweriesList = (props) => {
  return (
    <>
      {props.list.map((e, i) => {
        return (
          <Link key={i} to={`brewery${e.id}`}>
            <Card className="brewery">
              <BreweryItem
                name={`${e.name}`}
                images={e.imageUrl}
                state={e.address}
              ></BreweryItem>
            </Card>
          </Link>
        );
      })}
    </>
  );
};
export default BreweriesList;
