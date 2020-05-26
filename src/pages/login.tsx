//App.js

import { Component } from "react";
import * as React from "react";
import { utility } from "../utils/dispatch_utility";
import { connect } from "react-redux";
import { api_service } from "../../src/api/api_service";
// import { report_actions } from "../state/actions/report.actions";
interface IAppProps {
  router?: any;
  location: any;
  Dispatch: any;
  history: any;
  PageLocation: any;
  isLoggedIn: string;
}

class Login extends Component<IAppProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "7989378135",
      email: "sureshbakshi88@gmail.com",
      apiError: "",
    };
  }
  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/dashboard");
    }
  }
  handleChange = (e, key) => {
    let val = e.target.value.trim();
    this.validateForm(val, key);
    if (val) {
      this.setState({ [key]: val });
    } else {
      delete this.errors[key];
    }
    this.forceUpdate();
  };
  errors = {};
  validateForm(val, key) {
    let mobileReg = /^\d{10}$/;
    let emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (key == "mobile" && !mobileReg.test(val)) {
      this.errors[key] = "Please enter valid mobile number";
    } else if (key == "email" && !emailReg.test(val)) {
      this.errors[key] = "Please enter valid email id";
    } else {
      this.errors = {};
    }
    return Object.keys(this.errors).length > 0;
  }
  isemptyVal() {
    if (this.state.mobile && this.state.email) return true;
    return false;
  }
  submitUserInfo() {
    api_service
      .post({
        endPoint: api_service.api_urls.signup,
        payLoad: {
          "username": "Sureshk",
          "email": "sureshbakshi898@gmail.com",
          "password": "1234",
        },
      })
      .then((response: any) => {
        console.log(response, "hasOTP");
        if (response.data.success) {
          this.setState({ hasOTP: true });
        } else {
          this.setState({
            apiError: "something went wrong. Please try again!",
          });
          setTimeout(() => {
            this.setState({ apiError: "" });
          }, 3000);
          //   notifyMsg("something went wrong. Please try again!", 2000);
        }
      });
  }
  
  
  render() {
    let isError = Object.keys(this.errors).length > 0 || !this.isemptyVal();
    return (
      <div className="login-block">
        <div className="login-section">
          <div className="row ver_center logo-section">
          it's kirana app

          </div>
            <div className="login-section1">
              <div className="mobile-block ">
                <label className="label">Mobile Number *</label>
                <input
                  type="text"
                  placeholder="Please enter mobile number"
                  className="login-input"
                  autoFocus={true}
                  defaultValue={this.state.mobile}
                  onChange={(e) => {
                    this.handleChange(e, "mobile");
                  }}
                />
                <span className="error-msg">{this.errors["mobile"]}</span>
              </div>
              <div className="mobile-block ">
                <label className="label">Email *</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Please enter email id"
                  defaultValue={this.state.email}
                  onChange={(e) => {
                    this.handleChange(e, "email");
                  }}
                />
                <span className="error-msg">{this.errors["email"]}</span>
              </div>
              <div className="mobile-block form-group">
                <div
                  className={isError ? "btn login-btn" : "btn login-btn active"}
                  onClick={() => this.submitUserInfo()}
                >
                  Send OTP
                </div>
              </div>
            </div>
          <span className="error-msg">{this.state.apiError}</span>
        </div>
      </div>
    );
  }
}
function mapStoreToProps(store): Partial<IAppProps> {
  return {
    PageLocation: store.router.location,
    // isLoggedIn: store.reportReducer.auth.isLoggedIn,
  };
}
export default connect(mapStoreToProps, utility.mapDispatchToProps)(Login);
