import React, { useState } from "react";
import axios from "axios";
import ModeloCard from "../components/ModeloCard";
import ProductoCard from "../components/ProductoCard";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const MarcasPage = () => {
  const marcas = [
    { id_marca: 1, nombre: "chevrolet" },
    { id_marca: 2, nombre: "fiat" },
    { id_marca: 3, nombre: "ford" },
    { id_marca: 4, nombre: "peugeot" },
    { id_marca: 5, nombre: "renault" },
    { id_marca: 6, nombre: "vw" },
  ];

  const [modelos, setModelos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);

  const handleMarcaClick = (marca) => {
    setMarcaSeleccionada(marca);
    setModeloSeleccionado(null);
    setProductos([]);

    axios
      .get(`/api/modelos/marca/${marca.id_marca}`)
      .then((res) => setModelos(res.data))
      .catch((err) => console.error("Error cargando modelos", err));
  };

  const handleModeloClick = (modelo) => {
    setModeloSeleccionado(modelo);
    axios
      .get(`/api/productos/modelo/${modelo.id_modelo}`)
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error cargando productos", err));
  };

  const volverAMarcas = () => {
    setMarcaSeleccionada(null);
    setModeloSeleccionado(null);
    setModelos([]);
    setProductos([]);
  };

  const volverAModelos = () => {
    setModeloSeleccionado(null);
    setProductos([]);
  };

  return (
    <Container className="mt-4">
      {!marcaSeleccionada ? (
        <>
          <h2 className="mb-4">Marcas</h2>
          <Row>
            {marcas.map((marca) => (
              <Col key={marca.id_marca} sm={6} md={4} lg={3} className="mb-4">
                <Card
                  onClick={() => handleMarcaClick(marca)}
                  style={{ cursor: "pointer", height: "100%" }}
                >
                  <Card.Img
                    variant="top"
                    src={`/marcas/${marca.nombre}.png`}
                    alt={marca.nombre}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <Card.Body>
                    <Card.Title className="text-center text-capitalize">
                      {marca.nombre}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : !modeloSeleccionado ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Modelos de {marcaSeleccionada.nombre}</h2>
            <Button variant="secondary" onClick={volverAMarcas}>
              Volver a Marcas
            </Button>
          </div>
          <Row>
            {modelos.map((modelo) => (
              <ModeloCard
                key={modelo.id_modelo}
                modelo={modelo}
                onClick={() => handleModeloClick(modelo)}
              />
            ))}
          </Row>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Productos de {modeloSeleccionado.modelo}</h2>
            <Button variant="secondary" onClick={volverAModelos}>
              Volver a Modelos
            </Button>
          </div>
          <Row>
            {productos.map((producto) => (
              <ProductoCard key={producto.id_producto} producto={producto} />
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default MarcasPage;