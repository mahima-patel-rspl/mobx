import React, { useEffect, Fragment, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  cancelIssue,
  deleteComment,
  editComment,
  editReportedIssue,
  viewIssue,
} from "../../../redux/action/userAction";
import ComponentNavbar from "../componentNavbar";
import Component_Footer from "../Component_Footer";
import Component_Header from "../Component_Header";
import { ToastContainer, toast } from "react-toastify";
import star3 from "../../../images/3star.svg";
import moment from "moment";
import { Permissions } from "../../../constants/PermissionConstant";
import { userPermission } from "../auth/authUser";
import SecureLS from "secure-ls";
function AssignedForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { viewEachIssue } = useSelector((state: any) => state?.viewEachIssue);
  const { Reviewers } = useSelector((state: any) => state?.Reviewers);
  let compId = useParams();

  const [formData, setFormData] = useState({});

  const [commentData, setCommentData] = useState<any>([]);
  var statusArr = ["OPEN", "IN PROGRESS", "RESOLVED", "CLOSED"];
  let statusArray = statusArr.filter(
    (status: string) => status !== viewEachIssue?.payload?.issue?.status
  );
  var priorityArr = ["HIGH", "MEDIUM", "LOW"];
  let priorityArray = priorityArr.filter(
    (priority: string) => priority !== viewEachIssue?.payload?.issue?.priority
  );

  let allowReviewAllPermission = userPermission().filter(
    (id: any) => id === Permissions.ReviewIssue
  );

  let allowCancelPermission = userPermission().filter(
    (id: any) => id === Permissions.CancelOwnIssue
  );
  const handlesubmit = async (e: any) => {
    e.preventDefault();
    const issueResponse: any = await dispatch(
      editReportedIssue(viewEachIssue?.payload?.issue?.id, formData)
    );
    if (issueResponse?.status === 200) {
      toast.success("Issue Edited Successfully");
    }
    setTimeout(() => {
      navigate("/Issue_Tracker");
    }, 1000);
  };

  const handleCancel = async () => {
    const cancelResponse: any = await dispatch(
      cancelIssue(viewEachIssue?.payload?.issue?.id)
    );
    if (cancelResponse?.status === 200) {
      toast.success("Issue Canceled !!!");
    }
    setTimeout(() => {
      navigate("/Issue_Tracker");
    }, 1000);
  };

  const commentUpdate = () => {
    const data = { comment: commentData?.comment };
    dispatch(editComment(commentData?.id, data));
    setCommentData({ ...commentData, id: "", comment: "" });
    dispatch(viewIssue(compId.id));
  };

  const deleteComments = async (id: Number) => {
    const deleteComm: any = await dispatch(deleteComment(id));
    if (deleteComm?.status === 200) {
      toast.success("Comment Deleted !!!");
      dispatch(viewIssue(compId.id));
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      assignedName: viewEachIssue?.payload?.issue?.assignedName,
      assignedEmail: viewEachIssue?.payload?.issue?.assignedEmail,
      status: viewEachIssue?.payload?.issue?.status,
      priority: viewEachIssue?.payload?.issue?.priority,
      title: viewEachIssue?.payload?.issue?.title,
      description: viewEachIssue?.payload?.issue?.description,
    });
  }, [viewEachIssue?.payload?.issue?.id, compId.id]);

  useEffect(() => {
    document.body.className = "app bg-light";

    dispatch(viewIssue(compId.id));
  }, [dispatch, compId.id, , commentData?.id]);

  const ls: any = new SecureLS();
  const fullName = ls?.get("username")?.data;

  return (
    <Fragment>
      <div className="app bg-light">
        <header>
          <Component_Header />
          <ComponentNavbar />
        </header>
        <ToastContainer />
        <main className="flex-shrink-0">
          <section className="section_wrapper_sm bg-light">
            <div className="container">
              <div className="tile_wrapper bg-light">
                <div className="tilewp_header flex-wrap">
                  <div className="tilewp-left">
                    <h3 className="tilewp-title">
                      <Link onClick={() => navigate(-1)} to={""}>
                        Assigned to Me
                      </Link>
                      {" >"} RSP1 - {viewEachIssue?.payload?.issue?.id}
                    </h3>
                  </div>
                  <div className="tab-content-body">
                    <form onSubmit={handlesubmit}>
                      {/* <!-- Manage the Isuue detail page  --> */}
                      <div className="issue-detail card  card-boxshadow mt-5">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label className="control-label">
                                    Issue Subject
                                  </label>
                                  {viewEachIssue?.payload?.issue?.status ===
                                    "CLOSED" ||
                                  viewEachIssue?.payload?.issue?.status ===
                                    "CANCELLED" ? (
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter here"
                                      defaultValue={
                                        viewEachIssue?.payload?.issue?.title
                                      }
                                      onChange={(e: any) =>
                                        setFormData({
                                          ...formData,
                                          title: e.target.value,
                                        })
                                      }
                                      readOnly
                                    />
                                  ) : (
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter here"
                                      defaultValue={
                                        viewEachIssue?.payload?.issue?.title
                                      }
                                      onChange={(e: any) =>
                                        setFormData({
                                          ...formData,
                                          title: e.target.value,
                                        })
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label className="control-label">
                                    Techstack
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter here"
                                    defaultValue={
                                      viewEachIssue?.payload?.issue
                                        ?.techstackName
                                    }
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label className="control-label">
                                    Component Name
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter here"
                                    defaultValue={
                                      viewEachIssue?.payload?.issue
                                        ?.componentDisplayName
                                    }
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label className="control-label">
                                    Assignee
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter here"
                                    defaultValue={
                                      viewEachIssue?.payload?.issue
                                        ?.assignedName
                                    }
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label className="control-label">
                                    Status
                                  </label>
                                  {allowReviewAllPermission.length === 0 ||
                                  viewEachIssue?.payload?.issue?.status ===
                                    "CLOSED" ||
                                  viewEachIssue?.payload?.issue?.status ===
                                    "CANCELLED" ? (
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter here"
                                      defaultValue={
                                        viewEachIssue?.payload?.issue?.status
                                      }
                                      readOnly
                                    />
                                  ) : (
                                    <select
                                      className="custom-select form-control minimal"
                                      onChange={(e: any) =>
                                        setFormData({
                                          ...formData,
                                          status: e.target.value,
                                        })
                                      }
                                    >
                                      <option selected>
                                        {viewEachIssue?.payload?.issue?.status}
                                      </option>
                                      {statusArray?.map((data: string) => {
                                        return <option>{data}</option>;
                                      })}
                                    </select>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label className="control-label">
                                    Reporter
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter here"
                                    defaultValue={
                                      viewEachIssue?.payload?.issue
                                        ?.reporterName
                                    }
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label className="control-label">
                                    Priority
                                  </label>
                                  {allowReviewAllPermission.length === 0 ||
                                  viewEachIssue?.payload?.issue?.status ===
                                    "CLOSED" ||
                                  viewEachIssue?.payload?.issue?.status ===
                                    "CANCELLED" ? (
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter here"
                                      defaultValue={
                                        viewEachIssue?.payload?.issue?.priority
                                      }
                                      readOnly
                                    />
                                  ) : (
                                    <select
                                      className="custom-select form-control minimal"
                                      onChange={(e: any) =>
                                        setFormData({
                                          ...formData,
                                          priority: e.target.value,
                                        })
                                      }
                                    >
                                      <option selected>
                                        {
                                          viewEachIssue?.payload?.issue
                                            ?.priority
                                        }
                                      </option>
                                      {priorityArray?.map((data: string) => {
                                        return <option>{data}</option>;
                                      })}
                                    </select>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="control-label">
                                    Description
                                  </label>
                                  <div className="issue-content">
                                    <p>
                                      {
                                        viewEachIssue?.payload?.issue
                                          ?.description
                                      }
                                    </p>
                                    <img
                                      src="images/image.png"
                                      className="img-fluid"
                                      alt="sreenshot"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <div className="tab-content-header mb-5">
                                    <h3>Comments</h3>
                                  </div>
                                  <div className="rates_list">
                                    <ul>
                                      {viewEachIssue?.payload?.comments.map(
                                        (item: any) => {
                                          return (
                                            <li>
                                              <div className="rates_blocks">
                                                <div className="media mb-3">
                                                  <img
                                                    className="align-self-start mr-3 rounded-circle comments-img"
                                                    alt="72x72"
                                                    src={`data:image/jpeg;base64,${item.commentorImage}`}
                                                    data-holder-rendered="true"
                                                  />
                                                  <div className="media-body">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                      <div className="d-flex align-items-center mb-2">
                                                        <h5 className="m-0">
                                                          {item.commentorName}
                                                        </h5>
                                                        <div className="media-date ml-3">
                                                          {" "}
                                                          {moment(
                                                            item?.updatedAt
                                                          )
                                                            .utc()
                                                            .format(
                                                              "MMMM DD,YYYY HH:mm"
                                                            )}
                                                        </div>
                                                      </div>
                                                      {viewEachIssue?.payload
                                                        ?.issue?.status ===
                                                        "CLOSED" ||
                                                      viewEachIssue?.payload
                                                        ?.issue?.status ===
                                                        "CANCELLED" ? (
                                                        ""
                                                      ) : (
                                                        <div className="action">
                                                          {fullName ===
                                                          item.commentorName ? (
                                                            <div className="small d-flex justify-content-start">
                                                              <Link
                                                                to=""
                                                                key={item?.id}
                                                                onClick={(
                                                                  e: any
                                                                ) =>
                                                                  setCommentData(
                                                                    {
                                                                      ...commentData,
                                                                      id: item?.id,

                                                                      comment:
                                                                        item?.comment,
                                                                    }
                                                                  )
                                                                }
                                                                className="btn btn-outline-primary d-flex align-items-center ml-2"
                                                              >
                                                                <i className="ra ra-edit mr-0"></i>
                                                              </Link>
                                                              <Link
                                                                to=""
                                                                className="btn btn-outline-danger d-flex align-items-center ml-2"
                                                                onClick={() =>
                                                                  deleteComments(
                                                                    item.id
                                                                  )
                                                                }
                                                              >
                                                                <i className="ra ra-trash mr-0"></i>
                                                              </Link>
                                                            </div>
                                                          ) : (
                                                            ""
                                                          )}
                                                        </div>
                                                      )}
                                                    </div>
                                                    <h4 className="mt-2 mb-0 font-weight-normal">
                                                      {item.comment}
                                                    </h4>
                                                  </div>
                                                </div>
                                              </div>
                                              <li>
                                                <div
                                                  className="media mb-3"
                                                  style={{
                                                    display:
                                                      commentData?.id ==
                                                      item?.id
                                                        ? "true"
                                                        : "none",
                                                  }}
                                                >
                                                  {/* <img
                                                  className="align-self-start mr-3 rounded-circle comments-img"
                                                  alt="72x72"
                                                  src={`data:image/jpeg;base64,${item.commentorImage}`}
                                                  data-holder-rendered="true"
                                                /> */}
                                                  <div className="media-body">
                                                    <div className="d-flex align-items-center mb-2">
                                                      <h5 className="m-0">
                                                        {" "}
                                                        {item.commentorName}
                                                      </h5>
                                                    </div>
                                                    <div className="action mt-3">
                                                      <div className="form-group">
                                                        <textarea
                                                          required
                                                          className="form-control"
                                                          rows={5}
                                                          onChange={(
                                                            e: any
                                                          ) => {
                                                            setCommentData({
                                                              ...commentData,
                                                              id: item.id,
                                                              comment:
                                                                e.target.value,
                                                            });
                                                          }}
                                                          placeholder="Message"
                                                          defaultValue={
                                                            item.comment
                                                          }
                                                        ></textarea>
                                                      </div>
                                                      <div className="form-group-btn d-flex justify-content-end ">
                                                        <Link
                                                          to=""
                                                          onClick={
                                                            commentUpdate
                                                          }
                                                          className="btn reset btn-outline-primary "
                                                        >
                                                          Update
                                                        </Link>

                                                        <Link
                                                          to=""
                                                          key={item?.id}
                                                          onClick={(e: any) =>
                                                            setCommentData({
                                                              ...commentData,
                                                              id: "",

                                                              comment: "",
                                                            })
                                                          }
                                                          data-dismiss="modal"
                                                          className="btn apply btn-outline-primary"
                                                        >
                                                          Cancel
                                                        </Link>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </li>
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                    <div className="border-0">
                                      <div className="rates_blocks">
                                        <div className="media mb-3">
                                          <div className="media-body">
                                            <div className="row">
                                              {allowReviewAllPermission.length !==
                                                0 &&
                                              viewEachIssue?.payload?.issue
                                                ?.status !== "CLOSED" &&
                                              viewEachIssue?.payload?.issue
                                                ?.status !== "CANCELLED" ? (
                                                <div className="col-md-12">
                                                  <div className="form-group d-flex align-items-center">
                                                    <label className="control-label mb-0">
                                                      Assign To:
                                                    </label>
                                                    <div className="d-block w-100">
                                                      <select
                                                        className="custom-select form-control minimal"
                                                        onChange={(e: any) =>
                                                          setFormData({
                                                            ...formData,
                                                            assignedName:
                                                              e.target.value,
                                                            assignedEmail:
                                                              e.target.options[
                                                                e.target
                                                                  .selectedIndex
                                                              ].id,
                                                          })
                                                        }
                                                      >
                                                        <option
                                                          disabled
                                                          selected
                                                          hidden
                                                        >
                                                          Select Name
                                                        </option>
                                                        {Reviewers?.payload?.map(
                                                          (data: any) => {
                                                            return (
                                                              <option
                                                                id={data.email}
                                                              >
                                                                {data.name}
                                                              </option>
                                                            );
                                                          }
                                                        )}
                                                      </select>
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : (
                                                ""
                                              )}

                                              <div className="col-md-12">
                                                <div className="form-group">
                                                  {viewEachIssue?.payload?.issue
                                                    ?.status === "CLOSED" ||
                                                  viewEachIssue?.payload?.issue
                                                    ?.status === "CANCELLED" ? (
                                                    <textarea
                                                      className="form-control"
                                                      rows={5}
                                                      readOnly
                                                      placeholder="Message"
                                                      onChange={(e: any) =>
                                                        setFormData({
                                                          ...formData,
                                                          comment:
                                                            e.target.value,
                                                        })
                                                      }
                                                    ></textarea>
                                                  ) : (
                                                    <textarea
                                                      className="form-control"
                                                      rows={5}
                                                      placeholder="Message"
                                                      onChange={(e: any) =>
                                                        setFormData({
                                                          ...formData,
                                                          comment:
                                                            e.target.value,
                                                        })
                                                      }
                                                    ></textarea>
                                                  )}
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
                              <div className="col-md-12">
                                <div className="form-group">
                                  {allowReviewAllPermission.length !== 0 &&
                                  viewEachIssue?.payload?.issue?.status !==
                                    "CANCELLED" &&
                                  viewEachIssue?.payload?.issue?.status !==
                                    "CLOSED" ? (
                                    <div className="action w-100 my-4">
                                      <div className="small d-flex justify-content-start">
                                        {allowCancelPermission.length != 0 ? (
                                          <Link
                                            className="btn btn-outline-primary mr-4"
                                            to=""
                                            onClick={handleCancel}
                                          >
                                            Cancel Issue
                                          </Link>
                                        ) : (
                                          ""
                                        )}
                                        <button className="btn btn-outline-primary mr-4">
                                          Save
                                        </button>
                                        <Link
                                          className="btn btn-outline-primary mr-4"
                                          to="/Issue_Tracker"
                                        >
                                          Cancel
                                        </Link>
                                      </div>
                                    </div>
                                  ) : (
                                    <Link
                                      className="btn btn-outline-primary mr-4"
                                      to="/Issue_Tracker"
                                    >
                                      Back
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Component_Footer />
      </div>
    </Fragment>
  );
}

export default AssignedForm;
