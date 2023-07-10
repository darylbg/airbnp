import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Auth from '../../utils/auth';
import Image from 'react-bootstrap/Image';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

import './Header.css';

const Header = () => {
  const Styles = {
    height: '25px',
    width: '25px',
    objectFit: 'cover',
    borderRadius: '50%',
    border: '1px solid red',
    marginRight: '5px'
  }

  const navigate = useNavigate();
  const expand = 'sm'; // Set the desired expand value for the Navbar

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
    navigate('/');
  }

  const { data } = useQuery(QUERY_USER);
  let currentUser;

  if(data) {
    currentUser = data.user;
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
                <Nav.Link as={NavLink} to="/"  className='lrg-nav-link'>Home</Nav.Link>
                {/* conditionally render login/register */}
                { Auth.loggedIn() ? (
                  <NavDropdown
                    title={
                      currentUser ? (
                        <>
                          <Image 
                            className='header-account-img' 
                            src={currentUser.image} 
                            style={Styles}
                          /> 
                          Account
                        </>
                      ) : (
                        'Account'
                      )
                    }
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    className="dropdown-menu-end lrg-nav-link"
                    align="end"
                  >
                    <NavDropdown.Item as={NavLink} to="/profile">My Profile</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ):(
                  <Nav.Link as={NavLink} to="/login"  className='lrg-nav-link'>Login / Register</Nav.Link>
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
