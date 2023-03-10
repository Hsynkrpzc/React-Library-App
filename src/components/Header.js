import React from "react";
import { Link } from "react-router-dom";
import "./components.css";

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark libraryheader">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to={"/"}>
          MYLIBRARY
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>
                Anasayfa/Kütüphane
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/categories"}>
                Kategoriler
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className=" d-flex justify-content-between ">
        
        <button className="btn btn-sm btn-primary me-3 my-2 d-inline-flex"><i className="fa-regular fa-user me-3"></i> Login</button>
        <button className="btn btn-sm btn-primary me-3 my-2">Logout</button>
      </div>
    </nav>
  );
};

export default Header;
