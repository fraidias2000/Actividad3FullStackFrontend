import {useContext, useState} from 'react';
import { useCart } from '../../context/CartContext';
import './OrderSummary.css';
import {OrderContext} from "../../context/OrderContext.jsx";

const OrderSummary = ({ onPay }) => {
  const { totalPrice, cart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const { addOrder } = useContext(OrderContext);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'DESCUENTO10') {
      setDiscount(totalPrice * 0.10);
      alert('¡Cupón aplicado con éxito!');
    } else {
      alert('Cupón no válido');
      setDiscount(0);
    }
  };

  const finalTotal = totalPrice - discount;

  // Función para añadir nuevo pedido al historial
  const handleConfirmOrder = () => {
    const newOrderData = {
      status: 'Entregado',
      address: 'Calle Mayor, 123',
      total: finalTotal,
      items: cart.map(item => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity || 1
      }))
    };

    addOrder(newOrderData);

    onPay(finalTotal);
  };

  return (
    <div className="checkout-column-card">
      <h3>Resumen de orden</h3>
      
      <div className="promo-section">
        <input 
          type="text" 
          placeholder="Cupón: DESCUENTO10" 
          className="coupon-input"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button 
          type="button" 
          className="btn-apply" 
          onClick={handleApplyCoupon}
        >
          Aplicar
        </button>
      </div>

      <div className="summary-details">
        <div className="line">
          <span>Subtotal</span>
          <span>{totalPrice.toFixed(2)}€</span>
        </div>
        
        {discount > 0 && (
          <div className="line discount-line">
            <span>Descuento (10%)</span>
            <span>-{discount.toFixed(2)}€</span>
          </div>
        )}

        <div className="line">
          <span>Envío</span>
          <span className="free">Gratis</span>
        </div>
        
        <div className="line total-row">
          <span>Total</span>
          <span>{finalTotal.toFixed(2)}€</span>
        </div>
      </div>

      <div className="summary-footer">
        {/* Aquí ejecutamos la función que viene del padre pasando el precio final */}
        <button 
          className="btn-pay-now" 
          onClick={handleConfirmOrder}
        >
          Confirmar y Pagar
        </button>
        <p className="secure-tag">🔒 Pago seguro encriptado SSL</p>
      </div>
    </div>
  );
};

export default OrderSummary;