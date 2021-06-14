import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import {routesSimple} from "../routes.js";

import Loading from "components/Loaders/LoadingModal";

const Public = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/public") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
    <Loading />
      <div className="main-content" ref={mainContent}>
        <AuthNavbar />
          <Switch>
          {getRoutes(routesSimple)}
            <Redirect to="/aut/login" />
          </Switch>
      </div>
      <AuthFooter />
    </>
  );
};

export default Public;
