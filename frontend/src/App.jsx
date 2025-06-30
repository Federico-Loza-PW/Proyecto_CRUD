import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Marcas from './pages/Marcas';
import Modelos from './pages/Modelos';
import Productos from './pages/Productos';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/marcas"
          element={
            <PrivateRoute>
              <Marcas />
            </PrivateRoute>
          }
        />
        <Route
          path="/modelos"
          element={
            <PrivateRoute>
              <Modelos />
            </PrivateRoute>
          }
        />
        <Route
          path="/productos"
          element={
            <PrivateRoute>
              <Productos />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;