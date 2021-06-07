import React from "react";

import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import PublicLayout from "layouts/Public.js";

const App = () => {
    const token = useSelector(({ auth }) => auth.token);

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
    <Route path="/public" render={(props) => <PublicLayout {...props} />} />
    <Redirect from="/" to="/auth/login" />
</Switch>

const AdminSwitch = () => 
<Switch>
    <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
    <Route path="/public" render={(props) => <PublicLayout {...props} />} />
    <Redirect from="/" to="/admin/index" />
</Switch>

export default App;