import React from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/actions/userActions";
import "./styles.css";
import history from "../../utils/history";
export default function Navigation(props) {
  const dispatch = useDispatch();
  const handleClick = (e, routeName) => {
    e.preventDefault();
    document.getElementById("navi-toggle").checked = false;
    if (routeName === "logOut") dispatch(logOutUser());
    else history.push(`/${routeName}`);
    // history.push("/home");
  };
  return (
    <div className="navigation">
      <input
        type="checkbox"
        id="navi-toggle"
        className="navigation__checkbox"
      />
      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>
      <div className="navigation__background">&nbsp;</div>
      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <a
              onClick={(e) => handleClick(e, "home")}
              href="#"
              className="navigation__link"
            >
              <span>01</span> Home
            </a>
          </li>
          <li className="navigation__item">
            <a
              href="#"
              onClick={(e) => handleClick(e, "home/invoice")}
              className="navigation__link"
            >
              <span>02</span> Invoice
            </a>
          </li>
          <li className="navigation__item">
            <a
              onClick={(e) => handleClick(e, "home/PasswordsAndPowers")}
              href="#"
              className="navigation__link"
            >
              <span>03</span> Password/Powers
            </a>
          </li>
          <li className="navigation__item">
            <a
              onClick={(e) => handleClick(e, "logOut")}
              href="#"
              className="navigation__link"
            >
              <span>04</span> Log Out
            </a>
          </li>
          {/* <li className="navigation__item">
            <a href="#popup" className="navigation__link">
              <span>05</span> Book now
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}
