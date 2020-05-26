//App.js

import { Component } from "react";
import * as React from "react";
import { utility } from "../../utils/dispatch_utility";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isMobile } from "../../utils/index";


import { ROUTE_LIST } from "../../utils/constants";
interface IAppProps {
  router?: any;
  location: any;
  Dispatch: any;
  history: any;
  // pageProps: any;
}
class FooterComponent extends Component<IAppProps, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="footer-wrapper kp-container">
          <div className="footer-info row">
            {!isMobile() && <div className="col-sm-12 col-md-12 col-lg-5 ">
              <div className="kwizzy-block">
                <div className="description">@ 2020 KWIZZY </div>
                <div className="description">ALL RIGHTS RESERVED.</div>
              </div>
            </div>}
            <div className="col-sm-12 col-md-12 col-lg-3">
              <div className="kwizzy-block">
                {!isMobile() && <ul className="list-items quick-links-list">
                  <li className="list-item">
                    <Link className="list-item-link" to={ROUTE_LIST.privacy} >
                      {<span>{`Privacy Policy`} </span>}
                    </Link>
                  </li>
                  <li className="list-item">
                    <Link className="list-item-link" to={ROUTE_LIST.refer} >
                      {<span>{`Refer & Earn`} </span>}
                    </Link>
                  </li>
                </ul>}
                {isMobile() &&
                  <ul className="list-items quick-links-list">
                    <li className="list-item">
                      <Link className="list-item-link" to={ROUTE_LIST.refer} >
                        {<span>{`Refer & Earn`} </span>}
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link className="list-item-link" to={ROUTE_LIST.privacy} >
                        {<span>{`Privacy Policy`} </span>}
                      </Link>
                    </li>
                  </ul>
                }
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-4 ">
              <div className="kwizzy-block">
                <ul className="list-items quick-links-list">
                  <li className="list-item">
                    <Link className="list-item-link" to={ROUTE_LIST.terms} >
                      {<span>{`Terms and Conditions`} </span>}
                    </Link>
                  </li>
                  <li className="list-item">
                    <a className="list-item-link" href={`mailto:webmaster@example.com`} >
                      {<span>{`Support: Kwizzy@gmail.com`} </span>}
                    </a>
                  </li>
                </ul>
              </div>

            </div>
            {isMobile() && <div className="col-sm-12 col-md-12 col-lg-5 ">
              <div className="kwizzy-block">
                <div className="description">@ 2020 KWIZZY </div>
                <div className="description">ALL RIGHTS RESERVED.</div>
              </div>
            </div>}

          </div>

      </footer>
    );
  }
}
function mapStoreToProps(store): Partial<IAppProps> {
  return {};
}
export default connect(
  mapStoreToProps,
  utility.mapDispatchToProps
)(FooterComponent);
