import React, { Fragment } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { userPermission } from "./auth/authUser";
import { Permissions } from "../../constants/PermissionConstant";

function ComponentNavbar() {
  const location: any = useLocation();
  let allowPermission = userPermission().filter(
    (id: any) => id === Permissions.ViewReports
  );

  return (
    <Fragment>
      <div className="nav-scroller bg-blue shadow-sm">
        <nav className="nav nav-underline">
          <Link
            className={`nav-link  ${
              location?.pathname === "/reusableComponent" ? "active" : ""
            }`}
            to="/reusableComponent"
          >
            Summary
          </Link>

          <Link className="nav-link" to="">
            Search
          </Link>

          <Link
            className={`nav-link  ${
              location?.pathname === "/favourites" ? "active" : ""
            }`}
            to="/favourites"
          >
            Favourites
          </Link>
          <Link
            className={`nav-link  ${
              location?.pathname === "/Manage_Components" ? "active" : ""
            }`}
            to="/Manage_Components"
          >
            Manage Components
          </Link>

          <Link
            className={`nav-link  ${
              location?.pathname === "/Issue_Tracker" ? "active" : ""
            }`}
            to="/Issue_Tracker"
          >
            Issue Tracker
          </Link>
          {allowPermission.length !== 0 ? (
            <Link
              className={`nav-link  ${
                location?.pathname === "/report" ? "active" : ""
              }`}
              to="/report"
            >
              Reports
            </Link>
          ) : (
            ""
          )}
        </nav>
      </div>
    </Fragment>
  );
}

export default ComponentNavbar;
