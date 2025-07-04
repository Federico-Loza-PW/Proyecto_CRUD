import { useEffect, useState } from 'react';
import { getMarcas } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/app.css';

function Marcas() {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMarcas();
        setMarcas(response.data);
      } catch (error) {
        console.error('Error al cargar marcas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Cargando marcas...</p>;

  return (
    <div className="container">
      <h1>Marcas disponibles</h1>
      <div className="grid">
        {marcas.map((marca) => {
          const nombre = marca.marca?.toLowerCase();
          const imagen =
            nombre === 'volkswagen' || nombre === 'vw'
              ? '/marcas/vw.png'
              : `/marcas/${nombre}.png`;
          return (
            <div
              key={marca.id_marca}
              className="card"
              onClick={() => navigate(`/modelos/${marca.id_marca}`)}
            >
              <img src={imagen} alt={marca.marca} />
              <h2>{marca.marca}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Marcas;
