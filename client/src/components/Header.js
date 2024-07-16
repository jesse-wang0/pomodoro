import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link to="/" class="navbar-brand rowdies-light" href="#timer">🍅 PomoTimer</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link to="/" class="nav-link active" aria-current="page" >Timer</Link>
            </li>
            <li class="nav-item">
              <Link to="/statistics" class="nav-link active" aria-current="page" >Statistics</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;