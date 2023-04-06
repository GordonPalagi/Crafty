import BreweryItem from "../../components/content/breweries/BreweryItem";
import Filter from "../../components/Ui/Filter";
import BreweriesList from "../../components/content/breweries/BreweriesList";

import "./breweries.css";
import Card from "../../components/Ui/Card";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import React, { useEffect, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import Dummy_breweries from "../../shared/BreweriesListArray";
import Pagination from "../../components/Ui/Pagination";
import axios from "axios";
import { baseUrl } from "../../shared/base-url";
const ITEM_PER_PAGE = 8;
const BREWERIES_FILTER_OPTIONS = [
  { id: 1, optionName: "Old first", option: "old-first" },
  { id: 2, optionName: "New first", option: "new-first" },
  /// we can add other options
];

const sortList = (array, filterOption) => {
  switch (filterOption) {
    case "old-first":
      return array.sort(function (a, b) {
        return a.id - b.id;
      });
      break;
    case "new-first":
      return array.sort(function (a, b) {
        return b.id - a.id;
      });
      break;
    default:
      return array;
  }
};
/////////////////////////

///still working on this one
/////////////////////////
const Breweries = () => {
  ///// filter stuff
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentList, setCurrentList] = useState([]);
  useEffect(() => {
    axios.get(baseUrl + "brewery/all").then((res) => {
      setCurrentList(
        sortList(
          res.data.filter((item) => {
            return item.status === "active";
          }),
          queryParams.get("sort")
        )
      );
    });
  }, [setCurrentList, queryParams.get("sort")]);

  const handlePageClick = (event) => {
    const num = event.selected;
    setCurrentPage(num);
  };
  const offset = currentPage * ITEM_PER_PAGE;
  const pageCount = Math.ceil(currentList.length / ITEM_PER_PAGE);

  useMemo(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  //// final list (filtred + sliced)
  const sortedAndSlicedList = (
    <BreweriesList list={currentList.slice(offset, offset + ITEM_PER_PAGE)} />
  );

  const filterTheData = (FilterOptionIndex) => {
    navigate({
      pathname: location.pathname,
      search: "?sort=" + BREWERIES_FILTER_OPTIONS[FilterOptionIndex].option,
    });
    if (currentPage !== 0) {
      window.location.reload(false);
    }
  };

  return (
    <div className="breweries">
      <div className="intro">
        <h2>Brewery Selection</h2>
        <p>The best breweries are closer than you think</p>
      </div>
      <Filter
        options={BREWERIES_FILTER_OPTIONS}
        onFilterChange={filterTheData}
      />

      <Pagination
        pagination={true}
        function={handlePageClick}
        pages={pageCount}
        dataToShow={sortedAndSlicedList}
      />
    </div>
  );
};

export default Breweries;
