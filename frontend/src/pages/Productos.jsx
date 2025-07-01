
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/productos", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductos(res.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      }
    };

    fetchProductos();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Lista de Productos</h2>
      <Row>
        {productos.map((prod) => (
          <Col md={4} key={prod.id_producto}>
            <Card className="mb-4">
              <Card.Img variant="top" src={prod.imagen_producto} />
              <Card.Body>
                <Card.Title>{prod.nombre}</Card.Title>
                <Card.Text>
                  Modelo: {prod.modelo} <br />
                  Precio: ${prod.precio} <br />
                  Stock: {prod.stock}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Productos;
