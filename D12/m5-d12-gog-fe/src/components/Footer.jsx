import React from "react";

const Footer = () => (
  <footer className="mt-5">
    <div className="container">
      <div className="row text-white" style={{ padding: "17px 0" }}>
        <div className="col-8">
          <div
            className="list-group-horizontal footer-list"
            style={{ fontSize: "12px" }}
          >
            <a href="/">Redeem code</a>
            <a href="/">Reclaim your game</a>
            <a href="/">GOG Connect</a>
            <a href="/">Contact us</a>
            <a href="/">Career opportunities</a>
            <a href="/">Submit your game</a>
          </div>
        </div>
        <div className="col-4 ">
          <div className="text-muted list-group-horizontal social d-flex justify-content-end">
            <a href="/">
              <i className="fa fa-facebook-square"></i>
            </a>
            <a href="/">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="/">
              <i className="fa fa-twitch"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div style={{ backgroundColor: "#2F2F2F", padding: "18px 15px" }}>
      <div className="container">
        <div className="row no-gutters">
          <div className="col-sm-6 col-md-6 col-lg-1">
            <img
              src="https://menu-static.gog-statics.com/assets/img/gog-vertical-logo.svg"
              alt="logo"
            />
          </div>
          <div
            className="col-sm-6 col-md-6 col-lg-7 pt-3"
            style={{ color: "#767676" }}
          >
            <div className="container">
              <div className="row">
                <div
                  className="list-group-horizontal footer-list text-muted"
                  style={{ fontSize: "10px" }}
                >
                  <a href="/">Language:</a>
                  <a href="/" className="active-link">
                    English
                  </a>
                  <a href="/">Deutsch</a>
                  <a href="/">French</a>
                  <a href="/">Polski</a>
                  <a href="/">Русский</a>
                  <a href="/">Chineese</a>
                </div>
              </div>
              <div className="row">
                <div
                  className="list-group-horizontal footer-list"
                  style={{ fontSize: "10px" }}
                >
                  <a href="/">Currency:</a>
                  <a href="/" className="active-link">
                    USD
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-sm-12 col-md-12 col-lg-4 d-flex justify-content-center text-white"
            style={{ paddingTop: "5px" }}
          >
            <div className="download">
              <i className="fa fa-download" aria-hidden="true"></i>
              <p style={{ fontSize: "16px" }}>
                Download GOG Galaxy
                <br />
                <span style={{ fontSize: "10px" }}>for Windows</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div
        className="row text-muted"
        style={{ padding: "17px 0", fontSize: "12px" }}
      >
        <div className="col-sm-12 col-md-12 col-lg-8">
          <div className="row no-gutters">
            <div className="list-group-horizontal list-menu-footer">
              <a href="/">Legal</a>
              <a href="/">Privacy policy</a>
              <a href="/">Our thanks</a>
            </div>
          </div>

          <div className="row no-gutters" style={{ marginTop: "10px" }}>
            <p>
              {" "}
              © GOG sp. z o.o. All rights reserved. All trademarks and
              registered trademarks are the property of their respective owners.
            </p>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4">
          <div
            className="d-flex justify-content-center"
            style={{ alignItems: "center" }}
          >
            Part of{" "}
            <img
              style={{ width: "85px", paddingBottom: "5px" }}
              height="44px"
              src="https://menu-static.gog-statics.com/assets/img/cdprojekt-logo.svg"
              alt="footer"
            />{" "}
            group.
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
