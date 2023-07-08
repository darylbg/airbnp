import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-md bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <NavLink exact to="/" className="navbar-brand">
            Airbnp
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarOffcanvasLg"
            aria-controls="navbarOffcanvasLg"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Airbnp
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <NavLink exact to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login / Register
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="dropdownMenu"
                    role="button"
                    data-bs-toggle="dropdown"
                    data-bs-target="#navbarOffcanvasLg"
                    aria-expanded="false"
                    activeClassName="active"
                  >
                    Account
                  </NavLink>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu">
                    <li>
                      <NavLink to="/profile" className="dropdown-item">
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard" className="dropdown-item">
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/" className="dropdown-item">
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
