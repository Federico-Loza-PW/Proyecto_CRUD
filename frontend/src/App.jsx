import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Marcas from './pages/Marcas';
import Modelos from './pages/Modelos';
import Productos from './pages/Productos';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marcas" element={<Marcas />} />
      <Route path="/modelos" element={<Modelos />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;