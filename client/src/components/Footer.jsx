import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-dark text-white text-center py-3">
    <Container>
      <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
    </Container>
  </footer>
);

export default Footer;
