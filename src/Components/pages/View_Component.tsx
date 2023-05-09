import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import info from "../../images/info.svg";
import { useParams } from "react-router-dom";
import {
  changelogsData,
  downloadCount,
  userViewComponent,
  viewDependencies,
  AllReviewComments,
  AddReviewComments,
  AddReply,
  EditReply,
  DeleteReply,
  raiseIssueSubmit,
  addRemoveFevorites,
  ReviewersList,
} from "../../redux/action/userAction";
import { AppDispatch } from "../../redux/store";
import Component_Footer from "./Component_Footer";
import Component_Header from "./Component_Header";
import star5 from "../../images/5star.svg";
import star4 from "../../images/4star.svg";
import star3 from "../../images/3star.svg";
import star2 from "../../images/2star.svg";
import star1 from "../../images/1star.svg";
import user1 from "../../images/user1.png";
import noStar from "../../images/nostar.svg";
import { useNavigate } from "react-router-dom";
import { roleName, userPermission } from "./auth/authUser";
import { Permissions } from "../../constants/PermissionConstant";
import profilePic from "../../images/profile-photo.png";
import { ReplyCommentData, ViewComponent } from "./InterfaceTypes";
import { toast, ToastContainer } from "react-toastify";
import SecureLS from "secure-ls";
import { Rating } from "@mui/material";
function View_Component() {
  const ls: any = new SecureLS();
  const datanumber = 3;
  const dispatch = useDispatch<AppDispatch>();

  const [reviewId, setReviewId] = useState<any>([]);
  const [formData, setFormData] = useState<any>([]);
  const [issueFormData, setIssueFormData] = useState<any>([]);
  const [replyData, setReplyData] = useState<any>([]);
  const [editReplyData, setEditReplyData] = useState<any>([]);
  const [rating, setRating] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [favIcon, setFavIcon] = useState(false);
  const [viewData, setViewData] = useState<any>([]);
  let compId = useParams();
  const navigate = useNavigate();
  const { viewComponentData } = useSelector(
    (state: any) => state?.viewComponentData
  );

  const { Reviewers } = useSelector((state: any) => state?.Reviewers);

  //reply to Comment

  let allowPermission = userPermission().filter(
    (id: any) => id === Permissions.ReplyToComments
  );

  let allowViewAllPermission = userPermission().filter(
    (id: any) => id === Permissions.ViewAllIssues
  );

  const fullName = ls?.get("username")?.data;
  const profileImage: any = ls?.get("userImg")?.data;
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const postStatusCode: any = await dispatch(
      raiseIssueSubmit(compId.id, issueFormData)
    );
    if (postStatusCode?.status) {
      toast.success("Issue Raised Successfully");
    }

    var btn = document.getElementById("idButtonPost");
    btn?.click();

    navigate("/Issue_Tracker");
  };

  const { AllReviewCommentsData } = useSelector(
    (state: any) => state?.AllReviewComments
  );

  const handleDownload = (e: any) => {
    const componentId = { id: parseInt(viewComponentData?.payload?.id) };
    dispatch(downloadCount(componentId));
    dispatch(userViewComponent(compId.id));
    var btn = document.getElementById("count");
    btn?.click();
    window.location.reload();
  };

  const handleDownloadExtra = (e: any) => {
    const componentId = { id: parseInt(viewComponentData?.payload?.id) };
    dispatch(downloadCount(componentId));
    dispatch(userViewComponent(compId.id));
    var btn = document.getElementById("count");
    btn?.click();
    window.location.reload();
  };

  const [noOfComponent, setNoOfComponent] = useState(datanumber);
  const loadMore = () => {
    setNoOfComponent(noOfComponent + datanumber);
  };
  const RelatedCompData = viewComponentData?.payload?.related_components?.slice(
    0,
    noOfComponent
  );

  const { changeLogs } = useSelector((state: any) => state?.changeLogs);
  const changeLogsData = changeLogs?.payload?.slice(0, 5);
  const { viewDependenciesData } = useSelector(
    (state: any) => state?.viewDependenciesData
  );
  const viewDependenciesItem: any = viewDependenciesData?.payload?.slice(0, 5);

  // load More Comment Data
  const commentDataLimit = 5;
  const [noOfCommentComponent, setNoOfCommentComponent] =
    useState(commentDataLimit);
  const commentData = AllReviewCommentsData?.payload?.slice(
    0,
    noOfCommentComponent
  );
  const loadMoreComment = () => {
    setNoOfCommentComponent(noOfCommentComponent + commentDataLimit);
  };

  const Buttons = () => {
    return (
      <div className="tab_action">
        <a
          href={viewComponentData?.payload?.download}
          target="blank"
          className="btn btn-outline-primary"
          onClick={handleDownloadExtra}
        >
          Download
        </a>
        <a
          href={viewComponentData?.payload?.gitlab_url}
          className="btn btn-outline-primary"
        >
          View Source Code
        </a>
        {/* <a href="#" className="btn btn-outline-primary">
          Request Access
        </a> */}
        <a
          href="#"
          className="btn btn-outline-primary"
          data-toggle="modal"
          data-target="#raiseIssue"
        >
          Raise an Issue
        </a>
      </div>
    );
  };

  const viewCompApiCalls = async () => {
    const data = await dispatch(userViewComponent(compId.id));
    setViewData(data);

    await dispatch(changelogsData(compId.id));
    await dispatch(viewDependencies(compId.id));
    setFormData({
      ...formData,
      componentId: compId.id,
    });
  };

  const handleFavorite = async (id: any, isFav: any) => {
    setFavIcon(!favIcon);
    const flagFav = isFav == 1 ? false : true;
    const favResponse: any = await dispatch(addRemoveFevorites(id, flagFav));
    if (favResponse?.status) {
      toast.success(
        isFav === 1
          ? "Data Removed from My Favourties"
          : "Data Added to My Favourites"
      );
      dispatch(userViewComponent(compId.id));
    }
  };

  const handleReply = () => {
    dispatch(AddReply(replyData));
    var btn = document.getElementById("reviewClose");
    btn?.click();
    setReviewId("none");
    setTimeout(() => {
      dispatch(AllReviewComments(compId.id, "", ""));
    }, 1000);
  };
  const handelReviewSubmit = (e: any) => {
    e.preventDefault();
    e.target.reset();
    dispatch(AddReviewComments(formData));

    var btn = document.getElementById("reviewClose");
    btn?.click();
    setTimeout(() => {
      dispatch(AllReviewComments(compId.id, "", ""));
      dispatch(userViewComponent(compId.id));
    }, 1000);
  };

  const handleEditReply = () => {
    dispatch(EditReply(editReplyData));
    var btn = document.getElementById("reviewClose");
    btn?.click();
    setReviewId("none");
    setTimeout(() => {
      dispatch(AllReviewComments(compId.id, "", ""));
    }, 1000);
  };

  const handleDeleteReply = (id: number): void => {
    dispatch(DeleteReply(id));

    setTimeout(() => {
      dispatch(AllReviewComments(compId.id, "", ""));
    }, 1000);
  };

  useEffect(() => {
    viewCompApiCalls();
    dispatch(ReviewersList());
  }, [dispatch, compId.id]);

  useEffect(() => {
    dispatch(AllReviewComments(compId.id, rating, sortBy));
  }, [rating, sortBy, compId.id]);

  useEffect(() => {
    dispatch(AllReviewComments(compId.id, "", ""));
    setEditReplyData({
      ...editReplyData,
      reviewId: reviewId.id,
      reply: reviewId.reply,
    });
  }, [reviewId.id, reviewId.status, compId.id]);

  return (
    <Fragment>
      <div className="app d-flex flex-column h-100  nav-light">
        <header>
          <Component_Header />
          <div className="nav-scroller bg-blue shadow-sm">
            <nav className="nav nav-underline">
              <Link className="nav-link" to="/reusableComponent">
                Summary
              </Link>
              <Link className="nav-link" to="">
                Search
              </Link>
              <Link className="nav-link" to="/favourites">
                Favourites
              </Link>
              <Link className="nav-link active" to="">
                Component Details
              </Link>
              {roleName() === Permissions.Admin ? (
                <Link className="nav-link" to="/report">
                  Reports
                </Link>
              ) : (
                ""
              )}
              <Link className="nav-link" to="/Issue_Tracker">
                Issue Tracker
              </Link>
            </nav>
          </div>
          <ToastContainer />
        </header>
        {/* <!-- Main container --> */}
        <main className="flex-shrink-0">
          <section className="section_wrapper_sm">
            <div className="container container-fluid">
              <div className="tile_wrapper">
                <div className="tilewp_header">
                  <div className="tilewp-left">
                    <h3 className="tilewp-title">
                      <Link
                        onClick={() => navigate(-1)}
                        to={""}
                        className="link"
                      >
                        <i className="ra ra-back mr-2"></i>Back
                      </Link>{" "}
                    </h3>
                  </div>
                </div>
                <div className="tilewp-body">
                  <div className="tech_detail_wrapper">
                    <div className="tech_detail_header">
                      <div className="tech_detail_lt">
                        <div className="tech_img">
                          <img
                            src={viewComponentData?.payload?.image_url}
                            alt="image_tech"
                          />
                        </div>
                      </div>
                      <a
                        style={{ display: "none" }}
                        href={viewComponentData?.payload?.download_url}
                        target="blank"
                        className="btn btn-outline-primary"
                        id="count"
                        rel="noreferrer"
                      >
                        Download
                      </a>
                      <div className="tech_detail_rt">
                        <div className="tech_detail_rt_top">
                          <div className="techdetail_info">
                            <h3>{viewComponentData?.payload?.display_name}</h3>
                            <div className="techsubtitle">
                              <img
                                src={
                                  viewComponentData?.payload?.techstack
                                    ?.avatar_url
                                }
                                alt="tech logo"
                                className="mr-2"
                              />
                              <span>
                                {viewComponentData?.payload?.techstack?.name}
                              </span>
                              <span>|</span>
                              <span>
                                {
                                  viewComponentData?.payload?.techstack
                                    ?.category?.name
                                }
                              </span>
                            </div>
                            <div className="techvesion">
                              <span>
                                Version: {viewComponentData?.payload?.version}
                              </span>
                              <span>|</span>
                              <span>
                                {viewComponentData?.payload?.author_name} on{" "}
                                {moment(viewComponentData?.payload?.createdAt)
                                  .utc()
                                  .format("MMM DD,YYYY")}
                              </span>
                            </div>
                            <div className="techrating">
                              <div className="star_rating d-flex align-items-center">
                                <div className="star-ratings">
                                  {viewComponentData?.payload &&
                                    viewData?.payload && (
                                      <Rating
                                        name="half-rating"
                                        value={
                                          viewData?.payload?.review_details?.[0]
                                            ?.avgRating
                                        }
                                        precision={0.5}
                                        readOnly
                                      />
                                    )}
                                </div>
                                {parseInt(
                                  viewData?.payload?.review_details?.[0]
                                    ?.overallRatings
                                )}{" "}
                                {""}Total overall ratings
                              </div>
                              <div className="techlabel">
                                <div className="card_label mr-3">
                                  <i className="ra ra-eye_open"></i>{" "}
                                  {viewComponentData?.payload?.views}
                                </div>
                                <div className="card_label mr-3">
                                  <i className="ra ra-download"> </i>{" "}
                                  {viewComponentData?.payload?.downloads}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="techdetail_actiontool">
                            <Link
                              to=""
                              className={`btn-favorite  ${
                                viewComponentData?.payload?.isFavourite == 1
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleFavorite(
                                  viewComponentData?.payload?.id,
                                  viewComponentData?.payload?.isFavourite
                                )
                              }
                            >
                              <a href="#" className="btn-favorite mr-4">
                                <i className="ra ra-heart"></i>
                              </a>
                            </Link>

                            <a
                              href="#"
                              className="btn btn-outline-primary mr-3"
                              data-toggle="modal"
                              data-target="#writereview"
                            >
                              Write a Review
                            </a>

                            <a
                              className="btn reset btn-primary mr-3"
                              href="#"
                              target="blank"
                              onClick={handleDownload}
                            >
                              Download
                            </a>

                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-link dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ra ra-dots"></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a
                                  className="dropdown-item"
                                  href={viewComponentData?.payload?.gitlab_url}
                                >
                                  View Source Code
                                </a>
                                {/* <a className="dropdown-item" href="#">
                                  Request Access
                                </a> */}
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#raiseIssue"
                                >
                                  Raise an Issue{" "}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="tech_detail_rt_bottom">
                          <ul className="tech_taglist">
                            {viewComponentData?.payload?.tags?.map(
                              (tags: ViewComponent) => {
                                return (
                                  <li>
                                    {" "}
                                    <span>{tags?.name}</span>{" "}
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="tech_detail_body">
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
                              Overview
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
                              Change logs
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
                              Dependencies
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="pills-details-tab"
                              data-toggle="pill"
                              data-target="#pills-details"
                              type="button"
                              role="tab"
                              aria-controls="pills-details"
                              aria-selected="false"
                            >
                              Details
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="pills-rages-tab"
                              data-toggle="pill"
                              data-target="#pills-rages"
                              type="button"
                              role="tab"
                              aria-controls="pills-rages"
                              aria-selected="false"
                            >
                              Rates and Comments
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
                              <h3 className="mb-5">Overview</h3>
                              <h5 className="mb-3">Description</h5>
                              <p>{viewComponentData?.payload?.description}</p>
                              <h5 className="mb-3">Feature</h5>
                              <p>{viewComponentData?.payload?.features}</p>
                              <h5 className="mb-3">Function</h5>
                              <p>
                                {viewComponentData?.payload?.functional_use}
                              </p>
                              <div className="tech_detail_body">
                                <Buttons />
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
                              <h3 className="mb-5">Change logs</h3>
                              <div className="table-responsive table_custom">
                                <table className="table table-hover">
                                  <thead>
                                    <tr>
                                      <th>Title</th>
                                      <th>Date</th>
                                      <th>User</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {changeLogsData?.map((data: any) => {
                                      return (
                                        <tr>
                                          <td>{data?.message}</td>
                                          <td>
                                            {moment(data?.committed_date)
                                              .utc()
                                              .format("MMM DD,YYYY")}
                                          </td>
                                          <td>{data?.committer_name}</td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>

                              <div className="tech_detail_body">
                                <Buttons />
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
                              <h3 className="mb-5">Dependencies</h3>
                              {/* <h5 className="mb-3">Description</h5> vivek */}
                              <div className="table-responsive table_custom">
                                <table className="table table-hover">
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Version</th>
                                      <th>Group Id</th>
                                      <th>Target Framework</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {viewDependenciesItem?.map((data: any) => {
                                      return (
                                        <tr>
                                          <td>
                                            {data?.name === null ||
                                            data?.name === undefined
                                              ? "<no data>"
                                              : data?.name}
                                          </td>
                                          <td>
                                            {data?.version === null ||
                                            data?.version === undefined
                                              ? "<no data>"
                                              : data?.version}
                                          </td>
                                          <td>
                                            {data?.groupId === null ||
                                            data?.groupId === undefined
                                              ? "<no data>"
                                              : data?.groupId}
                                          </td>
                                          <td>
                                            {data?.targetFramework === null ||
                                            data?.targetFramework === undefined
                                              ? "<no data>"
                                              : data?.targetFramework}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>

                              <div className="tech_detail_body">
                                <Buttons />
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="pills-details"
                            role="tabpanel"
                            aria-labelledby="pills-details-tab"
                          >
                            <div className="tab-content-body">
                              <h3 className="mb-5">Details</h3>
                              <div className="grid_wrapper grid-5">
                                <div className="label-stats">
                                  <div className="label-head">Author</div>
                                  <div className="label-text">
                                    {viewComponentData?.payload?.author_name}
                                  </div>
                                </div>
                                <div className="label-stats">
                                  <div className="label-head">Version</div>
                                  <div className="label-text">
                                    {viewComponentData?.payload?.version}
                                  </div>
                                </div>

                                <div className="label-stats">
                                  <div className="label-head">
                                    Last updated on
                                  </div>
                                  <div className="label-text">
                                    {moment(
                                      viewComponentData?.payload?.updatedAt
                                    )
                                      .utc()
                                      .format("MMM DD,YYYY")}
                                  </div>
                                </div>
                                <div className="label-stats">
                                  <div className="label-head">Framework</div>
                                  <div className="label-text">
                                    {viewComponentData?.payload?.framework_tags?.map(
                                      (item: { name: string }) => {
                                        return item.name + ",";
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="tech_detail_body">
                                <Buttons />
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="pills-rages"
                            role="tabpanel"
                            aria-labelledby="pills-rages-tab"
                          >
                            <div className="tab-content-body">
                              <div className="tab-content-header mb-5">
                                <h3>Rates and Comments</h3>
                                <div className="tab-content-actiontool">
                                  <div className="form-group">
                                    <select
                                      onChange={(e: any) =>
                                        setRating(e.target.value)
                                      }
                                      className="custom-select form-control "
                                    >
                                      <option selected value="">
                                        {" "}
                                        All Rating
                                      </option>
                                      <option value="1"> 1 Stars</option>
                                      <option value="2"> 2 Stars</option>
                                      <option value="3"> 3 Stars</option>
                                      <option value="4">4 Stars</option>
                                      <option value="5"> 5 Stars</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <select
                                      onChange={(e: any) =>
                                        setSortBy(e.target.value)
                                      }
                                      className="custom-select form-control "
                                    >
                                      <option selected value="">
                                        Sort By
                                      </option>
                                      <option value="recent">
                                        Most Recent
                                      </option>
                                      <option value="highest_rating">
                                        Highest Rating
                                      </option>
                                      <option value="lowest_rating">
                                        Lowest Rating
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              {commentData?.length !== 0 ? (
                                <div className="rates_list">
                                  <ul>
                                    {commentData?.map(
                                      (data: ReplyCommentData) => {
                                        return (
                                          <Fragment>
                                            <li>
                                              <div className="rates_blocks">
                                                <div className="media mb-3">
                                                  <img
                                                    src={
                                                      data?.image !== null
                                                        ? `data:image/jpeg;base64,${data?.image}`
                                                        : profilePic
                                                    }
                                                    alt="pic of user"
                                                    className="align-self-start mr-3 rounded-circle"
                                                    style={{
                                                      height: "82px",
                                                      width: "82px",
                                                    }}
                                                    data-holder-rendered="true"
                                                  />

                                                  <div className="media-body">
                                                    <h5 className="mt-0">
                                                      {data?.name}
                                                    </h5>
                                                    <div className="star_rating mb-3 ">
                                                      <div className="form-group">
                                                        <div className="ratestar-list_wrp">
                                                          <img
                                                            src={
                                                              data?.rating === 3
                                                                ? star3
                                                                : "" ||
                                                                  data?.rating ===
                                                                    2
                                                                ? star2
                                                                : "" ||
                                                                  data?.rating ===
                                                                    1
                                                                ? star1
                                                                : "" ||
                                                                  data?.rating ===
                                                                    4
                                                                ? star4
                                                                : "" ||
                                                                  data?.rating ===
                                                                    5
                                                                ? star5
                                                                : ""
                                                            }
                                                            alt="rating"
                                                            className="mr-2"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="media-date">
                                                      <span>
                                                        {" "}
                                                        {moment(data?.createdAt)
                                                          .utc()
                                                          .format(
                                                            "MMM DD,YYYY"
                                                          )}
                                                      </span>
                                                    </div>
                                                    <h4>{data?.headline}</h4>
                                                    <p>{data?.review}</p>
                                                    <div className="action my-4">
                                                      <div className="small d-flex justify-content-start">
                                                        {data?.reply === null &&
                                                        allowPermission.length !==
                                                          0 ? (
                                                          <button
                                                            name="post"
                                                            key={data?.reviewId}
                                                            onClick={(e: any) =>
                                                              setReviewId({
                                                                ...reviewId,
                                                                id: data?.reviewId,
                                                                status:
                                                                  e.target.name,
                                                              })
                                                            }
                                                            className="btn btn-outline-primary d-flex align-items-center mr-4"
                                                          >
                                                            <i className="ra ra-reply mr-2"></i>{" "}
                                                            Reply to Comments
                                                          </button>
                                                        ) : (
                                                          ""
                                                        )}
                                                      </div>
                                                    </div>
                                                    {data?.reply !== null ? (
                                                      <div className="rates_blocks reply_block pt-5 mt-5">
                                                        <div className="media mb-3">
                                                          <img
                                                            className="align-self-start mr-3 rounded-circle"
                                                            alt="82x82"
                                                            src={
                                                              data?.replierImage !==
                                                              null
                                                                ? `data:image/jpeg;base64,${data?.replierImage}`
                                                                : profilePic
                                                            }
                                                            style={{
                                                              width: "82px",
                                                              height: "82px",
                                                            }}
                                                            data-holder-rendered="true"
                                                          />

                                                          <div className="media-body">
                                                            <div className="d-flex align-items-center mb-2">
                                                              <h5 className="m-0">
                                                                {
                                                                  data?.replierName
                                                                }
                                                              </h5>
                                                              <div className="media-date ml-3">
                                                                - Replied on{" "}
                                                                {moment(
                                                                  data?.updatedAt
                                                                )
                                                                  .utc()
                                                                  .format(
                                                                    "MMM DD,YYYY"
                                                                  )}
                                                              </div>
                                                            </div>

                                                            <p>{data?.reply}</p>

                                                            {data?.replierName ===
                                                              fullName &&
                                                            allowPermission.length !==
                                                              0 ? (
                                                              <div className="action my-4">
                                                                <div className="small d-flex justify-content-start">
                                                                  <button
                                                                    name="edit"
                                                                    key={
                                                                      data?.reviewId
                                                                    }
                                                                    onClick={(
                                                                      e: any
                                                                    ) =>
                                                                      setReviewId(
                                                                        {
                                                                          ...reviewId,
                                                                          id: data?.reviewId,
                                                                          status:
                                                                            e
                                                                              .target
                                                                              .name,
                                                                          reply:
                                                                            data?.reply,
                                                                        }
                                                                      )
                                                                    }
                                                                    className="btn btn-outline-primary d-flex align-items-center mr-4"
                                                                  >
                                                                    <i className="ra ra-edit mr-2"></i>{" "}
                                                                    Edit
                                                                  </button>
                                                                  <button
                                                                    onClick={() =>
                                                                      handleDeleteReply(
                                                                        data?.reviewId
                                                                      )
                                                                    }
                                                                    className="btn btn-outline-danger d-flex align-items-center mr-4"
                                                                  >
                                                                    <i className="ra ra-trash mr-2"></i>{" "}
                                                                    Delete
                                                                  </button>
                                                                </div>
                                                              </div>
                                                            ) : (
                                                              ""
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    ) : (
                                                      ""
                                                    )}

                                                    <div
                                                      className="rates_blocks mt-5"
                                                      style={{
                                                        display:
                                                          data?.reviewId ===
                                                          reviewId.id
                                                            ? "true"
                                                            : "none",
                                                      }}
                                                    >
                                                      <div className="media mb-3">
                                                        <img
                                                          src={
                                                            profileImage !==
                                                            null
                                                              ? `data:image/jpeg;base64,${profileImage}`
                                                              : profilePic
                                                          }
                                                          className="align-self-start mr-3 rounded-circle"
                                                          style={{
                                                            height: "82px",
                                                            width: "82px",
                                                          }}
                                                          alt="82x82"
                                                          data-holder-rendered="true"
                                                        />
                                                        <div className="media-body">
                                                          <div className="d-flex align-items-center mb-2">
                                                            <h5 className="m-0">
                                                              {fullName}
                                                            </h5>
                                                          </div>
                                                          <div className="action mt-3">
                                                            <div className="form-group">
                                                              {reviewId.status ===
                                                              "post" ? (
                                                                <textarea
                                                                  className="form-control"
                                                                  rows={5}
                                                                  onChange={(
                                                                    e: any
                                                                  ) => {
                                                                    setReplyData(
                                                                      {
                                                                        ...replyData,
                                                                        reviewId:
                                                                          reviewId.id,
                                                                        reply:
                                                                          e
                                                                            .target
                                                                            .value,
                                                                      }
                                                                    );
                                                                  }}
                                                                  placeholder="Message"
                                                                ></textarea>
                                                              ) : (
                                                                <textarea
                                                                  className="form-control"
                                                                  rows={5}
                                                                  defaultValue={
                                                                    data?.reply
                                                                  }
                                                                  onChange={(
                                                                    e: any
                                                                  ) => {
                                                                    setEditReplyData(
                                                                      {
                                                                        ...editReplyData,
                                                                        reviewId:
                                                                          reviewId.id,
                                                                        reply:
                                                                          e
                                                                            .target
                                                                            .value,
                                                                      }
                                                                    );
                                                                  }}
                                                                  placeholder="Message"
                                                                ></textarea>
                                                              )}
                                                            </div>
                                                            <div className="form-group-btn d-flex justify-content-end ">
                                                              {reviewId.status ===
                                                              "post" ? (
                                                                <button
                                                                  key={
                                                                    data?.reviewId
                                                                  }
                                                                  onClick={
                                                                    handleReply
                                                                  }
                                                                  className="btn reset btn-outline-primary "
                                                                >
                                                                  Publish Reply
                                                                </button>
                                                              ) : (
                                                                <button
                                                                  key={
                                                                    data?.reviewId
                                                                  }
                                                                  onClick={
                                                                    handleEditReply
                                                                  }
                                                                  className="btn reset btn-outline-primary "
                                                                >
                                                                  Update
                                                                </button>
                                                              )}

                                                              <button
                                                                onClick={() =>
                                                                  setReviewId(
                                                                    "none"
                                                                  )
                                                                }
                                                                data-dismiss="modal"
                                                                className="btn apply btn-outline-primary"
                                                              >
                                                                Cancel
                                                              </button>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </li>
                                          </Fragment>
                                        );
                                      }
                                    )}
                                  </ul>
                                  {AllReviewCommentsData?.payload?.length >
                                  noOfCommentComponent ? (
                                    <div className="d-flex align-items-center justify-content-center py-4">
                                      <Link to="" onClick={loadMoreComment}>
                                        Load More
                                      </Link>
                                    </div>
                                  ) : null}
                                </div>
                              ) : (
                                <div className="d-flex align-items-center justify-content-center py-4">
                                  <Link to="">No comments yet to be found</Link>
                                </div>
                              )}

                              <div className="tech_detail_body">
                                <Buttons />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tech_detail_body">
                      <div className="col-md-12">
                        <h3 className="mb-5 mt-2">Related Component</h3>
                      </div>
                      <div className="col-md-12">
                        <div className="grid_wrapper grid-3">
                          {RelatedCompData?.map((reletedComp: any) => {
                            return (
                              <div className="card card-boxshadow related-component">
                                <div className="card_head mb-4">
                                  <div className="card_icon mr-4">
                                    <img
                                      src={reletedComp?.image_url}
                                      alt="No_image"
                                    />
                                  </div>
                                  <div className="cardhead_info">
                                    <div className="cardhead_info_lt">
                                      <h4 className="card_title">
                                        {" "}
                                        <Link
                                          to={`/View_Component/${reletedComp?.id}`}
                                          onClick={() => viewCompApiCalls()}
                                        >
                                          {reletedComp?.display_name}
                                        </Link>
                                      </h4>
                                      <div className="cardsub_title">
                                        <img
                                          src={
                                            reletedComp?.techstack?.avatar_url
                                          }
                                          alt="tech logo"
                                          className="mr-2"
                                        />{" "}
                                        {reletedComp?.techstack?.name}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="card_body">
                                  <p className="text-ellipsis--2 mb-2">
                                    {reletedComp?.description}
                                  </p>
                                </div>
                                <div className="card_subfooter">
                                  <div className="card_footer_lt">
                                    <div className="star_rating ">
                                      <Rating
                                        name="half-rating"
                                        value={reletedComp?.rating}
                                        precision={0.5}
                                        readOnly
                                      />
                                      {reletedComp?.noofreviews}
                                    </div>
                                  </div>
                                </div>
                                <div className="card_footer border-top-0 pt-0">
                                  <Link
                                    to={`/View_Component/${reletedComp?.id}`}
                                    className="btn btn-primary w-100"
                                    onClick={() => viewCompApiCalls()}
                                  >
                                    View
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {viewComponentData?.payload?.related_components
                          ?.length > datanumber &&
                        noOfComponent <=
                          viewComponentData?.payload?.related_components
                            ?.length ? (
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* <!-- Footer --> */}
        <Component_Footer />
        {/* <!-- Modal --> */}
        <form onSubmit={handelReviewSubmit}>
          <div
            className="modal modal_custom fade"
            id="writereview"
            role="dialog"
            data-backdrop="static"
            data-keyboard="false"
            aria-labelledby="myModalLabel2"
          >
            <div className="modal-dialog " role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Your Rating and Review</h4>
                  <button
                    type="button"
                    id="reviewClose"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="ra ra-close"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="grid_wrapper grid-1">
                    <div className="form-group">
                      <div className="ratestar-list_wrp">
                        <div className="ratestar_head">Your Rating </div>

                        <div className="ratestar-list">
                          <input
                            type="radio"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                rating: e.target.value,
                              })
                            }
                            id="star5"
                            name="rate"
                            value="5"
                          />
                          <label htmlFor="star5" title="text"></label>
                          <input
                            type="radio"
                            id="star4"
                            name="rate"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                rating: e.target.value,
                              })
                            }
                            value="4"
                          />
                          <label htmlFor="star4" title="text"></label>
                          <input
                            type="radio"
                            id="star3"
                            name="rate"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                rating: e.target.value,
                              })
                            }
                            value="3"
                          />
                          <label htmlFor="star3" title="text"></label>
                          <input
                            type="radio"
                            id="star2"
                            name="rate"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                rating: e.target.value,
                              })
                            }
                            value="2"
                          />
                          <label htmlFor="star2" title="text"></label>
                          <input
                            type="radio"
                            id="star1"
                            name="rate"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                rating: e.target.value,
                              })
                            }
                            value="1"
                          />
                          <label htmlFor="star1" title="text"></label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <textarea
                        required
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            headline: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Type headline of your review here"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      {/* <label className="control-label">
                      Description <span className="text-danger">*</span>
                    </label> */}
                      <textarea
                        className="form-control"
                        rows={6}
                        required
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            review: e.target.value,
                          })
                        }
                        placeholder="Type your review here"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="form-group-btn d-flex align-items-center justify-content-center ">
                    <button type="submit" className="btn reset btn-primary ">
                      Submit
                    </button>
                    <button
                      type="button"
                      data-dismiss="modal"
                      aria-label="Close"
                      className="btn apply btn-outline-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* raise an issue Modal */}
        <div
          className="modal right modal_custom fade"
          id="raiseIssue"
          tabIndex={-1}
          role="dialog"
          data-backdrop="static"
          data-keyboard="false"
          aria-labelledby="raiseIssueLabel"
        >
          <form onSubmit={handleSubmit}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Raise an Issue</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="ra ra-close"></i>
                  </button>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label className="control-label">
                      Issue Subject <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      required
                      placeholder="Enter here"
                      onChange={(e: any) =>
                        setIssueFormData({
                          ...issueFormData,
                          title: e.target.value,
                          assignedName: viewComponentData?.payload?.author_name,
                          assignedEmail:
                            viewComponentData?.payload?.author_email,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Techstack</label>
                    <input
                      className="form-control"
                      type="text"
                      value={viewComponentData?.payload?.techstack?.name}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Component Name</label>
                    <input
                      className="form-control"
                      type="text"
                      value={viewComponentData?.payload?.title}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Priority</label>
                    <select
                      className="custom-select form-control minimal"
                      required
                      onChange={(e: any) =>
                        setIssueFormData({
                          ...issueFormData,
                          priority: e.target.value,
                        })
                      }
                    >
                      <option selected>Select here</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Status</label>
                    <input
                      className="form-control"
                      type="text"
                      value="Open"
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Assignee</label>
                    <div className="d-flex align-items-center">
                      {allowViewAllPermission.length !== 0 ? (
                        <select
                          required
                          className="custom-select form-control minimal"
                          onChange={(e: any) =>
                            setIssueFormData({
                              ...issueFormData,
                              assignedName: e.target.value,
                              assignedEmail:
                                e.target.options[e.target.selectedIndex].id,
                            })
                          }
                        >
                          <option selected>Select here</option>
                          {Reviewers?.payload?.map((data: any) => {
                            return (
                              <option id={data.email}>{data?.name}</option>
                            );
                          })}
                        </select>
                      ) : (
                        <input
                          className="form-control"
                          type="text"
                          value={viewComponentData?.payload?.author_name}
                          readOnly
                        />
                      )}
                      <img
                        src={info}
                        className="img-fluid ml-3"
                        alt="Info"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="The raised issue is initially assigned to the component's Author. In case of author's unavailability, the admin can change the assignee to another user."
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Description</label>
                    <textarea
                      required
                      className="form-control"
                      rows={5}
                      onChange={(e: any) =>
                        setIssueFormData({
                          ...issueFormData,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="form-group-btn d-flex align-items-center justify-content-center ">
                    <button
                      className="btn apply btn-outline-primary"
                      data-dismiss="modal"
                      id="idButtonPost"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                    <button
                      className="btn reset btn-primary"
                      //data-dismiss="modal"
                      aria-label="Close"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default View_Component;
