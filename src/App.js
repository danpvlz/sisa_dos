import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const App = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const token = useSelector(({ auth }) => auth.token);

    useEffect(() => {
        if (token == null) {
            history.push("/admin/index");
        }
    }, [token, history]);

    return (
        <>
        {token==null ?
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