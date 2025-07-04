import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const marcas = [
  { id_marca: 1, nombre: "Chevrolet" },
  { id_marca: 2, nombre: "Fiat" },
  { id_marca: 3, nombre: "Ford" },
  { id_marca: 4, nombre: "Peugeot" },
  { id_marca: 5, nombre: "Renault" },
  { id_marca: 6, nombre: "Volkswagen" },
];

const MarcasPage = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center text-warning mb-4">Catálogo de Marcas</h2>
      <Row>
        {marcas.map((marca) => {
          const nombreImg =
            marca.nombre.toLowerCase() === 'volkswagen' ? 'vw' : marca.nombre.toLowerCase();

          return (
            <Col md={4} key={marca.id_marca} className="mb-4">
              <Card bg="dark" text="light">
                <Card.Img
                  variant="top"
                  src={`/marcas/${nombreImg}.png`}
                  alt={marca.nombre}
                />
                <Card.Body>
                  <Card.Title className="text-center">{marca.nombre}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default MarcasPage;
