import * as React from "react";
import { utility } from "../../utils/dispatch_utility";

class DownloadApp extends React.Component<any, any> {
    downloadApp = () => {
    }
    render() {
      let platForm = utility.getPlatformString();
      return (
        <>
        <div className="download-app">
          {platForm == 'android' && <span onClick={() => this.downloadApp()} className='download-btn'>
            <i className="icon-android"></i>
            <span className="">Download App</span>
          </span>}
          {platForm == 'ios' && <span className='download-btn'>
            <i className="icon-apple"></i>
            <span className="">Coming Soon...</span>
          </span>}
        </div>
      </>
    );
  }
}
export default DownloadApp;
