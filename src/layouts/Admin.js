import React, {useState} from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import {components} from "../routes.js";
import {listRoutes} from "../redux/actions/Common";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "components/Notification.js";
import LoadingPage from "components/Loaders/LoadingPage.js";
import axios from '../util/Api';

const Admin = (props) => {
  const dispatch = useDispatch();
  const mainContent = React.useRef(null);
  const location = useLocation();
  const token = useSelector(({ auth }) => auth.token);
  const [allowed, setallowed] = useState(false);
  const routesList = useSelector(({ commonData }) => commonData.routesList);

  React.useEffect(() => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        setallowed(true);
      }
      
    if(routesList.length===0){
      dispatch(listRoutes());
    }
      
    if(routesList.length>0){
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      mainContent.current.scrollTop = 0;
      
    }
  }, [location,token,routesList,dispatch]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {        
        return (
          prop.routes==="" ? 
          <Route
            path={prop.layout + prop.path}
            component={components[prop.component]}
            key={key}
          />
          :
          JSON.parse(prop.routes).map((sub,subKey)=>
          <Route
            path={prop.layout + sub.path}
            component={components[sub.component]}
            key={subKey}
          />)
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    let rName = routesList.find(r=>r.layout+r.path===path);
    if(rName){
      return rName.name;
    }
    let subroutes = [];
    routesList.filter(r=>r.routes.length>0).map(sr=> subroutes=subroutes.concat(JSON.parse(sr.routes)));
    let srName = subroutes.find(r=>r.layout+r.path===path);
    if(srName){
      return srName.name;
    }
    return "Brand";
  };

  return (
    <>
    {
      routesList.length>0 ?
      <>
      <Notifications />
      <Sidebar
        {...props}
        routes={routesList}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/logocclam.png").default,
          imgAlt: "...",
        }}
      />

      <div id="admin-main-content" className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
      {allowed &&
        <Switch>
          {getRoutes(routesList)}
          <Redirect to="/admin/index" />
        </Switch>
      }
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
      </>
      :
      <LoadingPage />
    }
    </>
  );
};

export default Admin;
