import { useEffect, useState } from 'react';
import { getModelos } from '../services/api';
import useAuth from '../hooks/useAuth';

const Modelos = () => {
  const [modelos, setModelos] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const response = await getModelos(); // sin parámetro por ahora
        setModelos(response.data);
      } catch (error) {
        console.error('Error al obtener modelos:', error);
      }
    };

    fetchModelos();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Modelos</h2>
      <div className="row">
        {modelos.map((modelo) => (
          <div className="col-md-4 mb-4" key={modelo.id}>
            <div className="card h-100">
              <img src={modelo.imagen_modelo} className="card-img-top" alt={modelo.nombre_modelo} />
              <div className="card-body">
                <h5 className="card-title">{modelo.nombre_modelo}</h5>
                <p className="card-text">Precio: ${modelo.precio}</p>
                {isAuthenticated ? (
                  <button className="btn btn-primary">Comprar</button>
                ) : (
                  <button className="btn btn-secondary" disabled>
                    Inicia sesión para comprar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modelos;