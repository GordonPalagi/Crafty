import Beers from "../Beers";
import DummyBeers from "../../../shared/BeersListArray";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../shared/base-url";

const BreweryBeerShow = (props) => {
  const [beersData, setBeersData] = useState([]);

  useEffect(() => {
    axios.get(baseUrl + "beer/brewery/" + props.breweryId).then((res) => {
      setBeersData(
        res.data.filter((item) => {
          return item.status === "active" || (item && !item.status);
        })
      );
    });
  }, [setBeersData]);

  return (
    <>
      {beersData && (
        <Beers
          autoUpScroll={true}
          fromBrewery={props.fromBrewery}
          beersData={beersData}
          showPagination={false}
          showFilter={true}
          items={DummyBeers.length}
        />
      )}
    </>
  );
};
export default BreweryBeerShow;
