import CartItem from './CartItem';
import './CartList.css';

const CartList = ({ cart }) => {
    return (
        <div className="cart-items-wrapper">
            <div className="cart-items-list">
                {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default CartList;