import React from 'react'
import { Redirect, Route } from 'react-router-dom';
const ProtectedRouter = (props) => {
    const isAdmin = window.localStorage.getItem("user_role") === "ADMIN";


    return isAdmin ? (
        <Route {...props} />
    ) : (
        <Redirect
            to={{
                pathname: "/",
            }}
        />
    );
};
export default ProtectedRouter