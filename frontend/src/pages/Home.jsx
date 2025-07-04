import { useEffect, useState } from 'react';
import { getMarcas } from '../services/api';
import MarcaCard from '../components/MarcaCard';
// import CarouselOfertas from '../components/CarouselOfertas'; // desactivado temporalmente
import useAuth from '../hooks/useAuth';

const Home = () => {
  const [marcas, setMarcas] = useState([]);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      getMarcas()
        .then((res) => {
          console.log('✅ Marcas recibidas:', res.data);
          setMarcas(res.data);
        })
        .catch((err) => {
          console.error('Error cargando marcas:', err);
          setError('No se pudieron cargar las marcas');
        });
    }
  }, [isAuthenticated]);

  const ofertas = [
    { src: '/oferta1.png', texto: 'Descuento exclusivo' },
    { src: '/oferta2.png', texto: '2x1 en productos seleccionados' },
    { src: '/oferta3.png', texto: '¡Solo por hoy!' },
    { src: '/oferta4.png', texto: 'Oferta en lámparas' },
    { src: '/oferta5.png', texto: 'Oferta en bujías' },
    { src: '/oferta6.png', texto: 'Oferta inyección' }
  ];

  return (
    <div style={{ backgroundColor: '#0c1231', color: '#fff', minHeight: '100vh' }}>
      
      <div className="text-center">
        <img
          src="/cm4.png"
          alt="Banner Principal"
          className="img-fluid"
          style={{
            width: '500px',
            height: '750px',
            objectFit: 'cover',
            objectPosition: 'top center',
            marginTop: '60px',
          }}
        />
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4" style={{ color: '#feda00' }}>Nuestros Productos</h2>
        {isAuthenticated ? (
          <div className="row">
            {marcas.length > 0 ? (
              marcas.map((marca) => (
                <MarcaCard key={marca.id_marca} marca={marca} />
              ))
            ) : (
              <div className="text-center">{error || 'Cargando productos...'}</div>
            )}
          </div>
        ) : (
          <p className="text-center text-warning">Inicia sesión para ver nuestros productos disponibles</p>
        )}
      </div>

      {/* Bloques informativos */}
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="/historia.png" className="img-fluid rounded" alt="Historia" />
          </div>
          <div className="col-md-6">
            <h3 className="fs-2" style={{ color: '#00e0ff' }}>Nuestra Historia</h3>
            <p className="lead">
              Desde los 80s, impulsamos el mercado automotriz con pasión y tecnología.
              Nuestra misión es encender tu motor con confianza.
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row align-items-center flex-md-row-reverse">
          <div className="col-md-6">
            <img src="/sponsors.png" className="img-fluid rounded" alt="Sponsors" />
          </div>
          <div className="col-md-6">
            <h3 className="fs-2" style={{ color: '#7c2bdc' }}>Embajadores de nuestra marca</h3>
            <p className="lead">
              "La pasión por la velocidad y la calidad: Franco Colapinto y Chispa Mortal 
              trabajando juntos para alcanzar la excelencia".
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="/imagenoferta.png" className="img-fluid rounded" alt="Ofertas" />
          </div>
          <div className="col-md-6">
            <h3 className="fs-2" style={{ color: '#00e0ff' }}>Ofertas</h3>
            <p className="lead">
              La cara del mecánico cuando llegas con productos de mala calidad, ¡
              y encima más caros que nuestras ofertas!
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <div className="row align-items-center flex-md-row-reverse">
          <div className="col-md-6">
            <img src="/diego.png" className="img-fluid rounded" alt="Sponsors" />
          </div>
          <div className="col-md-6">
            <h3 className="fs-2" style={{ color: '#7c2bdc' }}>
              "Yo usé chat GPT y pagué, pero el código... el código no se mancha"
            </h3>
            <p className="lead">
              Por cuestiones de tiempo, me ayudé un poco bastante con ChatGPT para terminar el front, 
              pero a medida que quería avanzar me encontraba copiando código de correcciones que la misma IA se hacía.
              Ahora el proyecto es de ella y quedó mucho mejor ahora que depender de nuestra benévola inteligencia superior.
              <br /><br />Con amor, niñito...
            </p>
          </div>
        </div>
      </div>

      {/*
      <div className="container mt-5 mb-5">
        <h3 className="text-center mb-4" style={{ color: '#feda00' }}>Ofertas Exclusivas</h3>
        <CarouselOfertas imagenes={ofertas} />
      </div>
      */}
    </div>
  );
};

export default Home;
