import React, { Fragment, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import Pagination from "../../common/Pagination";
import { IssueTrackerData } from "../InterfaceTypes";
import { Link } from "react-router-dom";

function AssignedIssues() {
  const { assignedIssues } = useSelector((state: any) => state?.assignedIssues);
  const [showList, setShowList] = useState([]);
  const handleShowList = (list: any) => setShowList(list);
  return (
    <Fragment>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-overivew"
          role="tabpanel"
          aria-labelledby="pills-overivew-tab"
        >
          <div className="tab-content-body">
            <div className="table-responsive table_custom">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Issue</th>
                    <th>Reporter</th>
                    <th>Status</th>
                    <th>Assignee</th>
                    <th>Created Date</th>
                    <th>Last Modified Date</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                {assignedIssues?.payload?.length !== 0 &&
                assignedIssues?.payload !== undefined ? (
                  <tbody>
                    {showList?.map((data: IssueTrackerData) => {
                      return (
                        <tr>
                          <td>
                            RCP1 - {data?.id} <br /> {data?.title}
                          </td>
                          <td>{data?.reporterName}</td>
                          <td>{data?.status}</td>
                          <td>{data?.assignedName}</td>
                          <td>
                            {moment(data?.createdAt)
                              .utc()
                              .format("DD/MM/YYYY hh:mm A")}
                          </td>
                          <td>
                            {moment(data?.updatedAt)
                              .utc()
                              .format("DD/MM/YYYY hh:mm A")}
                          </td>
                          <td className="text-center">
                            <Link to={`/Issue_Tracker/Assigned/${data?.id}`}>
                              {data?.status == "CLOSED" ? (
                                <i className="ra ra-eye_open"></i>
                              ) : (
                                <i className="ra ra-recycle"></i>
                              )}
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
            {assignedIssues?.payload?.length !== 0 &&
            assignedIssues?.payload?.length !== undefined ? (
              <Pagination
                data={assignedIssues?.payload}
                itemPerPage={5}
                handleUpdate={handleShowList}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AssignedIssues;
