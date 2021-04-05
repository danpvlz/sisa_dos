import React, {useState} from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import {routesSimple,routesMembership,routesAdmin} from "../routes.js";

import { useSelector } from "react-redux";

import axios from '../util/Api';

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const auth = useSelector(({ auth }) => auth.authUser);
  const token = useSelector(({ auth }) => auth.token);
  const [allowed, setallowed] = useState(false)

  React.useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + token;
      setallowed(true)
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {        
        return (
          prop.path ? 
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
          :
          prop.routes.map((sub,subKey)=>
          <Route
            path={prop.layout + sub.path}
            component={sub.component}
            key={subKey}
          />)
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    var routes = auth?.rol==1 ? routesSimple : auth?.rol==2 ? routesMembership : routesAdmin;
    for (let i = 0; i < routes.length; i++) {
      if(routes[i].routes){
        for (let j = 0; j < routes[i].routes.length; j++) {
          if (
            props.location.pathname.indexOf(routes[i].layout + routes[i].routes[j].path) !==
            -1
          ) {
            return  routes[i].routes[j].name;
          }
        }
      }

      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
    
      <Sidebar
        {...props}
        routes={auth?.rol==3 ? routesAdmin : auth?.rol==2 ? routesMembership : routesSimple}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/logocclam.png").default,
          imgAlt: "...",
        }}
      />
      
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />

{allowed &&
        <Switch>
          {getRoutes(auth?.rol==3 ? routesAdmin : auth?.rol==2 ? routesMembership : routesSimple)}
          <Redirect to="/admin/index" />
        </Switch>
        
      }
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
