
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id_producto: null,
    producto: "",
    precio: "",
    id_modelo: "",
  });

  const token = localStorage.getItem("token");

  // Cargar productos
  const fetchProductos = async () => {
    try {
      const res = await axios.get("/api/productos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(res.data);
    } catch (err) {
      console.error("Error cargando productos", err);
    }
  };

  // Cargar modelos para el select
  const fetchModelos = async () => {
    try {
      const res = await axios.get("/api/modelos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModelos(res.data);
    } catch (err) {
      console.error("Error cargando modelos", err);
    }
  };

  useEffect(() => {
    fetchProductos();
    fetchModelos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleCreate = () => {
    setFormData({ id_producto: null, producto: "", precio: "", id_modelo: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (producto) => {
    setFormData({
      id_producto: producto.id_producto,
      producto: producto.producto,
      precio: producto.precio,
      id_modelo: producto.id_modelo,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await axios.delete(`/api/productos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchProductos();
      } catch (err) {
        console.error("Error al eliminar producto", err);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(`/api/productos/${formData.id_producto}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/productos", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setShowModal(false);
      fetchProductos();
    } catch (err) {
      console.error("Error al guardar producto", err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Administrar Productos</h2>
      <Button className="mb-3" onClick={handleCreate}>
        Agregar Producto
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Modelo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => {
            const modelo = modelos.find((m) => m.id_modelo === producto.id_modelo);
            return (
              <tr key={producto.id_producto}>
                <td>{producto.id_producto}</td>
                <td>{producto.producto}</td>
                <td>{producto.precio}</td>
                <td>{modelo ? modelo.modelo : "N/A"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(producto)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(producto.id_producto)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Modal Crear / Editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Editar Producto" : "Nuevo Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="producto"
                value={formData.producto}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Modelo</Form.Label>
              <Form.Select
                name="id_modelo"
                value={formData.id_modelo}
                onChange={handleChange}
              >
                <option value="">Seleccionar modelo</option>
                {modelos.map((modelo) => (
                  <option key={modelo.id_modelo} value={modelo.id_modelo}>
                    {modelo.modelo}
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

export default ProductosAdmin;
