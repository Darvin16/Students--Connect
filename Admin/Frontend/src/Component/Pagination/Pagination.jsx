import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Pagination.css";

function Pagination({ data, itemPerPage, displayFunction }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemPerPage);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = () => {
    const pages = [];

    pages.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      >
        1
      </button>
    );

    if (currentPage > 4) {
      pages.push(<button key="start-ellipsis">...</button>);
    }

    for (
      let i = Math.max(2, currentPage - 2);
      i <= Math.min(totalPages - 1, currentPage + 2);
      i++
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 3) {
      pages.push(<button key="end-ellipsis">...</button>);
    }

    if (totalPages !== 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      {displayFunction(currentData)}
      <div className="pagination-page-nav">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage((prev) => prev - 1);
            }
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div className="page-numbers">{pageNumbers()}</div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            if (currentPage !== totalPages) {
              setCurrentPage((prev) => prev + 1);
            }
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
