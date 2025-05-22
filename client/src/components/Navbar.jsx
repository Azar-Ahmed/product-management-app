// components/AppNavbar.jsx
import React, { useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, loadUser } from "../redux/slices/authSlice";

function AppNavbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          Product Management
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/products" className="nav-link">
              Products
            </Link>

            {!user ? (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            ) : (
              <NavDropdown title={`Hello, ${user.name}`} id="user-profile-dropdown">
                <NavDropdown.Item as={Link} to="/admin/profile">
                  Profile
                </NavDropdown.Item>
                
                <NavDropdown.Item as={Link} to="/admin/products">
                  Admin Products
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
