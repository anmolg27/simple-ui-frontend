import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { logOutUser } from "../../redux/actions/userActions";
import { updateAndGetCustomers } from "../../redux/actions/customerAction";
import { updateAndGetRooms } from "../../redux/actions/roomAction";
import { getCompany } from "../../redux/actions/companyAction";
import logo from "../../images/logo.jpg";
import "./styles.css";
import { fetchCustomers } from "../../redux/actions/customerAction";
import { fetchBills } from "../../redux/actions/transactionAction";
import Navigation from "../../components/navigation/navigation";
import BookingHistory from "../../components/booking-history/booking-history";
import Pos from "../../components/pos/pos";
import DashBoard from "../../components/dashboard/dashboard";
import InvoiceBill from "../../components/invoice/app";
import PasswordsAndPowers from "../../components/passwords-and-powers/passwords-and-powers";
import NewRegistration from "../../components/new-registration/new-registration";
import CheckOut from "../../components/check-out/check-out";
import CompanyForm from "../../components/company-form/company-form";
// import EditModal from "../../components/edit-page/edit-page";
export default function UserHomePage(props) {
  const { credentials } = useSelector((state) => state.user);
  // const [editShow, setEditShow] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const { data, loading: companyLoading } = useSelector(
    (state) => state.company
  );
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  useEffect(() => {
    console.log("too");
    // dispatch(updateAndGetCustomers());
    dispatch(getCompany(setShowCompanyForm));
  }, [dispatch]);
  useEffect(() => {
    if (!companyLoading && (!data || !data.companyName)) {
      console.log("data is");
      console.log(data);
      // setShowCompanyForm(true);
    } else if (data && data.companyName) {
      // setShowCompanyForm(false);
      dispatch(fetchCustomers());
      dispatch(fetchBills());
    }
  }, [data, companyLoading]);
  return (
    <div className="home-container">
      <Navigation />
      <nav className="navigation-bar">
        <a href="/" className="navigation__logo">
          <img src={logo} alt="logo" /> <h3>Billing</h3>
        </a>
        {/* <div className="navigation__hamburger">
          <div className="hamburger-icon"></div>
        </div> */}
        <div className="navigation__search-bar">
          <input type="text" placeholder="Search...." />
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
        <div className="navigation__company">
          <p>{data && data.companyName && data.companyName}</p>{" "}
          <i
            onClick={() => {
              setSelectedCompany(data);
              // setEditShow(true);
              setShowCompanyForm(true);
            }}
            className="fa fa-pencil-square"
            aria-hidden="true"
          ></i>
        </div>
      </nav>
      <div className="home-dashboard-container">
        <div className="home-dashboard-subcontainer">
          <div className="home-dashboard">
            {/* <div className="company-logo">LOGO</div> */}
            <div className="dashboard-option">
              <Link className="option" to="/home">
                <span className="fa fa-archive fa-lg"></span>
                <span>Home</span>
              </Link>

              <Link className="option" to="/home/invoice">
                {" "}
                <span className="fa fa-money fa-lg"></span>
                <span>Invoice</span>
              </Link>
              {credentials && credentials.authorization === "owner" && (
                <>
                  <Link className="option" to="/home/PasswordsAndPowers">
                    <span className="fa fa-key fa-lg"></span>

                    <span>Passwords/Powers</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="logout-btn-container">
          <button onClick={handleLogOut} className="logout-btn">
            <span className="fa fa-power-off fa-lg"></span>
            <span>Exit / LogOut</span>
          </button>
        </div>
      </div>
      <div className="home-main-container">
        {showCompanyForm && (
          <CompanyForm
            company={selectedCompany}
            closeModal={() => setShowCompanyForm(false)}
          />
        )}

        <div className="home-main-subcontainer px-1">
          <Switch>
            <Route
              exact
              path="/home"
              component={(props) => <DashBoard {...props} />}
            />
            <Route
              exact
              path="/home/invoice"
              component={(props) => <InvoiceBill {...props} />}
            />
            <Route
              exact
              path="/home/bookingHistory"
              component={(props) => <BookingHistory {...props} />}
            />
            <Route
              exact
              path="/home/pos"
              component={(props) => <Pos {...props} />}
            />
            <Route
              // exact
              path="/home/checkOut/:customerId"
              component={(props) => <CheckOut {...props} />}
            />

            <Route
              // exact
              path="/home/newRegistration"
              component={(props) => (
                <NewRegistration {...props} heading={"New Checkin"} />
              )}
            />

            {/* {credentials && credentials.authorization === "owner" && (
              <>
                <Route
                  exact
                  path="/home/PasswordsAndPowers"
                  component={(props) => (
                    <PasswordsAndPowers {...props}>
                      <h3>
                        <span>Passwords And Powers</span>
                      </h3>
                    </PasswordsAndPowers>
                  )}
                />
              </>
            )} */}

            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    </div>
  );
}
