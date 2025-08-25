import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({
  qtdRegistros,
  totalRegistros,
  page,
  paginate,
  prevPage,
  nextPage,
}) => {
  const pageNumber = [];
  const [pageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(
    parseInt((page - 1) / 10) * 10
  );
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(
    minPageNumberLimit + 10
  );

  for (let i = 1; i <= Math.ceil(totalRegistros / qtdRegistros); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li
          onClick={() => {
            prevPage();
            if ((page - 1) % pageNumberLimit === 0 && page !== 1) {
              setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
              setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
            }
          }}
        >
          Prev
        </li>
        <li
          onClick={() => {
            if (minPageNumberLimit - pageNumberLimit >= 0) {
              setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
              setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
            }
          }}
          className="paginatorRoller"
        >
          ...
        </li>
        {pageNumber.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <li
                key={number}
                className={page === number ? "active" : null}
                onClick={() => paginate(number)}
              >
                {number}
              </li>
            );
          } else {
            return null;
          }
        })}
        <li
          onClick={() => {
            if (
              pageNumberLimit + minPageNumberLimit <=
              Math.ceil(totalRegistros / qtdRegistros)
            ) {
              setMaxPageNumberLimit(pageNumberLimit + maxPageNumberLimit);
              setMinPageNumberLimit(pageNumberLimit + minPageNumberLimit);
            }
          }}
          className="paginatorRoller"
        >
          ...
        </li>
        <li
          onClick={() => {
            nextPage();
            if (page + 1 > maxPageNumberLimit) {
              setMaxPageNumberLimit(pageNumberLimit + maxPageNumberLimit);
              setMinPageNumberLimit(pageNumberLimit + minPageNumberLimit);
            }
          }}
        >
          Next
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
