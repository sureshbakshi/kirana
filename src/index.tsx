
import "./styles/base.scss";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route as Router, Switch } from "react-router";
import { Route } from "react-router-dom";
const history = createBrowserHistory();
import {STORE} from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import HeaderComponent from "./components/home/header_component";
import { AppRoutes } from "./utils/routes";

import ScrollToTop from "./components/common/scrollToTop";
// import { isMobile } from "./utils/index";
// import DownloadApp from "./components/common/DownloadApp";

ReactDOM.render(
  <Provider store={STORE}>
    <PersistGate loading={null} persistor={persistStore(STORE)}>
      <ConnectedRouter history={history}>
        <Router>
           {<ScrollToTop />}
           {/* <HeaderComponent {...this.props} /> */}
          <div className="page-wrapper">
            <Switch>
              {AppRoutes.map((route: any) => {
                return <Route key={route.path} {...route} />;
              })}
            </Switch>
            {/* {isMobile() && <DownloadApp />} */}
          </div>
        </Router>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("app")
);
