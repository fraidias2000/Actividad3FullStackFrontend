import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react'; 
import './CartItem.css';

const CartItem = ({ item }) => {
    const { addToCart, removeFromCart, deleteFromCart } = useCart();

    return (
        <div className="cart-item-card">
            <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
            </div>
            
            <div className="cart-item-info">
                <div className="item-header">
                    <h4>{item.title}</h4>
                    <span className="item-price">{(item.price * item.quantity).toFixed(2)}€</span>
                </div>
                
                <div className="item-controls-row">
                    <div className="qty-selector">
                        <button className="qty-btn" onClick={() => removeFromCart(item.id)}> - </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => addToCart(item)}> + </button>
                    </div>

                    <button className="btn-remove" onClick={() => deleteFromCart(item.id)}>
                        <Trash2 size={16} />
                        <span>Quitar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;