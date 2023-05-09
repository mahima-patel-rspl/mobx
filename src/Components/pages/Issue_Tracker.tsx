import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allIssuesList,
  assignedIssuesList,
  reportedIssuesList,
  ReviewersList,
} from "../../redux/action/userAction";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import ComponentNavbar from "./componentNavbar";
import Component_Footer from "./Component_Footer";
import Component_Header from "./Component_Header";
import AllIssues from "./IssueTracker/AllIssues";
import AssignedIssues from "./IssueTracker/AssignedIssues";
import ReportedIssues from "./IssueTracker/ReportedIssues";
import { Permissions } from "../../constants/PermissionConstant";
import { roleName, userPermission } from "./auth/authUser";

function Issue_Tracker() {
  const dispatch = useDispatch<AppDispatch>();
  const { allIssues } = useSelector((state: any) => state?.allIssues);
  const { reportedIssues } = useSelector((state: any) => state?.reportedIssues);
  const { assignedIssues } = useSelector((state: any) => state?.assignedIssues);
  const [actionIcon, setActionIcon] = useState("All");
  const [all, setAll] = useState(true);
  const [reported, setReported] = useState(false);
  const [assgined, setAssigned] = useState(false);

  let allowViewAllPermission = userPermission().filter(
    (id: any) => id === Permissions.ViewAllIssues
  );

  let AllowReviewIssue = userPermission().filter(
    (id: any) => id === Permissions.ReviewIssue
  );

  const handleAll = () => {
    setAll(true);
    setReported(false);
    setAssigned(false);
  };
  const handleReported = () => {
    setReported(true);
    setAll(false);
    setAssigned(false);
  };

  const handleAssigned = () => {
    setAssigned(true);
    setReported(false);
    setAll(false);
  };

  useEffect(() => {
    //sssssssss document.body.className = "app nav-light d-flex flex-column h-100";
    dispatch(allIssuesList());
    dispatch(reportedIssuesList());
    dispatch(assignedIssuesList());
    dispatch(ReviewersList());
    if (allowViewAllPermission.length === 0) {
      setReported(true);
    }
  }, [allowViewAllPermission.length, dispatch]);
  return (
    <Fragment>
      <div className="app nav-light d-flex flex-column h-100">
        <header>
          <Component_Header />
          <div className="nav-scroller bg-blue shadow-sm">
            <ComponentNavbar />
          </div>
        </header>
        {/* <!-- Main container --> */}
        <main className="flex-shrink-0">
          <section className="section_wrapper_sm">
            <div className="container container-fluid">
              <div className="tile_wrapper">
                <div className="tilewp_header flex-wrap">
                  <div className="tilewp-left">
                    <h3 className="tilewp-title">Manage Issues</h3>
                  </div>
                </div>
                <div className="tilewp-body">
                  <div className="tablist2">
                    <ul
                      className="nav nav-pills issue-pills mb-4"
                      id="pills-tab"
                      role="tablist"
                    >
                      {allowViewAllPermission.length !== 0 ? (
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
                            onClick={handleAll}
                          >
                            All Issues (
                            {allIssues?.payload?.data?.length
                              ? allIssues?.payload?.data?.length
                              : 0}
                            )
                          </button>
                        </li>
                      ) : (
                        ""
                      )}

                      <li className="nav-item" role="presentation">
                        <button
                          className={
                            allowViewAllPermission.length !== 0
                              ? "nav-link"
                              : "nav-link active"
                          }
                          id="pills-changelog-tab"
                          data-toggle="pill"
                          data-target="#pills-changelog"
                          type="button"
                          role="tab"
                          aria-controls="pills-changelog"
                          aria-selected="false"
                          onClick={handleReported}
                        >
                          Reported by Me ({reportedIssues?.payload?.length})
                        </button>
                      </li>
                      {AllowReviewIssue.length !== 0 ? (
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
                            onClick={handleAssigned}
                          >
                            Assigned to Me ({assignedIssues?.payload?.length})
                          </button>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                    {allowViewAllPermission.length !== 0 ? (
                      all ? (
                        <AllIssues />
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    {reported ? <ReportedIssues /> : ""}
                    {assgined ? <AssignedIssues /> : ""}
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

export default Issue_Tracker;
