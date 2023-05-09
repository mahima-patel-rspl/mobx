import React, { Fragment } from "react";
import ComponentHeader from "./Component_Header";
import ComponentFooter from "./Component_Footer";
import page404 from "../../images/404.svg";
import { Link } from "react-router-dom";
function Page_NotFound() {
  return (
    <div className="app nav-light d-flex flex-column h-100">
      <Fragment>
        <ComponentHeader />
      </Fragment>
      <Fragment>
        <main className="flex-shrink-0">
          <div className="dashboard_wrapper page-not-found bg-light ">
            <div className="dashboard_lt">
              <div className="card">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <h2>404</h2>
                    <div className="card_title">
                      <h3>Opps! Page not found</h3>
                    </div>
                    <p>
                      Sorry, the page you are looking for doesn't exist or
                      removed.
                      <br /> We suggest you back to home.
                    </p>
                    <Link
                      to="/dashboard"
                      className="btn reset btn-primary btn-lg"
                    >
                      Go to Homepage
                    </Link>
                  </div>
                  <div className="col-lg-6">
                    <img src={page404} className="img-fluid" alt="Error 404" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Fragment>
      <Fragment>
        <ComponentFooter />
      </Fragment>
    </div>
  );
}

export default Page_NotFound;
