//App.js

import { Component } from "react";
import * as React from "react";
// import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { MENU_ROUTES, ROUTE_LIST } from "../../utils/constants";
import { connect } from "react-redux";

const LOGO = require("../../assets/images/KWIZZY.png");
const LOGO_BLUE = require("../../assets/images/logo_blue.png");
const LOGO_WHITE = require("../../assets/images/logo_white.png");

// const crossIcon = require("../../assets/images/cross_icon.svg");

class HeaderComponent extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.PageLocation !== prevProps.PageLocation) {
      console.log("route Changed");
     
      this.setState({});
    }
  }

  renderMenuList() {
    return MENU_ROUTES.map((route, i) => {
      return (
        <li className="list-item" key={`menuItems${i}`}>
          <Link
            className="list-item-link"
            to={route.path}
            onClick={() => this.toggleMenu()}
          >
            {route.displayName}
          </Link>
        </li>
      );
    });
  }
  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }
  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  }
  white_logo_paths = [
    ROUTE_LIST.privacy,
    ROUTE_LIST.terms
  ];
  black_paths=[
    ROUTE_LIST.refer
  ]
  getLogo() {
    if (this.white_logo_paths.includes(window.location.pathname)) {
      return LOGO_WHITE;
    }else if(this.black_paths.includes(window.location.pathname)){
      return LOGO_BLUE;
    }
    return LOGO;
  }
  getColor() {
    if (this.white_logo_paths.includes(window.location.pathname)) {
      return "icon-menu whte";
    }
    return "icon-menu blue";
  }
  render() {
    let kpLogo = this.getLogo();
    return (
      <>
        <header id="header" className="header-section kp-container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 col-sm-9 header-left no_padding">
                <Link className={"logo-block"} to={"/"}>
                  <img src={kpLogo} className="logo-img" />
                </Link>
              </div>
              <div className="col-md-8 col-sm-3 no_padding header-right d-flex justify-content-end align-items-center">
                {/* <div className="main_menu d-flex justify-content-end align-items-center w-100">
                  <Menu
                    width={320}
                    right
                    className={"header_sidebar"}
                    customBurgerIcon={
                      <span
                        className={this.getColor()}
                        onClick={() => this.toggleMenu()}
                      />
                    }
                    customCrossIcon={
                      <img
                        src={crossIcon}
                        className="cross-icon"
                        onClick={() => this.toggleMenu()}
                      />
                    }
                    isOpen={this.state.menuOpen}
                    onStateChange={state => this.handleStateChange(state)}
                  >
                    {this.renderMenuList()}
                    <div className="download-block">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg btn-block download-button"
                      >
                        Download App
                      </button>
                    </div>
                  </Menu>

                  <div className="download-block">
                    <button type="button" className="btn btn-primary btn-lg btn-block download-button">Download</button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <Menu customBurgerIcon={ <img src="img/icon.svg" /> } />
          <Menu customCrossIcon={ <img src="img/cross.svg" /> } /> */}
        </header>
      </>
    );
  }
}
function mapStoreToProps(store): Partial<any> {
  return {
    PageLocation: store.router.location
  };
}
export default connect(mapStoreToProps, null)(HeaderComponent);
