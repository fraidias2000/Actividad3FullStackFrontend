import { CreditCard, Wallet } from 'lucide-react';
import TarjetaForm from './TarjetaForm';
import PaypalForm from './PaypalForm';
import './PaymentMethod.css';

const PaymentMethod = ({ metodo, setMetodo }) => {
  return (
    <div className="checkout-column-card">
      <h3>Método de Pago</h3>
      
      <div className="payment-selector">
        <label className={`pay-option ${metodo === 'tarjeta' ? 'active' : ''}`}>
          <input type="radio" name="pay" onChange={() => setMetodo('tarjeta')} checked={metodo === 'tarjeta'} />
          <CreditCard size={24} />
          <span>Tarjeta</span>
        </label>
        <label className={`pay-option ${metodo === 'paypal' ? 'active' : ''}`}>
          <input type="radio" name="pay" onChange={() => setMetodo('paypal')} checked={metodo === 'paypal'} />
          <Wallet size={24} />
          <span>PayPal</span>
        </label>
      </div>

      <div className="payment-content-area">
        {metodo === 'tarjeta' ? <TarjetaForm /> : <PaypalForm />}
      </div>
    </div>
  );
};

export default PaymentMethod;