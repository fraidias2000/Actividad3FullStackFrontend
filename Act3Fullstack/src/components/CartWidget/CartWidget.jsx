import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Tu hook de Ana
import './CartWidget.css';

const CartWidget = () => {
    const { totalItems } = useCart();

    return (
        <Link to="/carrito" className="cart-widget">
            <div className="cart-icon-container">
                <span className="cart-icon">🛒</span>
                {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                )}
            </div>
        </Link>
    );
};

export default CartWidget;