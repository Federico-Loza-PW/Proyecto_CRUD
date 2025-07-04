// src/pages/Admin/MarcasAdmin.jsx
import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const MarcasAdmin = () => {
  const [marcas, setMarcas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [marcaActual, setMarcaActual] = useState({ id_marca: null, nombre: '' });

  const fetchMarcas = async () => {
    try {
      const res = await axios.get('/marcas'); // Ajustar si usás prefijo como /api/marcas
      setMarcas(res.data);
    } catch (err) {
      console.error('Error al cargar marcas:', err);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  const handleEditar = (marca) => {
    setMarcaActual(marca);
    setShowModal(true);
  };

  const handleGuardar = async () => {
    try {
      if (marcaActual.id_marca) {
        await axios.put(`/marcas/${marcaActual.id_marca}`, marcaActual);
      } else {
        await axios.post('/marcas', marcaActual);
      }
      fetchMarcas();
      setShowModal(false);
    } catch (err) {
      console.error('Error al guardar marca:', err);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`/marcas/${id}`);
      fetchMarcas();
    } catch (err) {
      console.error('Error al eliminar marca:', err);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center text-warning mb-4">Administrar Marcas</h2>
      <Button variant="success" onClick={() => {
        setMarcaActual({ id_marca: null, nombre: '' });
        setShowModal(true);
      }}>
        + Nueva Marca
      </Button>

      <Table striped bordered hover variant="dark" className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca) => (
            <tr key={marca.id_marca}>
              <td>{marca.id_marca}</td>
              <td>{marca.nombre}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEditar(marca)}>Editar</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleEliminar(marca.id_marca)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar/editar marca */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{marcaActual.id_marca ? 'Editar Marca' : 'Nueva Marca'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombreMarca">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={marcaActual.nombre}
                onChange={(e) => setMarcaActual({ ...marcaActual, nombre: e.target.value })}
                placeholder="Ingrese el nombre de la marca"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MarcasAdmin;
