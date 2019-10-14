import React from "react";
import {Redirect, Route} from "react-router-dom";
import AuthService from "../service/auth";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        AuthService.getToken()
            ? <Component {...props} />
            : <Redirect to='/login'/>
    )}/>
);

export default PrivateRoute;