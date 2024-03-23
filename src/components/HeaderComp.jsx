import React from "react";
import { Link } from "react-router-dom";
import slogan from "../images/slogan.png";
import FancyText from "@carefully-coded/react-text-gradient";
import redBus from "../images/redBus.png";
import {
  isUserLoggedIn,
  UserLoggedOut,
  isAdminUser,
} from "../service/AuthService";

//This Page is for Header components Styling and changing the render based on User Role
//Admin user will have AdminDashboard and LogOut button
//User will have SearchBus, changePassword, E-ticket,MyBookings
const HeaderComp = () => {
  const isAuth = isUserLoggedIn();
  const isAdmin = isAdminUser();
  const divStyle = {
    height: "80px",
  };
  const divstyle1 = {
    marginRight: "20px",
  };
  const handleLogOut = () => {
    UserLoggedOut();
    navigate("/login");
  };
  return (
    <header>
      <nav
        className="navbar navbar-expand-md navbar-danger bg-danger bg-opacity-30"
        style={divStyle}
      >
        <div>
          <img
            src={redBus}
            width="78"
            height="auto"
            className="d-inline-block align-top"
            alt=""
          />
          <a
            href="http://localhost:5173"
            className="navbar-brand text-center fw-bold "
          >
            <FancyText gradient={{ from: "#818CF8", to: "#5B21B6" }}>
              <h1>RedBus</h1>
            </FancyText>
          </a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            {!isAuth && (
              <li className="nav-item">
                <Link to="/login" className="nav-link fst-italic text-white">
                  Login
                </Link>
              </li>
            )}
            {!isAuth && (
              <li className="nav-item">
                <Link to="/register" className="nav-link fst-italic text-white">
                  Register
                </Link>
              </li>
            )}
            {isAuth && (
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link fst-italic text-white"
                  onClick={handleLogOut}
                >
                  Logout
                </Link>
              </li>
            )}
            {isAdmin && isAuth && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link fst-italic text-white">
                  Admin Dashboard
                </Link>
              </li>
            )}
            {!isAdmin && isAuth && (
              <li className="nav-item">
                <Link to="/user" className="nav-link fst-italic text-white">
                  SearchBus
                </Link>
              </li>
            )}
            {!isAdmin && isAuth && (
              <li className="nav-item">
                <Link
                  to="/changePassword"
                  className="nav-link fst-italic text-white"
                >
                  Change Password
                </Link>
              </li>
            )}
            {!isAdmin && isAuth && (
              <li className="nav-item">
                <Link to="/eticket" className="nav-link fst-italic text-white">
                  E-ticket
                </Link>
              </li>
            )}
            {!isAdmin && isAuth && (
              <li className="nav-item">
                <Link
                  to="/myBookings"
                  className="nav-link fst-italic text-white"
                >
                  My Bookings
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div style={divstyle1} className="text-white">
          More Way To Go!!
        </div>
        <img
          style={divstyle1}
          src={slogan}
          width="100"
          height="auto"
          className="d-inline-block align-top"
          alt=""
        />
      </nav>
    </header>
  );
};

export default HeaderComp;
