import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { AppDispatch } from "../../redux/store";
import ComponentFooter from "./Component_Footer";
import ComponentHeader from "./Component_Header";
import noImage from "../../images/no-image.svg";

import Multiselect from "multiselect-react-dropdown";
import {
  adminfilterfieldsData,
  adminManageComponentsPostRequest,
  adminSyncComponents,
  adminSyncFiles,
  adminSyncTechstack,
  adminTagListGet,
} from "../../redux/action/adminAction";
import { ToastContainer, toast } from "react-toastify";
import { techStackList } from "../../redux/action/userAction";
import ComponentNavbar from "./componentNavbar";
import {
  AdminTagList,
  AllTags,
  ManageComponents,
  Techstacks,
} from "./InterfaceTypes";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
function Manage_Components() {
  const {
    rootStore: { manageComponentStore },
  } = useStore();

  const dispatch = useDispatch<AppDispatch>();

  // const { adminManageComponentsPost } = useSelector(
  //   (state: any) => state?.adminManageComponentsPost
  // );

  // const { adminTagList } = useSelector((state: any) => state?.adminTagList);

  // const { adminFilterFieldsData } = useSelector(
  //   (state: any) => state?.adminFilterFieldsData
  // );

  // const { techStacks } = useSelector((state: any) => state?.techStacks);

  const [searchWord, setSearchWord] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const [fTechStack, setFTechStack] = useState([]);
  const [fStatus, setFStatus] = useState(null);
  const [fTechstackImage, setFTechstackImage] = useState(null);
  const [fComponentImage, setFComponentImage] = useState(null);
  const [fFrom, setFFrom] = useState(null);
  const [FTo, setFTo] = useState(null);
  const [tagsArr, setTagsArr] = useState([]);
  const [versionArr, setVersionArr] = useState([]);
  const [frameworkArr, setFrameworkArr] = useState([]);
  const [createdBy, setCreatedBy] = useState([]);

  let tagsIdarr: string[] = [];
  tagsArr.map((item: any) => {
    tagsIdarr.push(item.id);
  });

  let versionsArr: string[] = [];
  versionArr.map((item: any) => {
    versionsArr.push(item.name);
  });

  let techStackArr: string[] = [];
  fTechStack.map((item: any) => {
    techStackArr.push(item.id);
  });

  let createdByArr: string[] = [];
  createdBy.map((item: any) => {
    createdByArr.push(item?.name);
  });

  // const totalEntry = adminManageComponentsPost?.payload?.length;
  const totalEntry = manageComponentStore?.manageComponentList?.length;

  const imgArr = ["All", "Available", "Not Available"];
  const statusArr = ["draft", "publish"];

  //search bar - data search
  const searchFilterData = manageComponentStore?.manageComponentList?.filter(
    (item: any) => {
      if (searchWord == "") {
        return item;
      } else if (
        item.title.toLowerCase().includes(searchWord.toLocaleLowerCase())
      ) {
        return item;
      }
    }
  );
  //search bar end

  //pagination start
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

  //reset data
  const handleReset = (e: any) => {
    e.preventDefault();
    Array.from(document.querySelectorAll("select")).forEach(
      (input) => (input.value = "Please Select")
    );
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "Please Select")
    );
    setFTechStack([]);
    setVersionArr([]);
    setTagsArr([]);
    setFFrom(null);
    setFTo(null);
    setFTechstackImage(null);
    setFComponentImage(null);
    setFStatus(null);
    // dispatch(adminTagListGet());
    // dispatch(adminfilterfieldsData());
    manageComponentStore.fetchManageFilteredData();
    // dispatch(techStackList());
    manageComponentStore.fetchTechstacks();

    // dispatch(
    //   adminManageComponentsPostRequest({
    //     from: null,
    //     to: null,
    //     tags: null,
    //     techstackImage: null,
    //     techstack: null,
    //     componentImage: null,
    //     version: null,
    //     status: null,
    //     createdBy: null,
    //     search: null,
    //   })
    // );

    manageComponentStore.fetchManageComponents({
      from: null,
      to: null,
      tags: null,
      techstackImage: null,
      techstack: null,
      componentImage: null,
      version: null,
      status: null,
      createdBy: null,
      search: null,
    });
  };

  const fieldData = {
    from: fFrom,
    to: FTo,
    tags: tagsIdarr.length === 0 ? null : tagsIdarr,
    techstackImage: fTechstackImage,
    techstack: techStackArr.length === 0 ? null : techStackArr,
    componentImage: fComponentImage,
    version: versionsArr.length === 0 ? null : versionsArr,
    status: fStatus,
    createdBy: createdByArr.length === 0 ? null : createdByArr,
    search: searchWord == "" ? null : searchWord,
  };

  const handleApply = () => {
    // dispatch(adminManageComponentsPostRequest(fieldData));
    manageComponentStore.fetchManageComponents(fieldData);
  };

  useEffect(() => {
    document.body.className = "app d-flex flex-column h-100  nav-light";
    manageComponentStore.fetchManageComponents(fieldData);
    manageComponentStore.fetchAdminTagList();
    manageComponentStore.fetchTechstacks();
    manageComponentStore.fetchManageFilteredData();
  }, []);

  useEffect(() => {
    document.body.className = "app d-flex flex-column h-100  nav-light";

    // dispatch(adminManageComponentsPostRequest(fieldData));
    // dispatch(adminTagListGet());
    // dispatch(adminfilterfieldsData());
    // dispatch(techStackList());
  }, [dispatch]);

  // import Git data
  const handleImport = async () => {
    await manageComponentStore.fetchAdminSyncTechstack();
    if (manageComponentStore?.adminSyncTechstack?.status) {
      await manageComponentStore.fetchAdminSyncComponents();
      if (manageComponentStore?.adminSyncComponents?.status) {
        await manageComponentStore.fetchAdminSyncFiles();
        if (manageComponentStore?.adminSyncFiles?.status) {
          toast.success("Data Imported Successfully");
        }
      }
    }
  };

  return (
    <Fragment>
      <div className="app d-flex flex-column h-100 nav-light">
        <header>
          <ComponentHeader />
          <ComponentNavbar />
        </header>
        {/* <!-- Main container --> */}
        <main className="flex-shrink-0">
          <section className="section_wrapper_sm">
            <div className="container container-fluid">
              <div className="tile_wrapper">
                <div className="tilewp_header">
                  <div className="tilewp-left">
                    <h3 className="tilewp-title">Manage Components</h3>
                  </div>
                  <div className="tilewp-right">
                    <div className="has-search search-group mr-3">
                      <span className="las la-search form-control-feedback"></span>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={(e: any) => setSearchWord(e.target.value)}
                      />
                    </div>

                    <div className="btn-groups">
                      <Link
                        to="#"
                        className="btn btn-primary btn-i "
                        data-toggle="modal"
                        data-target="#myModal2"
                      >
                        {" "}
                        <i className="las la-filter"></i>
                      </Link>
                    </div>
                    <div className="form-group-btn d-flex align-items-center justify-content-center ">
                      <button
                        className="btn btn-primary"
                        onClick={handleImport}
                      >
                        Import
                      </button>
                      <ToastContainer />
                    </div>
                  </div>
                </div>
                <div className="tilewp-body">
                  <div className="table-responsive table_custom">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Component Image</th>
                          <th>Tech Stack</th>
                          <th>Techstack Image</th>
                          <th>Git Link</th>
                          <th>Version</th>
                          <th>Author</th>
                          <th>Status</th>
                          <th>Created On</th>
                          <th>Git Updated Date</th>
                          <th>Last Updated By</th>
                          <th>Last Updated On</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {manageComponentStore?.manageComponentList?.length !==
                      0 ? (
                        <tbody>
                          {searchData?.map((data: any) => {
                            return (
                              <tr>
                                <td>{data?.id}</td>
                                <td>
                                  <Link to={`/View_Component/${data?.id}`}>
                                    {data?.title}
                                  </Link>
                                </td>
                                <td>
                                  <img
                                    src={
                                      data?.componentimage === null
                                        ? noImage
                                        : data?.componentimage
                                    }
                                    className="img-sm"
                                    alt="No_Image"
                                  />{" "}
                                </td>
                                <td>{data?.techstack}</td>
                                <td>
                                  <img
                                    src={
                                      data?.techimage === null
                                        ? noImage
                                        : data?.techimage
                                    }
                                    className="img-sm"
                                    alt="No_Image"
                                  />{" "}
                                </td>
                                <td>
                                  <a href={data?.gitlab_url} className="link">
                                    Git Url
                                  </a>
                                </td>
                                <td>{data?.version}</td>
                                <td>{data?.Author_name}</td>
                                <td>{data?.status}</td>
                                <td>
                                  {moment(data?.createdOn)
                                    .utc()
                                    .format("MMM DD,YYYY")}
                                </td>
                                <td>
                                  {" "}
                                  {moment(data?.git_updated_at)
                                    .utc()
                                    .format("MMM DD,YYYY")}
                                </td>
                                <td>{data?.updated_by}</td>
                                <td>
                                  {data?.modifiedOn === null
                                    ? "---"
                                    : moment(data?.modifiedOn)
                                        .utc()
                                        .format("MMM DD,YYYY")}
                                </td>
                                <td>
                                  <Link
                                    to={`/Edit_Components/${data?.id}`}
                                    className="editicon"
                                  >
                                    <i className="las la-pen"></i>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      ) : (
                        <h5>No Data Found</h5>
                      )}
                    </table>
                  </div>
                </div>

                {manageComponentStore?.manageComponentList?.length !== 0 ? (
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
            </div>
          </section>
        </main>
        {/* <!-- Footer --> */}
        <ComponentFooter />
        {/* <!-- Modal --> */}
        <div
          className="modal modal_custom fade"
          id="myModal2"
          tabIndex={1}
          role="dialog"
          data-backdrop="static"
          data-keyboard="false"
          aria-labelledby="myModalLabel2"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Filters</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="las la-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="grid_wrapper grid-2">
                  <div className="form-group">
                    <label className="control-label">
                      Tech Stack <span className="text-danger">*</span>
                    </label>
                    <Multiselect
                      options={manageComponentStore?.techStacks?.map(
                        (item: any) => {
                          return item;
                        }
                      )}
                      displayValue="name"
                      selectedValues={fTechStack}
                      onSelect={setFTechStack}
                      onRemove={setFTechStack}
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Frameworks</label>
                    <Multiselect
                      options={manageComponentStore?.adminTagList?.frameworks?.map(
                        (item: any) => {
                          return item;
                        }
                      )}
                      displayValue="name"
                      id="id"
                      selectedValues={frameworkArr}
                      onSelect={setFrameworkArr}
                      onRemove={setFrameworkArr}
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Version</label>
                    <Multiselect
                      options={manageComponentStore?.manageFilteredList?.version?.map(
                        (item: any) => {
                          return item;
                        }
                      )}
                      displayValue="name"
                      id="id"
                      selectedValues={versionArr}
                      onSelect={setVersionArr}
                      onRemove={setVersionArr}
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Tags</label>
                    <Multiselect
                      options={manageComponentStore?.adminTagList?.tags?.map(
                        (item: any) => {
                          return item;
                        }
                      )}
                      displayValue="name"
                      id="id"
                      selectedValues={tagsArr}
                      onSelect={setTagsArr}
                      onRemove={setTagsArr}
                    />
                  </div>

                  <div className="form-group">
                    <label className="control-label">Created By</label>
                    <Multiselect
                      options={manageComponentStore?.manageFilteredList?.author?.map(
                        (item: any) => {
                          return item;
                        }
                      )}
                      displayValue="name"
                      selectedValues={createdBy}
                      onSelect={setCreatedBy}
                      onRemove={setCreatedBy}
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Status</label>
                    <select
                      className="custom-select form-control minimal"
                      onChange={(e: any) => setFStatus(e.target.value)}
                    >
                      <option selected>Select Option</option>
                      {statusArr?.map((data: string) => {
                        return <option>{data}</option>;
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Tech Stack Image</label>
                    <select
                      className="custom-select form-control minimal"
                      onChange={(e: any) => setFTechstackImage(e.target.value)}
                    >
                      <option selected>Select Option</option>
                      {imgArr?.map((value: string) => {
                        return <option>{value}</option>;
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Created From</label>
                    <div className="input-group custom-datepicker">
                      <input
                        type="date"
                        className="form-control demoDate"
                        placeholder="Select Date"
                        aria-label="Select Datee"
                        onChange={(e: any) => setFFrom(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Component Image</label>
                    <select
                      className="custom-select form-control minimal"
                      onChange={(e: any) => setFComponentImage(e.target.value)}
                    >
                      <option selected>Select Option</option>
                      {imgArr?.map((value: string) => {
                        return <option>{value}</option>;
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Created To</label>
                    <div className="input-group custom-datepicker">
                      <input
                        type="date"
                        className="form-control demoDate "
                        placeholder="Select Date"
                        aria-label="Select Date"
                        min={fFrom == null ? "" : fFrom}
                        onChange={(e: any) => setFTo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="form-group-btn d-flex align-items-center justify-content-center ">
                  <button
                    className="btn apply btn-outline-primary"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    className="btn reset btn-primary"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleApply}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default observer(Manage_Components);
