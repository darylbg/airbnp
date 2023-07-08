import React from 'react';
import './Footer.css';
import { Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container className="bg-warning fixed-bottom bg-body-tertiary w-100 p-3">
      <Row>
        footer
      </Row>
    </Container>
  );
};

export default Footer;