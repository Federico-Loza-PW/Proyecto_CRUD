import { useState, useEffect } from 'react';
import { getMarcas, getModelos, getProductos } from '../services/api';
import MarcaCard from '../components/MarcaCard';
import ModeloCard from '../components/ModeloCard';
import ProductoCard from '../components/ProductoCard';

const Catalogo = () => {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [selectedModelo, setSelectedModelo] = useState(null);

  useEffect(() => {
    getMarcas().then(res => setMarcas(res.data)).catch(console.error);
  }, []);

  const handleMarcaClick = async (marcaId) => {
    setSelectedMarca(marcaId);
    setProductos([]);
    setSelectedModelo(null);
    try {
      const res = await getModelos(marcaId);
      setModelos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleModeloClick = async (modeloId) => {
    setSelectedModelo(modeloId);
    try {
      const res = await getProductos(modeloId);
      setProductos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Catálogo</h2>

      <section>
        <h4>Marcas</h4>
        <div className="row">
          {marcas.map(marca => (
            <MarcaCard key={marca.id_marca} marca={marca} onClick={() => handleMarcaClick(marca.id_marca)} />
          ))}
        </div>
      </section>

      {selectedMarca && (
        <section className="mt-4">
          <h4>Modelos</h4>
          <div className="row">
            {modelos.map(modelo => (
              <ModeloCard key={modelo.id_modelo} modelo={modelo} onClick={() => handleModeloClick(modelo.id_modelo)} />
            ))}
          </div>
        </section>
      )}

      {selectedModelo && (
        <section className="mt-4">
          <h4>Productos</h4>
          <div className="row">
            {productos.map(producto => (
              <ProductoCard key={producto.id_producto} producto={producto} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Catalogo;
