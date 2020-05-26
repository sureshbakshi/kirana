import * as React from "react";
import { Link } from "react-router-dom";
const emoji = require('../assets/images/emoji.png');
import FooterComponent from "../components/home/footer";

class NotFound extends React.Component<any, any> {
  render() {
    return (
      <>
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h1>
                4<span style={{backgroundImage: `url(${emoji})`}}></span>4
              </h1>
            </div>
            <h2>Oops! Page Not Be Found</h2>
            <p>
              Sorry but the page you are looking for does not exist, have been
              removed. name changed or is temporarily unavailable
            </p>
            <Link to="/">Back to homepage</Link>
          </div>
        </div>
        <FooterComponent/>
      </>
    );
  }
}
export default NotFound;
