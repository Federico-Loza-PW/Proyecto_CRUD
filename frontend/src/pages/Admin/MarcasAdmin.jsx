import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";

const MarcasAdmin = () => {
  const [marcas, setMarcas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id_marca: null, marca: "" });

  const token = localStorage.getItem("token");

  const fetchMarcas = async () => {
    try {
      const res = await axios.get("/api/marcas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMarcas(res.data);
    } catch (err) {
      console.error("Error al obtener marcas", err);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, marca: e.target.value });
  };

  const handleCreate = () => {
    setFormData({ id_marca: null, marca: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (marca) => {
    setFormData(marca);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta marca?")) {
      try {
        await axios.delete(`/api/marcas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchMarcas();
      } catch (err) {
        console.error("Error al eliminar marca", err);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(`/api/marcas/${formData.id_marca}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/marcas", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setShowModal(false);
      fetchMarcas();
    } catch (err) {
      console.error("Error al guardar marca", err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Administrar Marcas</h2>
      <Button className="mb-3" onClick={handleCreate}>
        Agregar Marca
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca) => (
            <tr key={marca.id_marca}>
              <td>{marca.id_marca}</td>
              <td>{marca.marca}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(marca)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(marca.id_marca)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Editar Marca" : "Nueva Marca"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Nombre de la Marca</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.marca}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MarcasAdmin;