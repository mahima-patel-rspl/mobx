import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import SecureLS from "secure-ls";
import { useDispatch, useSelector } from "react-redux";
import {
  topcategories,
  RecentlyAdded,
  favouritesList,
  totalViewsFun,
  totalDownload,
  totalComponents,
  mostViewed,
  myContribution,
  pendingItems,
  leaderboards,
  MyInterestsAdd,
} from "../../redux/action/userAction";
import { AppDispatch } from "../../redux/store";
import ComponentHeader from "./Component_Header";
import ComponentFooter from "./Component_Footer";
import { getToken } from "./auth/authUser";
import { fetchUserProfile } from "../../redux/action/userAction";
import jwt_decode from "jwt-decode";
import {
  FavouritesData,
  MostViewedData,
  PendingItemsData,
  RecentlyData,
  RemainingLeadersData,
  TopCategoriesData,
  SearchData,
  Top3LeadersData,
  Mycontributions,
} from "./InterfaceTypes";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";

function Dashboard(): JSX.Element {
  const {
    rootStore: { userStore, dashTopCategoriesStore },
  } = useStore();

  const ls = new SecureLS();
  const dispatch = useDispatch<AppDispatch>();
  const bg = [
    "bg_skyblue",
    "bg_skyred",
    "bg_skynavi",
    "bg_skygreen",
    "bg_skydarkblue",
    "bg_skyorange",
    "bg_skyblue",
    "bg_skyred",
    "bg_skynavi",
    "bg_skygreen",
    "bg_skydarkblue",
    "bg_skyorange",
  ];
  const location = useLocation();
  useEffect(() => {
    document.body.className = "app nav-light d-flex flex-column h-100";
    // dispatch(topcategories(10));
    dashTopCategoriesStore.fetchCategories(10);
    dispatch(RecentlyAdded());
    dispatch(totalViewsFun());
    dispatch(totalDownload());
    dispatch(totalComponents());
    // dispatch(fetchUserProfile(data));
    userStore.fetchUser(data);
    dispatch(mostViewed("week"));
    dispatch(myContribution());
    dispatch(pendingItems());
    dispatch(favouritesList());
    dispatch(leaderboards(leaderBoardoptions));

    console.log(
      "DashTopCategoriesStore",
      dashTopCategoriesStore.categories[0].id
    );
  }, []);
  //debugger;
  useEffect(() => {
    callTechStackModal();
  }, [location?.pathname]);

  const [techStackId] = useState<Array<string>>([]);
  const [dataId, setDataId] = useState<object>([]);
  // const { categories } = useSelector((state: any) => state?.topcategories);
  const categoriesList = dashTopCategoriesStore.categories;

  const { Recentlydata } = useSelector((state: any) => state?.RecentlyAdded);
  const { totalViews } = useSelector((state: any) => state?.totalViews);
  const { totalDownloads } = useSelector((state: any) => state?.totalDownload);
  const { totalComponent } = useSelector(
    (state: any) => state?.totalComponents
  );

  // const { fetchUserProfileData } = useSelector(
  //   (state: any) => state?.fetchUserProfile
  // );
  const { mostViewedData } = useSelector((state: any) => state?.mostViewed);
  const tokenString: string = getToken();

  var decoded: any = jwt_decode(tokenString);

  const data = { search: decoded?.email };
  // const fullName = fetchUserProfileData?.payload?.[0]?.name;
  const fullName: any = userStore?.user[0]?.name;

  const { leaderboardData } = useSelector(
    (state: any) => state?.leaderboardData
  );
  const { favouritesData } = useSelector((state: any) => state?.favouritesData);
  const { pendingItemsdata } = useSelector(
    (state: any) => state?.pendingItemsdata
  );
  const { userContribution } = useSelector(
    (state: any) => state?.userContribution
  );

  const [leaderBoardoptions, setLeaderBoardoptions] = useState("today");

  // load More Data
  const datanumber = 4;
  const [noOfComponent, setNoOfComponent] = useState(datanumber);
  // const SearchData = categories?.payload?.slice(0, noOfComponent);
  const loadMore = () => {
    setNoOfComponent(noOfComponent + datanumber);
  };

  // call Modal
  const callTechStackModal = async () => {
    var btn = document.getElementById("callModal");
    var userStatus = ls?.get("isNewUser");
    if (userStatus?.data) {
      await btn?.click();
    }
  };
  const top3LeadersData = leaderboardData?.payload?.slice(0, 3);
  const remainingLeadersData = leaderboardData?.payload?.slice(
    3,
    leaderboardData?.payload?.length
  );

  //Load more myContribution
  const ContributionDataNumber = 3;
  const [noOfContribution, setNoOfContribution] = useState(
    ContributionDataNumber
  );
  const [disableContributionPrevButton, setDisableContributionPrevButton] =
    useState(false);
  const [disableContributionNextButton, setDisableContributionNextButton] =
    useState(false);

  const SearchContributionData = userContribution?.payload?.slice(
    noOfContribution - ContributionDataNumber,
    noOfContribution
  );
  const loadMoreIncContribution = () => {
    if (noOfContribution >= userContribution?.payload?.length) {
      setDisableContributionNextButton(true);
    } else {
      setNoOfContribution(noOfContribution + ContributionDataNumber);
      setDisableContributionNextButton(false);
    }

    if (noOfContribution <= ContributionDataNumber) {
      setDisableContributionPrevButton(false);
    }
  };
  const loadMoreDecContribution = () => {
    if (noOfContribution <= ContributionDataNumber) {
      setDisableContributionPrevButton(true);
    } else {
      setNoOfContribution(noOfContribution - ContributionDataNumber);
      setDisableContributionPrevButton(false);
    }

    if (noOfContribution >= userContribution?.payload?.length) {
      setDisableContributionNextButton(false);
    }
  };
  //Load more Favourites
  const FavouritesDataNumber = 3;
  const [noOfFavourites, setNoOfFavourites] = useState(FavouritesDataNumber);
  const SearchFavouritesData = favouritesData?.payload?.slice(
    0,
    noOfFavourites
  );

  const loadMoreIncFavourites = () => {
    setNoOfFavourites(noOfFavourites + FavouritesDataNumber);
  };
  const loadMoreDecFavourites = () => {
    setNoOfFavourites(noOfFavourites - FavouritesDataNumber);
  };

  //Load more  pendingItem
  const pendingItemDataNumber = 3;
  const [noOfpendingItem, setNoOfpendingItem] = useState(pendingItemDataNumber);
  const SearchpendingItemData = pendingItemsdata?.payload?.slice(
    0,
    noOfpendingItem
  );

  const loadMoreIncpendingItem = () => {
    setNoOfpendingItem(noOfpendingItem + pendingItemDataNumber);
  };
  const loadMoreDecpendingItem = () => {
    setNoOfpendingItem(noOfpendingItem - pendingItemDataNumber);
  };

  const handleClick = (e: any): void => {
    let dataTechStackId = techStackId;

    if (e.target.checked) {
      dataTechStackId.push(e?.target?.value);
    } else {
      var indexTechStackId = dataTechStackId.indexOf(e?.target?.value);
      dataTechStackId.splice(indexTechStackId, 1);
    }
    setDataId({ ...dataId, techstackid: dataTechStackId });
  };

  const handelMyInterests = (e: any): void => {
    e.preventDefault();

    dispatch(MyInterestsAdd(dataId));
    var btn = document.getElementById("closeModal");
    btn?.click();

    ls?.set("isNewUser", { data: false });
  };

  useEffect(() => {
    dispatch(leaderboards(leaderBoardoptions));
  }, [leaderBoardoptions]);

  // mostViewed selectDuration
  const selectDuration = async (e: { target: { value: string } }) => {
    await dispatch(mostViewed(e?.target?.value));
  };

  return (
    <div className="app nav-light d-flex flex-column h-100">
      <Fragment>
        <ComponentHeader />
      </Fragment>
      <Fragment>
        <div className="flex-shrink-0">
          <div className="dashboard_wrapper bg-light ">
            <div className="dashboard_lt">
              <h2 className="mb-4">
                Welcome Back {fullName?.match(/^([^ ]*)/)[1]}!
              </h2>

              <div className="grid-row grid_wrapper grid-3">
                <div className="card">
                  <div className="icon-box bg_grad_orange">
                    <i className="ra ra-components"></i>
                  </div>
                  <div className="card_title">
                    <h4>
                      <Link to="/reusableComponent">Reusable Components</Link>{" "}
                    </h4>
                  </div>
                  <p className="mb-0 gray_txt">
                    Expedite your development with modular, easy to scale,
                    consistent and tested components.
                  </p>
                </div>
                <div className="card">
                  <div className="icon-box bg_grad_blue">
                    <i className="ra ra-bulb"></i>
                  </div>
                  <div className="card_title">
                    <h4>
                      <Link to="#">Ideation Portal</Link>{" "}
                    </h4>
                  </div>
                  <p className="mb-0 gray_txt">
                    Participate in Innovation by submitting the ideas and
                    support other’s ideas by voting.
                  </p>
                </div>
                <div className="card">
                  <div className="icon-box bg_grad_yellow">
                    <i className="ra ra-analytics"></i>
                  </div>
                  <div className="card_title">
                    <h4>
                      <Link to="#">Analytics</Link>
                    </h4>
                  </div>
                  <p className="mb-0 gray_txt">
                    Lorem Ipsum generators on the Internet tend to repeat
                    predefined chunks as necessary, making this the first.
                  </p>
                </div>
              </div>

              <div className="grid_parent grid_parent_wrapper">
                <div className="card div1">
                  <div className="card_title">
                    <h3>Top Categories</h3>
                  </div>
                  <div className="categories_list">
                    <ul>
                      {categoriesList?.map((item: any, index: number) => {
                        return (
                          <Fragment>
                            <li>
                              <div className={`categories_img   ${bg[index]}`}>
                                <img
                                  style={{ height: "90px", width: "90px" }}
                                  src={item?.avatar_url}
                                  alt="avtarImage"
                                />
                                <span className="badge badge-pill badge-primary">
                                  {item?.total_components}
                                </span>
                              </div>
                              <div className="categories_label">
                                <Link to={`/Search_list/${item?.name}`}>
                                  {item?.name}
                                </Link>
                              </div>
                            </li>
                          </Fragment>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="card div2">
                  <div className="card_title d-flex justify-content-between mb-3">
                    <h3>Most Viewed</h3>
                    <div className="form-group">
                      <select
                        onChange={selectDuration}
                        className="custom-select form-control minimal"
                      >
                        <option value="week" selected>
                          Past week
                        </option>

                        <option value="month">Past Month</option>
                        <option value="year">Past Year</option>
                        <option value="all">All Time</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid_wrapper grid-2">
                    {mostViewedData?.payload?.map((data: MostViewedData) => {
                      return (
                        <Fragment>
                          <div className="blocks">
                            <Link to={`/View_Component/${data?.componentId}`}>
                              {" "}
                              {data?.display_name}{" "}
                              <span className="badge badge-pill badge-primary py-2 px-4 ml-3">
                                {data?.views} views
                              </span>{" "}
                            </Link>
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>
                </div>

                <div className="card div3">
                  <div className="card_title">
                    <h3>Recently Added</h3>
                  </div>
                  <div className="recentlyadded_list">
                    <ul>
                      {Recentlydata?.payload?.map((data: RecentlyData) => {
                        return (
                          <Fragment>
                            <li>
                              <div className="recentlyadd_label">
                                <Link to={`/View_Component/${data?.id}`}>
                                  <h6>{data?.display_name}</h6>
                                  <span>
                                    {" "}
                                    {moment(data?.createdAt)
                                      .utc()
                                      .format("MMM DD,YYYY")}
                                  </span>
                                </Link>
                              </div>
                            </li>
                          </Fragment>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card_title">
                  <h3>My Space</h3>
                </div>
                <div className="tablist">
                  <ul
                    className="nav nav-pills mb-3"
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
                        My Favourites({favouritesData?.payload?.length})
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
                        My Pending Items ({pendingItemsdata?.payload?.length})
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
                        My Contributions ({userContribution?.payload?.length})
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-overivew"
                      role="tabpanel"
                      aria-labelledby="pills-overivew-tab"
                    >
                      <div className="tab-content-body">
                        <div className="d-flex align-items-center justify-content-between mb-5">
                          <h3 className="mb-0">My Favourites</h3>
                          <div className="pagination ml-4 mt-0 justify-content-end">
                            <span className="btn btn-prev btn-icon">
                              <button
                                style={{
                                  border: "none",
                                  background: "none",
                                }}
                                onClick={loadMoreDecFavourites}
                              >
                                <i className="ra ra-arrow_right_sm"></i>
                              </button>
                            </span>
                            <span className="btn btn-next btn-icon">
                              <button
                                style={{
                                  border: "none",
                                  background: "none",
                                }}
                                onClick={loadMoreIncFavourites}
                              >
                                <i className="ra ra-arrow_right_sm"></i>
                              </button>
                            </span>
                          </div>
                        </div>
                        <div className="card_wrapper mt-3">
                          {SearchFavouritesData?.map((data: FavouritesData) => {
                            return (
                              <Fragment>
                                <div className="card">
                                  <div className="card_head mb-2">
                                    <div className="card_icon">
                                      <img
                                        src={data?.componentimage}
                                        alt="Technology"
                                      />
                                    </div>
                                    <div className="cardhead_info">
                                      <h4 className="card_title">
                                        {" "}
                                        <Link
                                          to={`/View_Component/${data?.id}`}
                                        >
                                          {data?.display_name}
                                        </Link>
                                      </h4>
                                      <div className="cardsub_title">
                                        {data?.techstack}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card_body card_pl">
                                    <p className="text-ellipsis--2 mb-2">
                                      {data?.description}
                                    </p>
                                  </div>
                                  <div className="card_footer">
                                    <div className="card_footer_rt">
                                      <div className="card_label mr-3"></div>
                                      <div className="card_label mr-3"></div>
                                      <div className="card_label_auth">
                                        {data?.Author_name} on{" "}
                                        {moment(data?.createdOn)
                                          .utc()
                                          .format("MMM DD,YYYY")}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-changelog"
                      role="tabpanel"
                      aria-labelledby="pills-changelog-tab"
                    >
                      <div className="tab-content-body">
                        <div className="d-flex align-items-center justify-content-between mb-5">
                          <h3 className="mb-0">My Pending Items</h3>
                          <div className="pagination ml-4 mt-0 justify-content-end">
                            <span className="btn btn-prev btn-icon">
                              <button
                                style={{
                                  border: "none",
                                  background: "none",
                                }}
                                onClick={loadMoreDecpendingItem}
                              >
                                <i className="ra ra-arrow_right_sm"></i>
                              </button>
                            </span>
                            <span className="btn btn-next btn-icon">
                              <button
                                style={{
                                  border: "none",
                                  background: "none",
                                }}
                                onClick={loadMoreIncpendingItem}
                              >
                                <i className="ra ra-arrow_right_sm"></i>
                              </button>
                            </span>
                          </div>
                        </div>

                        <div className="card_wrapper mt-3">
                          {SearchpendingItemData?.map(
                            (data: PendingItemsData) => {
                              return (
                                <Fragment>
                                  <div className="card">
                                    <div className="card_head mb-2">
                                      <div className="card_icon">
                                        <img
                                          src={data?.image_url}
                                          alt="Technology"
                                        />
                                      </div>
                                      <div className="cardhead_info">
                                        <h4 className="card_title">
                                          {" "}
                                          <Link
                                            to={`/Edit_Components/${data?.id}`}
                                          >
                                            {data?.display_name}
                                          </Link>
                                        </h4>
                                        <div className="cardsub_title">
                                          {data?.techstack?.name}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="card_body card_pl">
                                      <p className="text-ellipsis--2 mb-2">
                                        {data?.description}
                                      </p>
                                    </div>
                                    <div className="card_footer">
                                      <div className="card_footer_rt">
                                        <div className="card_label mr-3"></div>
                                        <div className="card_label mr-3"></div>
                                        <div className="card_label_auth">
                                          {data?.author_name} on{" "}
                                          {moment(data?.draftAt)
                                            .utc()
                                            .format("MMM DD,YYYY")}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Fragment>
                              );
                            }
                          )}
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
                        <div className="d-flex align-items-center justify-content-between mb-5">
                          <h3 className="mb-0">My Contributions</h3>
                          <div className="pagination ml-4 mt-0 justify-content-end">
                            <span
                              className="btn btn-prev btn-icon"
                              onClick={loadMoreDecContribution}
                            >
                              <button
                                disabled={disableContributionPrevButton}
                                style={{
                                  border: "none",
                                  background: "none",
                                }}
                              >
                                <i className="ra ra-arrow_right_sm"></i>
                              </button>
                            </span>
                            <span
                              className="btn btn-next btn-icon"
                              onClick={loadMoreIncContribution}
                            >
                              <button
                                disabled={disableContributionNextButton}
                                style={{
                                  border: "none",
                                  background: "none",
                                }}
                              >
                                <i className="ra ra-arrow_right_sm"></i>
                              </button>
                            </span>
                          </div>
                        </div>

                        <div className="card_wrapper d-block mt-3">
                          {SearchContributionData?.map(
                            (data: Mycontributions) => {
                              return (
                                <Fragment>
                                  <div className="card my-3">
                                    <div className="card_body card_pl d-flex align-items-center justify-content-between pl-0">
                                      <p className="text-ellipsis--2 mb-0 h-auto">
                                        {data?.text}
                                      </p>
                                      <div className="date_lable">
                                        {" "}
                                        {moment(data?.date)
                                          .utc()
                                          .format("MMM DD,YYYY")}
                                      </div>
                                    </div>
                                  </div>
                                </Fragment>
                              );
                            }
                          )}
                        </div>
                      </div>
                      {/* {userContribution?.payload?.data?.length >
                      noOfContribution ? (
                        <div className="d-flex align-items-center justify-content-center py-4">
                          <Link
                            to=""
                            onClick={loadMoreContribution}
                            className="btn btn-outline-primary"
                          >
                            Load More
                          </Link>
                        </div>
                      ) : null} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard_rt">
              <div className="quicklink_wrapper">
                <div className="quicklink_top">
                  <div className="quicklink_status_box bg_puple">
                    <div className="quick_status_label">
                      <i className="ra ra-components"></i> Components
                    </div>
                    <div className="quick_tatus_number">
                      {totalComponent?.payload?.components}
                    </div>
                  </div>
                  <div className="quicklink_status_box bg_pink_dark">
                    <div className="quick_status_label">
                      <i className="ra ra-eye3"></i> Total Views
                    </div>
                    <div className="quick_tatus_number">
                      {totalViews?.payload}
                    </div>
                  </div>
                  <div className="quicklink_status_box bg_green">
                    <div className="quick_status_label">
                      <i className="ra ra-download2"></i> Total Downloads
                    </div>
                    <div className="quick_tatus_number">
                      {totalDownloads?.payload}
                    </div>
                  </div>
                </div>
                <div className="quicklink_links">
                  <Link to="/reusableComponent">
                    Search Reusable Components
                  </Link>
                  <Link to="/Favourites">Favourite Reusable Components</Link>
                  <Link to="/Manage_Components">Manage Component</Link>
                </div>
                <div className="leaderboard_wrapper">
                  <h4>Leaderboard</h4>
                  <div className="tablist">
                    <ul
                      className="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-today-tab"
                          data-toggle="pill"
                          data-target="#pills-today"
                          type="button"
                          role="tab"
                          aria-controls="pills-today"
                          aria-selected="true"
                          onClick={() => setLeaderBoardoptions("today")}
                        >
                          Today
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-Week-tab"
                          data-toggle="pill"
                          data-target="#pills-Week"
                          type="button"
                          role="tab"
                          aria-controls="pills-Week"
                          aria-selected="false"
                          onClick={() => setLeaderBoardoptions("week")}
                        >
                          This Week
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-alltime-tab"
                          data-toggle="pill"
                          data-target="#pills-alltime"
                          type="button"
                          role="tab"
                          aria-controls="pills-alltime"
                          aria-selected="false"
                          onClick={() => setLeaderBoardoptions("all")}
                        >
                          All Time
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-today"
                        role="tabpanel"
                        aria-labelledby="pills-today-tab"
                      >
                        <div className="tab-content-body p-0">
                          <div className="leader_list_wrapper">
                            {top3LeadersData?.map((data: Top3LeadersData) => {
                              return (
                                <div className="leader_box">
                                  <div className="leader_img">
                                    <img
                                      src={`data:image/jpeg;base64,${data?.image}`}
                                      className="objectfit_cover"
                                      alt="pic of user"
                                    />
                                    <div className="badge">{data?.rank}</div>
                                  </div>
                                  <div className="leadername">{data?.name}</div>
                                  <div className="leaderpoint">
                                    Points : {data?.score}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="leader_list_vertical">
                            <ul>
                              {remainingLeadersData?.map(
                                (rdata: RemainingLeadersData) => {
                                  return (
                                    <li>
                                      <div className="leaderprofile">
                                        <div className="leaderpro_img">
                                          <img
                                            src={`data:image/jpeg;base64,${rdata?.image}`}
                                            className="objectfit_cover rounded-circle"
                                            alt=""
                                          />
                                        </div>
                                        <div className="leaderpro_info">
                                          <div className="leaderpro_lable">
                                            {rdata?.name}
                                          </div>
                                          <div className="leaderpro_sublable">
                                            Rank {rdata?.rank}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="leaderpro_point">
                                        {rdata?.score} Points
                                      </div>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
      {/* <!-- Modal --> */}
      <button
        style={{ display: "none" }}
        type="button"
        id="callModal"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Choose Your Interest modal
      </button>

      <div
        className="modal fade"
        data-backdrop="static"
        data-keyboard="false"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form onSubmit={handelMyInterests}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Choose Your Interest
                </h5>
                <button
                  type="button"
                  style={{ display: "none" }}
                  id="closeModal"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="grid_wrapper grid-4 chooseint_wrapper">
                  {/* {SearchData?.map((data: SearchData) => {
                    return (
                      <Fragment>
                        <div className="custom-control custom-checkbox image-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            onClick={handleClick}
                            value={data?.id}
                            id={data?.id}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={data?.id}
                          >
                            <img
                              src={data?.avatar_url}
                              // style={{ width: "100px", height: "100px" }}
                              alt="#"
                              className="img-fluid"
                            />
                          </label>
                          <span>{data?.name}</span>
                        </div>
                      </Fragment>
                    );
                  })} */}
                  4
                </div>
                {/* {categories?.payload?.length > noOfComponent ? (
                  <div className="d-flex align-items-center justify-content-center py-4">
                    <Link
                      to=""
                      onClick={loadMore}
                      // className="btn btn-outline-primary"
                    >
                      Load More
                    </Link>
                  </div>
                ) : null} */}
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Fragment>
        <ComponentFooter />
      </Fragment>
    </div>
  );
}

export default observer(Dashboard);
