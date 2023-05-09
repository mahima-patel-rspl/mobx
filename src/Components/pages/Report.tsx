import { Fragment, useEffect, useState } from "react";
import ComponentHeader from "./Component_Header";
import { Link } from "react-router-dom";
import ComponentFooter from "./Component_Footer";
import { AppDispatch } from "../../redux/store";
import { techStackList } from "../../redux/action/userAction";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
  techStackGetReport,
  techStackGetApprovalReport,
  trendComponent,
} from "../../redux/action/adminAction";
import ComponentNavbar from "./componentNavbar";
import { TechstackReportData } from "./InterfaceTypes";

function Report() {
  const dispatch = useDispatch<AppDispatch>();
  const { techStacks } = useSelector((state: any) => state?.techStacks);

  const { techStackGetReportData } = useSelector(
    (state: any) => state?.techStackGetReport
  );

  const { techStackGetReportApprovalData } = useSelector(
    (state: any) => state?.techStackGetApprovalReport
  );

  const { trendComponentData } = useSelector(
    (state: any) => state?.trendComponent
  );
  const [techStackId, setTechStackId] = useState("");
  const [trendDuration, setTrendDuration] = useState("week");
  const [searchWord, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const techStackData = async () => {
    const techStackData: any = await dispatch(techStackList());
    dispatch(techStackGetReport(techStackData?.payload?.[0]?.id));
    setTechStackId(techStackData?.payload?.[0]?.id);
  };

  useEffect(() => {
    document.body.className = "app d-flex flex-column h-100 nav-light";
    techStackData();
    dispatch(techStackGetApprovalReport());
  }, []);
  useEffect(() => {
    dispatch(trendComponent(techStackId, trendDuration));
  }, [dispatch, techStackId, trendDuration]);

  const totalEntry = techStackGetReportData?.payload?.length;
  //search bar - data search
  const searchFilterData = techStackGetReportData?.payload?.filter(
    (item: TechstackReportData) => {
      if (searchWord == "") {
        return item;
      } else if (
        item.name.toLowerCase().includes(searchWord.toLocaleLowerCase())
      ) {
        return item;
      }
    }
  );

  // pagination
  const handleClick = (event: any) => {
    setCurrentPage(Number(event?.target.id));
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalEntry / itemsPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const searchData = searchFilterData?.slice(indexOfFirstItem, indexOfLastItem);

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
  // handelTechStack
  const handelTechStack = (e: any) => {
    dispatch(techStackGetReport(e.target.value));
  };

  return (
    <div>
      <Fragment>
        <ComponentHeader />
      </Fragment>
      <Fragment>
        <div className="nav-scroller bg-blue shadow-sm">
          <ComponentNavbar />
        </div>
        {/* <!-- Main container --> */}
        <div className="flex-shrink-0">
          <section className="section_wrapper_sm">
            <div className="container container-fluid">
              <div className="tile_wrapper">
                <div className="tilewp-body">
                  <div className="tablist2">
                    <ul
                      className="nav nav-pills mb-4"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-overivew-tab"
                          data-toggle="pill"
                          data-target="#pills-overivew"
                          type="button"
                          role="tab"
                          aria-controls="pills-overivew"
                          aria-selected="true"
                        >
                          Component by Techstack
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-changelog-tab"
                          data-toggle="pill"
                          data-target="#pills-changelog"
                          type="button"
                          role="tab"
                          aria-controls="pills-changelog"
                          aria-selected="false"
                        >
                          Trends of Components
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-dependencies-tab"
                          data-toggle="pill"
                          data-target="#pills-dependencies"
                          type="button"
                          role="tab"
                          aria-controls="pills-dependencies"
                          aria-selected="false"
                        >
                          Component Approval Aging Report
                        </button>
                      </li>
                    </ul>
                    <hr className="mb-4"></hr>

                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-overivew"
                        role="tabpanel"
                        aria-labelledby="pills-overivew-tab"
                      >
                        <div className="tab-content-body">
                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-group">
                                <select
                                  className="form-control"
                                  onChange={handelTechStack}
                                  id="exampleFormControlSelect1"
                                  required
                                >
                                  {techStacks?.payload?.map(
                                    (techstack: any) => {
                                      return (
                                        <Fragment>
                                          <option
                                            key={techstack?.id}
                                            value={techstack?.id}
                                          >
                                            {techstack?.name}
                                          </option>
                                        </Fragment>
                                      );
                                    }
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="table-responsive table_custom">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Component Name</th>
                                  <th>Count</th>
                                  <th>Views</th>
                                  <th>Downloads</th>
                                </tr>
                              </thead>

                              {techStackGetReportData?.payload?.length &&
                              searchData?.length !== 0 ? (
                                <tbody>
                                  {searchData?.map((data: any) => {
                                    return (
                                      <tr>
                                        <td>{data?.name}</td>
                                        <td>{data?.count}</td>
                                        <td>{data?.views}</td>
                                        <td>{data?.downloads}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              ) : (
                                <h5 style={{ textAlign: "center" }}>
                                  No Data Found
                                </h5>
                              )}
                            </table>
                          </div>
                        </div>
                        {techStackGetReportData?.payload?.length !== 0 ? (
                          <div className="tilewp-footer ">
                            <div className="tile-footer-lt">
                              <p>
                                Showing {indexOfFirstItem + 1} to{" "}
                                {indexOfLastItem > totalEntry
                                  ? totalEntry
                                  : indexOfLastItem}{" "}
                                of {totalEntry} entries
                              </p>
                            </div>
                            <div className="tile-footer-rt">
                              <div className="">
                                <nav aria-label="Page navigation example">
                                  <ul className="pagination justify-content-end">
                                    <li
                                      className="page-item"
                                      onClick={
                                        currentPage == pages[0]
                                          ? () => null
                                          : handlePrevious
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
                        ) : null}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-changelog"
                        role="tabpanel"
                        aria-labelledby="pills-changelog-tab"
                      >
                        <div className="tab-content-body">
                          <div className="tabinner-title">
                            <h3 className="mb-0">Site Visitors</h3>

                            <div className="w-50 ml-auto">
                              <div className="row justify-content-lg-end">
                                <div className="col-md-3">
                                  <div className="form-group">
                                    <select
                                      className="form-control"
                                      onChange={(e: any) =>
                                        setTechStackId(e.target.value)
                                      }
                                      id="exampleFormControlSelect1"
                                      required
                                    >
                                      {techStacks?.payload?.map(
                                        (techstack: any) => {
                                          return (
                                            <Fragment>
                                              <option
                                                key={techstack?.id}
                                                value={techstack?.id}
                                              >
                                                {techstack?.name}
                                              </option>
                                            </Fragment>
                                          );
                                        }
                                      )}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="form-group">
                                    <select
                                      onChange={(e: any) =>
                                        setTrendDuration(e.target.value)
                                      }
                                      className="form-control"
                                      id="exampleFormControlSelect1"
                                    >
                                      <option value="week">Weekly</option>
                                      <option value="month ">Monthly</option>

                                      <option value="year">Yearly</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 mb-2  w-100 d-flex align-items-center justify-content-center">
                            <ResponsiveContainer
                              width="70%"
                              aspect={3}
                              className="img-fluid"
                            >
                              <BarChart
                                data={trendComponentData?.payload}
                                width={400}
                                height={400}
                              >
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="blue" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-dependencies"
                        role="tabpanel"
                        aria-labelledby="pills-dependencies-tab"
                      >
                        <div className="tab-content-body">
                          <div className="table-responsive table_custom">
                            <table className="table table-hover">
                              <thead>
                                <tr>
                                  <th>Category</th>
                                  <th>0-30 Days</th>
                                  <th>31-60 Days</th>
                                  <th>61-90 Days</th>
                                  <th>90+ Days</th>
                                  <th>Total</th>
                                </tr>
                              </thead>

                              {techStackGetReportApprovalData?.payload
                                ?.length !== 0 ? (
                                <tbody>
                                  {techStackGetReportApprovalData?.payload?.map(
                                    (data: any) => {
                                      return (
                                        <tr>
                                          <td>{data?.techstack}</td>
                                          <td>{data?.range1}</td>
                                          <td>{data?.range2}</td>
                                          <td>{data?.range3}</td>
                                          <td>{data?.range4}</td>

                                          <td>{data?.total}</td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </tbody>
                              ) : (
                                <h5>No Data Found</h5>
                              )}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Fragment>
          {" "}
          <ComponentFooter />
        </Fragment>
      </Fragment>
    </div>
  );
}

export default Report;
