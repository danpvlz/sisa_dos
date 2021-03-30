import React, {useEffect} from "react";

import { useSelector } from "react-redux";
import { useHistory, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { userSignOut } from "./redux/actions/Auth";

const App = () => {
    const history = useHistory();
    const token = useSelector(({ auth }) => auth.token);
    const {error} = useSelector(({ commonData }) => commonData);
/*
    useEffect(() => {
        console.log('error')
        console.log(error?.message)
        error?.message=="Request failed with status code 401" &&
        userSignOut();
    }, [error])*/


    return (
        <>
        {token ?
            <AdminSwitch />
            :
            <AuthSwitch />
        }
        </>
    );
}

const AuthSwitch = () => 
<Switch>
    <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
    <Redirect from="/" to="/auth/login" />
</Switch>

const AdminSwitch = () => 
<Switch>
    <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
    <Redirect from="/" to="/admin/index" />
</Switch>

export default App;