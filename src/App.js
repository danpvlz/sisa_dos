import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import PublicLayout from "layouts/Public.js";

function useOnlineStatus() {
    const [online, setOnline] = useState(window.navigator.onLine);

    useEffect(() => {
        function handleOnline() {
            setOnline(true);
            console.log("yeih")
        }

        function handleOffline() {
            setOnline(false);
            console.log("ish")
        }

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return online;
}

const App = () => {
    const online = useOnlineStatus();
    const token = useSelector(({ auth }) => auth.token);

    return (
        <>
            {!online ?
                <div
                    className="header pt-5 pt-lg-8 d-flex align-items-center"
                    style={{
                        minHeight: "600px",
                        backgroundImage:
                            "url(" +
                            require("./assets/img/resources/networkerror.png").default +
                            ")",
                        backgroundSize: "inherit",
                        backgroundPosition: "center top",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="mx-auto text-center mt-6">
                        <h1 className="text-primary mt-6 mt-lg-0">¡La conexión falló!</h1>
                        <p>Por favor, revise su conexión a internet e intente conectar su wifi o activar sus datos.</p>
                    </div>
                </div>
                :
                (
                    token ?
                        <AdminSwitch />
                        :
                        <AuthSwitch />
                )
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