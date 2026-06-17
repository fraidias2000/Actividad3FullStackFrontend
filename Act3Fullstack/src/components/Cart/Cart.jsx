import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

import CartList from './CartList';
import CartSummary from './CartSummary';
import CheckoutForm from '../Checkout/CheckoutForm';
import SuccessModal from '../SuccessModal';
import './Cart.css';

const CarritoDeCompra = () => {
    const { cart, totalItems, totalPrice, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarExito, setMostrarExito] = useState(false);

    const handleCloseSuccess = () => {
        setMostrarExito(false);
        clearCart();
        navigate('/catalogo');
    };

    return (
        <div className="cart-page-container">
            <header className="cart-header-nav">
                <button onClick={() => mostrarFormulario ? setMostrarFormulario(false) : navigate(-1)}>
                    <ArrowLeft size={20} />
                    {mostrarFormulario ? "Volver" : "Seguir comprando"}
                </button>
                <h1>{mostrarFormulario ? "Finalizar Pedido" : "Mi Carrito"}</h1>
            </header>

            <div className="cart-layout-grid">
                <div className="cart-left-col">
                    {!mostrarFormulario ? (
                        <CartList cart={cart} />
                    ) : (
                        <CheckoutForm onOrderSuccess={() => setMostrarExito(true)} />
                    )}
                </div>

                {!mostrarFormulario && (
                    <CartSummary 
                        totalItems={totalItems} 
                        totalPrice={totalPrice} 
                        onCheckout={() =>
                                    isAuthenticated
                                    ? setMostrarFormulario(true)
                                    : navigate("/login?redirect=/carrito")
}
                    />
                )}
            </div>

            <SuccessModal isOpen={mostrarExito} onClose={handleCloseSuccess} />
        </div>
    );
};

export default CarritoDeCompra;