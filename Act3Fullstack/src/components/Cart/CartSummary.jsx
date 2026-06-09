import './CartSummary.css';

const CartSummary = ({ totalItems, totalPrice, onCheckout }) => {
    return (
        <aside className="cart-sidebar">
            <div className="summary-card">
                <h3>Resumen de compra</h3>
                <div className="summary-line">
                    <span>Productos ({totalItems}):</span>
                    <span>{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="summary-line">
                    <span>Envío:</span>
                    <span className="free-text">Gratis</span>
                </div>
                <div className="summary-line total">
                    <span>Total:</span>
                    <span>{totalPrice.toFixed(2)}€</span>
                </div>
                <button className="btn-checkout-main" onClick={onCheckout}>
                    Ir a Pagar
                </button>
            </div>
        </aside>
    );
};

export default CartSummary;