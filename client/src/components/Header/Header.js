import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Auth from '../../utils/auth';
import Image from 'react-bootstrap/Image';
import { useSelector} from 'react-redux';
import icon from '../../images/icon.png'

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

  const { auth } = useSelector((state) => state);
  const thisUser = auth.user;

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
      <Navbar 
      expand={expand} 
      className="mb-3 bg-body-tertiary"
      fixed='top'
      >
        <Container fluid>
          <Navbar.Brand className='nav-brand' as={NavLink} to="/">
            <img className='nav-brand-icon' src={icon} alt='Icon'></img>
            Airbnp
            </Navbar.Brand>
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
                <Nav.Link as={NavLink} to="/"  className='nav-link-custom lrg-nav-link'>Home</Nav.Link>
                {/* conditionally render login/register */}
                { Auth.loggedIn() ? (
                  <NavDropdown
                    title={
                      currentUser ? (
                        <>
                          <Image 
                            className='header-account-img' 
                            src={thisUser.image} 
                            style={Styles}
                          /> 
                          Account
                        </>
                      ) : (
                        'Account'
                      )
                    }
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    className="nav-link-custom dropdown-menu-end lrg-nav-link"
                    align="end"
                  >
                    <NavDropdown.Item as={NavLink} to="/profile" className='nav-link-custom'>My Profile</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/dashboard" className='nav-link-custom'>Dashboard</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout} className='nav-link-custom'>Logout</NavDropdown.Item>
                  </NavDropdown>
                ):(
                  <Nav.Link as={NavLink} to="/login"  className='lrg-nav-link nav-link-custom'>Login / Register</Nav.Link>
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
