import "./pagination.css";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import React from "react";

const Pagination = (props) => {
  return (
    <>
      <div className="items">{props.dataToShow}</div>

      {props.pagination && (
        <ReactPaginate
          previousLabel={"<=previous"}
          nextLabel={"next=>"}
          pageCount={props.pages}
          onPageChange={props.function}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      )}
    </>
  );
};
export default Pagination;
