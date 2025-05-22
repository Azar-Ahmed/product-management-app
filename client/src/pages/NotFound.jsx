// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

function NotFound() {
  return (
    <Container className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-dark">Go to Home</Link>
    </Container>
  );
}

export default NotFound;
