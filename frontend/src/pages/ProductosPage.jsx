import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import ProductoCard from "../components/ProductoCard";

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("/api/productos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error cargando productos", err));
  }, []);

  return (
    <Container className="mt-4">
      <h2>Todos los Productos</h2>
      <Row>
        {productos.map((producto) => (
          <ProductoCard key={producto.id_producto} producto={producto} />
        ))}
      </Row>
    </Container>
  );
};

export default ProductosPage;
