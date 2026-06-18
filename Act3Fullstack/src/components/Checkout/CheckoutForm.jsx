import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import './CheckoutForm.css';
import { useAuth } from "../../context/AuthContext";

const CheckoutForm = ({ onOrderSuccess }) => {
  const { clearCart } = useCart();
  const [metodo, setMetodo] = useState('tarjeta');
  
  // Tu lógica de login original
const { isAuthenticated } = useAuth();

  // Esta es la función que recupera tu lógica anterior
  const manejarPagoFinal = (montoTotal) => {
   
    
    // 1. Vaciamos el carrito
    clearCart();
    
    // 2. Lanzamos el aviso de éxito (el modal)
    onOrderSuccess();
  };

if (!isAuthenticated) {
    return (
      <div className="login-alert">
        <h3>Debes estar loggeado</h3>
        <p>Para finalizar la compra, por favor inicia sesión.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <div className="checkout-page-layout">
        {/* Pasamos el estado del método para saber si es tarjeta o paypal en el alert */}
        <PaymentMethod metodo={metodo} setMetodo={setMetodo} />
        
        {/* Pasamos la función de pago al resumen */}
        <OrderSummary onPay={manejarPagoFinal} />
      </div>
    </div>
  );
};

export default CheckoutForm;