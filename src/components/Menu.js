import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";

export default function Menu({ cartCount = 0 }) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">MonEshop</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Accueil</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/cart">
              Panier {cartCount > 0 && <Badge bg="danger" className="ms-1">{cartCount}</Badge>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
