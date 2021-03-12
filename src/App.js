import React from "react";
import { Switch } from "react-router-dom";
// import {useDispatch} from 'react-redux'
import AuthenticationPage from "./pages/authentication_page/authentication_page";
import UserHomePage from "./pages/user_Home_Page/user_home_page";
import AuthRoute from "./utils/auth_route";
import AuthRouteLogin from "./utils/auth_route_login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <AuthRouteLogin
          exact
          path="/"
          component={(props) => <AuthenticationPage {...props} />}
        />
        <AuthRoute
          path="/home"
          component={(props) => <UserHomePage {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;
