import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Header = () => {
  const navigate = useNavigate();
  const expand = 'sm'; // Set the desired expand value for the Navbar

  return (
    <>
      <Navbar expand={expand} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">Airbnp</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Airbnp
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                {/* conditionally render login/register */}
                <Nav.Link as={NavLink} to="/login">Login / Register</Nav.Link>
                <NavDropdown
                  title="Account"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                  className='dropdown-menu-end'
                  align='end'
                >
                  <NavDropdown.Item as={NavLink} to="/profile">My Profile</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
    // <div>
    //   <nav className="navbar navbar-expand-md bg-body-tertiary fixed-top">
    //     <div className="container-fluid">
    //       <NavLink exact to="/" className="navbar-brand">
    //         Airbnp
    //       </NavLink>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="offcanvas"
    //         data-bs-target="#navbarOffcanvasLg"
    //         aria-controls="navbarOffcanvasLg"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="offcanvas offcanvas-end" tabIndex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
    //         <div className="offcanvas-header">
    //           <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
    //             Airbnp
    //           </h5>
    //           <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    //         </div>
    //         <div className="offcanvas-body">
    //           <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
    //             <li className="nav-item">
    //               <NavLink exact to="/" className="nav-link">
    //                 Home
    //               </NavLink>
    //             </li>
    //             <li className="nav-item">
    //               <NavLink to="/login" className="nav-link">
    //                 Login / Register
    //               </NavLink>
    //             </li>
    //             <li className="nav-item dropdown">
    //               <NavLink
    //                 className="nav-link dropdown-toggle"
    //                 to="#"
    //                 id="dropdownMenu"
    //                 role="button"
    //                 data-bs-toggle="dropdown"
    //                 data-bs-target="#navbarOffcanvasLg"
    //                 aria-expanded="false"
    //                 activeClassName="active"
    //               >
    //                 Account
    //               </NavLink>
    //               <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu">
    //                 <li>
    //                   <NavLink to="/profile" className="dropdown-item">
    //                     My Profile
    //                   </NavLink>
    //                 </li>
    //                 <li>
    //                   <NavLink to="/dashboard" className="dropdown-item">
    //                     Dashboard
    //                   </NavLink>
    //                 </li>
    //                 <li>
    //                   <NavLink to="/" className="dropdown-item">
    //                     Logout
    //                   </NavLink>
    //                 </li>
    //               </ul>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
  );
};

export default Header;
