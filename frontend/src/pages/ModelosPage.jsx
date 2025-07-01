import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import ModeloCard from "../components/ModeloCard";

const ModelosPage = () => {
  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    axios.get("/api/modelos")
      .then((res) => setModelos(res.data))
      .catch((err) => console.error("Error cargando modelos", err));
  }, []);

  return (
    <Container className="mt-4">
      <h2>Todos los Modelos</h2>
      <Row>
        {modelos.map((modelo) => (
          <ModeloCard key={modelo.id_modelo} modelo={modelo} />
        ))}
      </Row>
    </Container>
  );
};

export default ModelosPage;