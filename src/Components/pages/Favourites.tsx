import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ComponentFooter from "./Component_Footer";
import ComponentHeader from "./Component_Header";
import star4 from "../../images/4star.svg";
import star3 from "../../images/3star.svg";
import star2 from "../../images/2star.svg";
import star1 from "../../images/1star.svg";
import star5 from "../../images/5star.svg";
import noStar from "../../images/nostar.svg";
import { AppDispatch } from "../../redux/store";
import {
  addRemoveFevorites,
  favouriteSearchList,
} from "../../redux/action/userAction";
import { toast, ToastContainer } from "react-toastify";
import ComponentNavbar from "./componentNavbar";
import { FavouriteData } from "./InterfaceTypes";

function Favourites() {
  const dispatch = useDispatch<AppDispatch>();
  const { searchFavourtiesList } = useSelector(
    (state: any) => state?.searchFavourtiesList
  );

  const datanumber = 3;
  const [noOfComponent, setNoOfComponent] = useState(datanumber);
  const [search, setSearch] = useState(null);
  const [viewType, setViewType] = useState(true);
  const loadMore = () => {
    setNoOfComponent(noOfComponent + datanumber);
  };

  const userFavouriteData = searchFavourtiesList?.payload?.slice(
    0,
    noOfComponent
  );

  const handleSearch = (e: any) => {
    dispatch(favouriteSearchList(e?.target?.value));
  };

  const handleRemoveFav = async (e: any, id: number | null | undefined) => {
    e.preventDefault();
    const favResponse: any = await dispatch(addRemoveFevorites(id, false));
   
    if (favResponse?.status) {
      toast.success("Data Removed from My Favourites");
      dispatch(favouriteSearchList(null));
      var btn = document.getElementById("modalClose");
      btn?.click();
    }
  };

  useEffect(() => {
    document.body.className = "app nav-light d-flex flex-column h-100";
    dispatch(favouriteSearchList(null));
  }, []);

  return (
    <Fragment>
      <div className="app nav-light d-flex flex-column h-100">
        <header>
          <ComponentHeader />
          <div className="nav-scroller bg-blue shadow-sm">
            <ComponentNavbar />
          </div>
        </header>
        {/* <!-- Main container --> */}
        <main className="flex-shrink-0">
          <div className="my_favourites_wrapper bg-light ">
            <section className="container">
              <div className="p-4 search_list_wrapper">
                <div className="page-title mb-4">
                  <h4>My Favourites</h4>
                  <div className="page-title-rt">
                    <div className="input-group mr-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search here"
                        onChange={handleSearch}
                        // onChange={(e: any) => setSearch(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary"
                          type="button"
                          // onClick={handleSearch}
                        >
                          <i className="ra ra-search"></i>
                        </button>
                      </div>
                    </div>{" "}
                    <button
                      onClick={() => setViewType(true)}
                      className="btn btn-link active"
                    >
                      {" "}
                      <i className="ra ra-list_act mr-0"></i>{" "}
                    </button>
                    <button
                      onClick={() => setViewType(false)}
                      className="btn btn-link"
                    >
                      {" "}
                      <i className="ra ra-grid mr-0"></i>{" "}
                    </button>
                  </div>
                </div>
                <ToastContainer />

                {viewType === true ? (
                  <div className="grid_wrapper  grid-1">
                    {userFavouriteData?.map((data: FavouriteData) => {
                      return (
                        <div className="card  card-boxshadow">
                          <div className="card_head mb-2">
                            <div className="card_icon">
                              <img
                                src={data?.componentimage}
                                alt="Technology"
                              />
                            </div>
                            <div className="cardhead_info">
                              <div className="cardhead_info_lt">
                                <h4 className="card_title">
                                  {" "}
                                  <Link to={`/View_Component/${data?.id}`}>
                                    {data.title}
                                  </Link>
                                </h4>
                                <div className="cardsub_title">
                                  <img
                                    src={data?.techimage}
                                    alt="tech logo"
                                    className="mr-2"
                                  />{" "}
                                  {data?.techstack}
                                </div>
                              </div>
                              <div className="cardhead_info_rt">
                                <Link
                                  to=""
                                  className="btn-favorite"
                                  data-toggle="modal"
                                  data-target="#deleteModal"
                                >
                                  <i className="ra ra-trash"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                          {/* <!-- remove from favourites Modal --> */}
                          <div
                            className="modal fade"
                            id="deleteModal"
                            tabIndex={-1}
                            role="dialog"
                            aria-labelledby="deleteModalLabel"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog modal-dialog-centered"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="deleteModalLabel"
                                  >
                                    Confirm Deletion
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    id="modalClose"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <div className="delete-detail">
                                    <p className="my-2">
                                      Are you sure you want to remove this
                                      component from the Favourite list?
                                    </p>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    aria-label="Close"
                                    onClick={(e: any) =>
                                      handleRemoveFav(e, data?.id)
                                    }
                                  >
                                    Yes
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card_body card_pl">
                            <p className="text-ellipsis--2 mb-2">
                              {data?.description}
                            </p>
                          </div>
                          <div className="card_footer card_ml">
                            <div className="card_footer_lt">
                              <div className="star_rating ">
                                <img
                                  src={
                                    data?.avgRating === 3
                                      ? star3
                                      : "" || data?.avgRating === 2
                                      ? star2
                                      : "" || data?.avgRating === 1
                                      ? star1
                                      : "" || data?.avgRating === 4
                                      ? star4
                                      : "" || data?.avgRating === 5
                                      ? star5
                                      : "" || data?.avgRating === null
                                      ? noStar
                                      : "" || data?.avgRating === undefined
                                      ? noStar
                                      : ""
                                  }
                                  alt="rating"
                                  className="mr-2"
                                />
                                {data?.reviewCount}
                              </div>
                            </div>
                            <div className="card_footer_rt">
                              <div className="card_label mr-3">
                                <i className="ra ra-eye_open"></i> {data?.views}
                              </div>
                              <div className="card_label mr-3">
                                <i className="ra ra-download"></i>{" "}
                                {data?.downloads}
                              </div>
                              <div className="card_label_auth">
                                {data?.Author_name} on{" "}
                                {moment(data?.createdOn)
                                  .utc()
                                  .format("MMM DD,YYYY")}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid_wrapper grid-3">
                    {userFavouriteData?.map((data: FavouriteData) => {
                      return (
                        <div className="card  card-boxshadow">
                          <div className="card_head mb-2">
                            <div className="card_icon">
                              <img
                                src={data?.componentimage}
                                alt="Technology"
                              />
                            </div>
                            <div className="cardhead_info">
                              <div className="cardhead_info_lt">
                                <h4 className="card_title">
                                  <Link to={`/View_Component/${data?.id}`}>
                                    {data.title}
                                  </Link>
                                </h4>
                                <div className="cardsub_title">
                                  <img
                                    src={data?.techimage}
                                    alt="tech logo"
                                    className="mr-2"
                                  />{" "}
                                  {data?.techstack}
                                </div>
                              </div>
                              <div className="cardhead_info_rt">
                                <Link
                                  to=""
                                  className="btn-favorite"
                                  data-toggle="modal"
                                  data-target="#deleteModal"
                                >
                                  <i className="ra ra-trash"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                          {/* <!-- remove from favourites Modal --> */}
                          <div
                            className="modal fade"
                            id="deleteModal"
                            tabIndex={-1}
                            role="dialog"
                            aria-labelledby="deleteModalLabel"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog modal-dialog-centered"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="deleteModalLabel"
                                  >
                                    Confirm Deletion
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    id="modalClose"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <div className="delete-detail">
                                    <p className="my-2">
                                      Are you sure you want to remove this
                                      component from the Favourite list?
                                    </p>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    aria-label="Close"
                                    onClick={(e: any) =>
                                      handleRemoveFav(e, data?.id)
                                    }
                                  >
                                    Yes
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card_body">
                            <p className="text-ellipsis--2 mb-2">
                              {data?.description}
                            </p>
                          </div>
                          <div className="card_subfooter">
                            <div className="card_footer_lt">
                              <div className="star_rating ">
                                <img
                                  src={
                                    data?.rating === 3
                                      ? star3
                                      : "" || data?.rating === 2
                                      ? star2
                                      : "" || data?.rating === 1
                                      ? star1
                                      : "" || data?.rating === 4
                                      ? star4
                                      : "" || data?.rating === 5
                                      ? star5
                                      : "" || data?.rating === null
                                      ? noStar
                                      : "" || data?.rating === undefined
                                      ? noStar
                                      : ""
                                  }
                                  alt="rating"
                                  className="mr-2"
                                />
                                1.3 K
                              </div>
                            </div>
                          </div>
                          <div className="card_footer ">
                            <div className="card_footer_rt">
                              <div className="card_label mr-3">
                                <i className="ra ra-eye_open"></i> {data?.views}
                              </div>
                              <div className="card_label ">
                                <i className="ra ra-download"></i>{" "}
                                {data?.downloads}
                              </div>
                            </div>
                            <div className="card_label_auth">
                              {data?.Author_name} on
                              {moment(data?.createdOn)
                                .utc()
                                .format("MMM DD,YYYY")}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {searchFavourtiesList?.payload?.length > datanumber &&
                noOfComponent <= searchFavourtiesList?.payload?.length ? (
                  <div className="d-flex align-items-center justify-content-center py-4">
                    <Link
                      to=""
                      onClick={loadMore}
                      className="btn btn-outline-primary"
                    >
                      Load More
                    </Link>
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </main>
        <ComponentFooter />
      </div>
    </Fragment>
  );
}

export default Favourites;
