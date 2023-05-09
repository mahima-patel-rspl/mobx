import React, { Fragment } from "react";
import { Link } from "react-router-dom";
function Component_Footer() {
  return (
    <Fragment>
      <footer>
        <section className="footer_wrapper bg_white">
          <div className="footer_lt d-flex align-items-center justify-content-center">
            <p className="mb-0">
              Copyright © 2022 Rishabh Software. All Rights Reserved.
            </p>
          </div>
          <div className="footer_rt">
            <ul className="social_list">
              <li>
                <Link to="#" className="">
                  <i className="lab la-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link to="#" className="">
                  <i className="lab la-instagram"></i>
                </Link>
              </li>
              <li>
                <Link to="#" className="">
                  <i className="lab la-linkedin"></i>
                </Link>
              </li>
              <li>
                <Link to="#" className="">
                  <i className="lab la-twitter"></i>
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </footer>
    </Fragment>
  );
}

export default Component_Footer;
