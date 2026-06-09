import './TarjetaForm.css';

const TarjetaForm = () => {
  return (
    <div className="form-fade tarjeta-container">
      <div className="input-box">
        <label>Nombre en la tarjeta</label>
        <input type="text" placeholder="Juan Pérez" required />
      </div>
      <div className="input-box">
        <label>Número de tarjeta</label>
        <input type="text" placeholder="0000 0000 0000 0000" required />
      </div>
      <div className="input-row">
        <div className="input-box">
          <label>Expiración</label>
          <input type="text" placeholder="MM/AA" required />
        </div>
        <div className="input-box">
          <label>CVC</label>
          <input type="password" placeholder="***" required />
        </div>
      </div>
    </div>
  );
};

export default TarjetaForm;