import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';

import Marcas from './pages/Marcas';
import Modelos from './pages/Modelos';
import Productos from './pages/Productos';

import MarcasPage from "./pages/MarcasPage";
import ModelosPage from "./pages/ModelosPage";
import ProductosPage from "./pages/ProductosPage";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import MarcasAdmin from "./pages/Admin/MarcasAdmin";
import ModelosAdmin from "./pages/Admin/ModelosAdmin";
import ProductosAdmin from "./pages/Admin/ProductosAdmin";

import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Navegación jerárquica pública */}
        <Route path="/marcas" element={<MarcasPage />} />
        <Route path="/modelos" element={<ModelosPage />} />
        <Route path="/productos" element={<ProductosPage />} />

        {/* Rutas privadas para usuario logueado */}
        <Route
          path="/usuario/marcas"
          element={
            <PrivateRoute>
              <Marcas />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario/modelos"
          element={
            <PrivateRoute>
              <Modelos />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario/productos"
          element={
            <PrivateRoute>
              <Productos />
            </PrivateRoute>
          }
        />

        {/* Rutas protegidas solo para ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/marcas"
          element={
            <ProtectedRoute>
              <MarcasAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/modelos"
          element={
            <ProtectedRoute>
              <ModelosAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/productos"
          element={
            <ProtectedRoute>
              <ProductosAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
