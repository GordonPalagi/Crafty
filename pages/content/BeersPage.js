import Beers from "./Beers";
import DummyBeers from "../../shared/BeersListArray";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../shared/base-url";

const BeersPage = () => {
  const [beersData, setBeersData] = useState([]);

  useEffect(() => {
    axios.get(baseUrl + "beer/all").then((res) => {
      setBeersData(
        res.data.filter((item) => {
          return item.status === "active" || (item && !item.status);
        })
      );
    });
  }, [setBeersData]);

  return (
    <>
      <div className="beers__intro">
        <h2>Beer Listing</h2>
        <p>Discover and review hundreds of beers from your favorite breweries</p>
      </div>

      <Beers
        autoUpScroll={true}
        beersData={beersData}
        showPagination={true}
        showFilter={true}
        items={7}
      />
    </>
  );
};
export default BeersPage;
