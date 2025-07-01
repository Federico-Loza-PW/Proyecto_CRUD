const CarouselOfertas = ({ imagenes }) => {
  return (
    <div id="carouselOfertas" className="carousel slide mt-4" data-bs-ride="carousel">
      <div className="carousel-inner">
        {imagenes.map((img, index) => (
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
            <img src={img.src} className="d-block w-100" alt={`Oferta ${index + 1}`} />
            {img.texto && (
              <div className="carousel-caption d-none d-md-block">
                <h5>{img.texto}</h5>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselOfertas" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselOfertas" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </button>
    </div>
  );
};

export default CarouselOfertas;
