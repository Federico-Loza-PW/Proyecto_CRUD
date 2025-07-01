import useAuth from '../hooks/useAuth';

const ProductoCard = ({ producto }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="col-md-6 mb-3">
      <div className="card h-100 shadow" style={{ backgroundColor: '#2a2855', color: '#fff' }}>
        <img src={producto.imagen_producto} className="card-img-top" alt={producto.nombre_producto} />
        <div className="card-body text-center">
          <h5 className="card-title">{producto.nombre_producto}</h5>
          <p className="card-text">Precio: ${producto.precio}</p>
          {isAuthenticated ? (
            <button className="btn btn-primary">Comprar</button>
          ) : (
            <button className="btn btn-outline-light" disabled>Inicia sesión para comprar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
