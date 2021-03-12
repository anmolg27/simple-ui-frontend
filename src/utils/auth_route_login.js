import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import LoadingPage from "../pages/loading_page/loading_page";
import ErrorPage from "../pages/error_page/error_page";

export default function AuthRouteLogin({ component: Component, ...rest }) {
  const { authenticated } = useSelector((state) => state.user);
  const { uiLoading, uiError } = useSelector((state) => state.ui);
  //   console.log(rest);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (uiLoading) return <LoadingPage {...props} />;
        else {
          if (uiError) return <ErrorPage {...props} />;
          else
            return authenticated ? (
              <Redirect to="/home" />
            ) : (
              <Component {...props} />
            );
        }
      }}
    />
  );
}
