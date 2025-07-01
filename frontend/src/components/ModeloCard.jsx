const ModeloCard = ({ modelo, onClick }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 shadow" onClick={onClick} style={{ cursor: 'pointer', backgroundColor: '#1e1e3f', color: '#fff' }}>
        <img src={modelo.imagen_modelo} className="card-img-top" alt={modelo.nombre_modelo} />
        <div className="card-body text-center">
          <h5 className="card-title">{modelo.nombre_modelo}</h5>
          <p className="card-text">${modelo.precio}</p>
        </div>
      </div>
    </div>
  );
};

export default ModeloCard;
