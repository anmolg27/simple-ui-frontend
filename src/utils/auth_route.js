import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingPage from "../pages/loading_page/loading_page";
import ErrorPage from "../pages/error_page/error_page";
export default function AuthRoute({ component: Component, ...rest }) {
  const { authenticated } = useSelector((state) => state.user);
  const { uiLoading, uiError } = useSelector((state) => state.ui);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (uiLoading) {
          return <LoadingPage {...props} />;
        } else {
          if (uiError) {
            return <ErrorPage {...props} />;
          } else
            return !authenticated ? (
              <Redirect to="/" />
            ) : (
              <Component {...props} />
            );
        }
      }}
    />
  );
}
