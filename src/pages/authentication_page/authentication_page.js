import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
import "./styles.css";
import logo from "../../images/logo.jpg";
export default function AuthenticationPage(props) {
  const [error, setError] = useState({
    name: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, error: loginError } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    if (!name || !password) {
      setError((error) => ({
        ...error,
        name: !name ? "Required Field!" : "",
        password: !password ? "Required Field!" : "",
      }));
      return;
    }
    if (error.name || error.password) return;
    dispatch(loginUser(name, password));
  };

  return (
    <div className="row m-0 auth-row-container">
      <div className="col-md-8 d-md-block d-none auth__about-col">
        <div className="auth__logo-box">
          <img src={logo} alt="logo" />
        </div>
        <h5 className="auth__nsp">Billing Solutions by DigiGrammers</h5>
        <h5 className="auth__quote">
          Technology is best when it brings people together
        </h5>
        <p className="auth__about-us">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        </p>
      </div>
      <div className="col-md-4 auth__form-col p-0">
        <form className="auth__form" onSubmit={handleLogin}>
          <input
            className="name-field"
            onBlur={() => {
              if (name === "") {
                setError((error) => ({ ...error, name: "Required Field!" }));
              } else setError((error) => ({ ...error, name: "" }));
            }}
            value={name}
            onChange={(event) => {
              setError((error) => ({ ...error, name: "" }));
              setName(event.target.value);
            }}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
          {error.name !== "" && <p className="error-message">{error.name}</p>}

          <input
            className="password-field"
            value={password}
            onBlur={() => {
              if (password === "") {
                setError((error) => ({
                  ...error,
                  password: "Required Field!",
                }));
              } else setError((error) => ({ ...error, password: "" }));
            }}
            onChange={(event) => {
              setError((error) => ({ ...error, password: "" }));
              setPassword(event.target.value);
            }}
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
          {error.password !== "" && (
            <p className="error-message">{error.password}</p>
          )}
          <div className="auth-submit-forgot">
            <button className="auth-submit-button" disabled={loading}>
              {loading ? (
                <div className="spinner-border text-secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
            <a href="#" className="auth-forgot-button">
              forgot password?
            </a>
          </div>
          {loginError && <p className="error-message">{loginError}</p>}
        </form>
      </div>
      {/* <div className="page-2"> */}
      {/* <h3>Account Login</h3> */}
      {/* <div className="row mt-5 justify-content-around">
          <label className="auth-mode">
            <input type="radio" defaultChecked name="radio" />
            <div className="checkmark">
              <p>admin</p>
            </div>
          </label>
          <label className="auth-mode">
            <input type="radio" name="radio" />
            <div className="checkmark">
              <p>staff</p>
            </div>
          </label>
        </div> */}
      {/* </div> */}
    </div>
  );
}
