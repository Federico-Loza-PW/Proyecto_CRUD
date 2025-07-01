const MarcaCard = ({ marca, onClick }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 shadow" onClick={onClick} style={{ cursor: 'pointer', backgroundColor: '#0c1231', color: '#fff' }}>
        <img src={marca.imagen_marca} className="card-img-top" alt={marca.marca} />
        <div className="card-body text-center">
          <h5 className="card-title">{marca.marca}</h5>
        </div>
      </div>
    </div>
  );
};

export default MarcaCard;