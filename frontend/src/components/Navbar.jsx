// /src/components/CustomNavbar.jsx
import React, { useContext } from "react";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const CustomNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  console.log("🧪 Usuario en contexto:", user);

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BsNavbar.Brand as={Link} to="/">
          Inicio
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/marcas">Marcas</Nav.Link>
                <Nav.Link as={Link} to="/modelos">Modelos</Nav.Link>
                <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
              </>
            )}
            {user?.role === "admin" && (
              <Nav.Link as={Link} to="/admin">Dashboard Admin</Nav.Link>
            )}
          </Nav>

          <Nav>
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
              </>
            ) : (
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default CustomNavbar;
