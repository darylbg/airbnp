import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Auth from '../../utils/auth';

const Header = () => {
  const navigate = useNavigate();
  const expand = 'sm'; // Set the desired expand value for the Navbar

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
    navigate('/');
  }

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
                { Auth.loggedIn() ? (
                  <NavDropdown
                    title="Account"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    className='dropdown-menu-end'
                    align='end'
                  >
                    <NavDropdown.Item as={NavLink} to="/profile">My Profile</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={NavLink} onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ):(
                  <Nav.Link as={NavLink} to="/login">Login / Register</Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
