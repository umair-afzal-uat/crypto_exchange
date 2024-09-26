import React from "react";
import ReactPaginate from "react-paginate";

const Paginate = ({ onChange, totalItems, currentPage, itemsCountPerPage }) => {
  const prevLabel = (
    <li>
      <a className="arrow disabled" href="">
        <svg
          className="stroke"
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.9999 11.2L1.3999 5.99999L6.9999 0.799988"
            stroke="#9EA2A9"
            strokeLinecap="square"
          ></path>
        </svg>
      </a>
    </li>
  );
  const nextLabel = (
    <li>
      <a className="arrow" href="">
        <svg
          className="stroke"
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 11.2L6.6 5.99999L1 0.799988"
            stroke="#5BC044"
            strokeLinecap="square"
          ></path>
        </svg>
      </a>
    </li>
  );

  return (
    <ReactPaginate
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      nextLabel={nextLabel}
      previousLabel={prevLabel}
      containerClassName={"pagination"}
      activeClassName={"active"}
      onPageChange={onChange}
      pageCount={totalItems / itemsCountPerPage}
      forcePage={currentPage - 1}
    />
  );
};

export default Paginate;
