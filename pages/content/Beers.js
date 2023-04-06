import React, { useEffect, useMemo, useRef, useState } from "react";
import "./beers.css";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import BeerItem from "../../components/content/beers/BeerItem";
import Filter from "../../components/Ui/Filter";
import Pagination from "../../components/Ui/Pagination";
import BeersList from "../../components/content/beers/BeersList";

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

    case "alcohol-high":
      return array.sort(function (a, b) {
        return (
          parseInt(b.alcoholPercent ? b.alcoholPercent : "0") -
          parseInt(a.alcoholPercent ? a.alcoholPercent : "0")
        );
      });
      break;
    default:
      return array;
  }
};
const BEERS_FILTER_OPTIONS = [
  { id: 1, optionName: "Old first", option: "old-first" },
  { id: 2, optionName: "New first", option: "new-first" },
  { id: 5, optionName: "alcohol level", option: "alcohol-high" },
];

const Beers = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [data, setData] = useState(props.beersData);
  const [currentList, setCurrentList] = useState(
    sortList(props.beersData, queryParams.get("sort"))
  );

  useEffect(() => {
    setCurrentList(sortList(props.beersData, queryParams.get("sort")));
  }, [setCurrentList, sortList, props.beersData, queryParams.get("sort")]);

  const ITEM_PER_PAGE = props.items;

  /////pagination stuff
  const [currentPage, setCurrentPage] = useState(0);
  const filterRef = useRef();
  /////// method to scroll up when changing beers pages
  const scrollToRef = () => {
    const sectionToScroll = filterRef.current;
    if (sectionToScroll) {
      sectionToScroll.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  console.log(currentList.length);
  const pageCount = Math.ceil(currentList.length / ITEM_PER_PAGE);
  let offset = currentPage * ITEM_PER_PAGE;
  const handlePageClick = (event) => {
    const num = event.selected;
    setCurrentPage(num);
    scrollToRef();
  };
  ///// filter stuff
  const filterTheData = (FilterOptionIndex) => {
    navigate({
      pathname: location.pathname,
      search: "?sort=" + BEERS_FILTER_OPTIONS[FilterOptionIndex].option,
    });
    if (currentPage !== 0) {
      window.location.reload(false);
    }
    scrollToRef();
  };

  //// final list (filtred + sliced)
  const sortedAndSlicedList = (
    <BeersList
      fromBrewery={props.fromBrewery}
      list={currentList.slice(offset, offset + ITEM_PER_PAGE)}
    />
  );

  return (
    <section ref={filterRef} className="beers">
      {props.showFilter && (
        <Filter options={BEERS_FILTER_OPTIONS} onFilterChange={filterTheData} />
      )}

      <Pagination
        pagination={props.showPagination}
        function={handlePageClick}
        pages={pageCount}
        dataToShow={sortedAndSlicedList}
      />
    </section>
  );
};

export default Beers;
