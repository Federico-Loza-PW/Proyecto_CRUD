import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Container className="mt-4">
      <h2>Panel de Administración</h2>
      <Link to="/admin/marcas"><Button className="m-2">CRUD Marcas</Button></Link>
      <Link to="/admin/modelos"><Button className="m-2">CRUD Modelos</Button></Link>
      <Link to="/admin/productos"><Button className="m-2">CRUD Productos</Button></Link>
    </Container>
  );
};

export default AdminDashboard;