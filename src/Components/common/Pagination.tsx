import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Pagination(props: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  //pagination start
  const totalEntry = props.data?.length;
  const indexOfLastItem = currentPage * props.itemPerPage;
  const indexOfFirstItem = indexOfLastItem - props.itemPerPage;
  const handleClick = (event: any) => {
    const curPage = Number(event?.target.id);
    setCurrentPage(curPage);
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalEntry / props.itemPerPage); i++) {
    pages.push(i);
  }
  useEffect(() => {
    props.handleUpdate(props?.data.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, props?.data]);

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li className="page-item" onClick={handlePrevious}>
        {" "}
        <Link className="page-link" to="#">
          {" "}
          &hellip;{" "}
        </Link>
      </li>
    );
  }

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li className="page-item" onClick={handleNext}>
        {" "}
        <Link className="page-link" to="#">
          {" "}
          &hellip;{" "}
        </Link>
      </li>
    );
  }

  const renderPageNumbers = pages.map((number: any) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          className={currentPage == number ? "page-item active" : "page-item"}
          onClick={handleClick}
        >
          <Link className="page-link" key={number} id={number} to="#">
            {number}
          </Link>
        </li>
      );
    } else {
      return null;
    }
  });
  //pagination end
  return (
    <Fragment>
      <div className="tilewp-footer ">
        <div className="tile-footer-lt">
          <p>
            Showing {indexOfFirstItem + 1} to{" "}
            {indexOfLastItem > totalEntry ? totalEntry : indexOfLastItem} of{" "}
            {totalEntry} entries
          </p>
        </div>
        <div className="tile-footer-rt">
          <div className="">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li
                  className="page-item"
                  onClick={
                    currentPage == pages[0] ? () => null : handlePrevious
                  }
                >
                  <Link
                    className={
                      currentPage == pages[0]
                        ? "page-link disableCursor"
                        : "page-link"
                    }
                    to="#"
                  >
                    Previous
                  </Link>
                </li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                <li
                  className="page-item"
                  onClick={
                    currentPage == pages[pages.length - 1]
                      ? () => null
                      : handleNext
                  }
                >
                  <Link
                    className={
                      currentPage == pages[pages.length - 1]
                        ? "page-link disableCursor"
                        : "page-link"
                    }
                    to="#"
                  >
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Pagination;
