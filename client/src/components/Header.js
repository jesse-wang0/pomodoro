import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand rowdies-light" href="#timer">🍅 PomoTimer</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page" >Timer</Link>
            </li>
            <li className="nav-item">
              <Link to="/statistics" className="nav-link active" aria-current="page" >Statistics</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;