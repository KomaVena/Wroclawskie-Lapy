import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error on exit:", error);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/dog.svg"
            alt="Wroclapki Logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          Wroclapki
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {user && (
              <>
                <Nav.Link as={Link} to="/search">
                  Search
                </Nav.Link>

                <Nav.Link as={Link} to="/bookings">
                  My reservations
                </Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/reviews">
              Reviews
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-3">Hello, {user.email}</Navbar.Text>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registration
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
