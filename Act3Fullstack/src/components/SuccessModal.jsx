import './SuccessModal.css';

const SuccessModal = ({ isOpen, onClose }) => {
    // Si isOpen es false, el componente no dibuja nada
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-icon">✅</div>
                <h2>¡Pedido Confirmado!</h2>
                <p>Muchas gracias por tu compra. Tu pedido ya está en camino.</p>
                <button className="btn-close-modal" onClick={onClose}>
                    Cerrar y volver
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;