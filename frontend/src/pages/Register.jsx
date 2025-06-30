import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(data);
      navigate('/login');
    } catch (error) {
      alert('Error al registrarse');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" className="form-control mb-2" placeholder="Nombre" onChange={handleChange} required />
        <input type="email" name="email" className="form-control mb-2" placeholder="Correo" onChange={handleChange} required />
        <input type="password" name="password" className="form-control mb-2" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit" className="btn btn-success">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;