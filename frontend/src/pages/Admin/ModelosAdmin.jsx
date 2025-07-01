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

const ModelosAdmin = () => {
  const [modelos, setModelos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id_modelo: null,
    modelo: "",
    id_marca: "",
  });

  const token = localStorage.getItem("token");

  // Definimos correctamente la función para traer modelos
  const fetchModelos = async () => {
    try {
      const res = await axios.get("/api/modelos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ Respuesta de /api/modelos:", res.data);

      if (Array.isArray(res.data)) {
        setModelos(res.data);
      } else if (res.data && Array.isArray(res.data.modelos)) {
        setModelos(res.data.modelos);
      } else {
        console.error("❌ La respuesta no es un array ni contiene 'modelos':", res.data);
        setModelos([]);
      }
    } catch (err) {
      console.error("Error al obtener modelos", err);
      setModelos([]);
    }
  };

  // Cargar marcas para el select
  const fetchMarcas = async () => {
    try {
      const res = await axios.get("/api/marcas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMarcas(res.data);
    } catch (err) {
      console.error("Error cargando marcas", err);
      setMarcas([]);
    }
  };

  useEffect(() => {
    fetchModelos();
    fetchMarcas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleCreate = () => {
    setFormData({ id_modelo: null, modelo: "", id_marca: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (modelo) => {
    setFormData({
      id_modelo: modelo.id_modelo,
      modelo: modelo.modelo,
      id_marca: modelo.id_marca,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este modelo?")) {
      try {
        await axios.delete(`/api/modelos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchModelos();
      } catch (err) {
        console.error("Error al eliminar modelo", err);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(`/api/modelos/${formData.id_modelo}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/modelos", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setShowModal(false);
      fetchModelos();
    } catch (err) {
      console.error("Error al guardar modelo", err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Administrar Modelos</h2>
      <Button className="mb-3" onClick={handleCreate}>
        Agregar Modelo
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {modelos.map((modelo) => {
            const marca = marcas.find((m) => m.id_marca === modelo.id_marca);
            return (
              <tr key={modelo.id_modelo}>
                <td>{modelo.id_modelo}</td>
                <td>{modelo.modelo}</td>
                <td>{marca ? marca.marca : "N/A"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(modelo)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(modelo.id_modelo)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Editar Modelo" : "Nuevo Modelo"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Modelo</Form.Label>
              <Form.Control
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Marca</Form.Label>
              <Form.Select
                name="id_marca"
                value={formData.id_marca}
                onChange={handleChange}
              >
                <option value="">Seleccionar marca</option>
                {marcas.map((marca) => (
                  <option key={marca.id_marca} value={marca.id_marca}>
                    {marca.marca}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
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

export default ModelosAdmin;