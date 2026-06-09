import { Wallet } from 'lucide-react';
import './PaypalForm.css';

const PaypalForm = () => {
  return (
    <div className="form-fade paypal-wrapper">
      <div className="paypal-info-card">
        <Wallet size={48} color="#4f46e5" />
        <h4>Pago Express con PayPal</h4>
        <p>Serás redirigido a PayPal para completar el pago de forma segura.</p>
      </div>
      <div className="input-box">
        <label>Correo electrónico de PayPal</label>
        <input type="email" placeholder="usuario@email.com" required />
      </div>
    </div>
  );
};

export default PaypalForm;