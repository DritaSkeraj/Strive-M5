import React from "react";
import { Link } from "react-router-dom";
const Navbar = (props) => (
  <nav className="navbar navbar-expand-lg navbar-dark">
    <div className="container">
      <Link to="/">
        <span className="navbar-brand">
          <img
            src="/img/logo.svg"
            alt="logo"
            width="30"
            height="30"
            className="logo d-inline-block align-top"
          />
        </span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Store
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/">
                Action
              </a>
              <a className="dropdown-item" href="/">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/">
                Something else here
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              About
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/">
                Action
              </a>
              <a className="dropdown-item" href="/">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/">
                Something else here
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Community
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/">
                Action
              </a>
              <a className="dropdown-item" href="/">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/">
                Something else here
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Support
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/">
                Action
              </a>
              <a className="dropdown-item" href="/">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/">
                Something else here
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Account
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="/">
                Action
              </a>
              <a className="dropdown-item" href="/">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/">
                Something else here
              </a>
            </div>
          </li>
        </ul>
        <div className="icons">
          <a href="/">
            <i className="fa fa-bell"></i>
          </a>
          <a className="text-white" href="#">
            <i
              className="fa fa-users"
              aria-hidden="true"
              onClick={props.openLogin}
            ></i>
          </a>
          <Link to="/cart">
            <i
              className="fa fa-shopping-cart"
              onMouseEnter={props.showCartPreview}
            ></i>
          </Link>
          <a href="/">
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
