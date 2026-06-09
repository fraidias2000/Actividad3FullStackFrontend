import "./OrderItem.css"
import {useState} from "react";

const OrderItem = ({ order }) => {

    // HOOK para ver detalle
    const [isExpanded, setIsExpanded] = useState(false);

    return (
            <div className={`order-item-card ${isExpanded ? 'expanded' : ''}`}>
                <div className="order-card-title">
                    <span className="order-card-title-text">{order.id}</span>
                    <span className="order-card-title-tag">
                    {order.status}
                </span>
                </div>
                <div className="order-card-content">
                <span className="order-card-content-date">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#e3e3e3"><path d="M216-96q-29.7 0-50.85-21.5Q144-139 144-168v-528q0-29 21.15-50.5T216-768h72v-96h72v96h240v-96h72v96h72q29.7 0 50.85 21.5Q816-725 816-696v528q0 29-21.15 50.5T744-96H216Zm0-72h528v-360H216v360Zm0-432h528v-96H216v96Zm0 0v-96 96Z"/></svg>
                    {new Date(order.date).toLocaleDateString('es-ES')}
                </span>
                    <span className="order-card-content-products">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#e3e3e3"><path d="M444-189v-270L216-591v270l228 132Zm72 0 228-131v-270L516-459v270Zm-72 84L180-258q-17.1-9.88-26.55-26.06Q144-300.23 144-320v-320q0-19.77 9.45-35.94Q162.9-692.12 180-702l264-153q17.13-10 36.07-10Q499-865 516-855l264 153q17.1 9.88 26.55 26.06Q816-659.77 816-640v320q0 19.77-9.45 35.94Q797.1-267.88 780-258L516-105q-17.13 10-36.07 10Q461-95 444-105Zm188-505 83-47-236-135-80 47 233 135Zm-152 88 82-47-237-134-80 46 235 135Z"/></svg>
                        {order.items.length} {order.items.length === 1 ? 'Artículo' : 'Artículos'}
                </span>
                    <span className="order-card-content-address">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#e3e3e3"><path d="M531-501q21-21 21-51t-21-51q-21-21-51-21t-51 21q-21 21-21 51t21 51q21 21 51 21t51-21Zm-51 310q119-107 179.5-197T720-549q0-105-68.5-174T480-792q-103 0-171.5 69T240-549q0 71 60.5 161T480-191Zm0 95Q323-227 245.5-339.5T168-549q0-134 89-224.5T480-864q133 0 222.5 90.5T792-549q0 97-77 209T480-96Zm0-456Z"/></svg>
                        {order.address}
                </span>
                    <span className="order-card-content-total">{order.total.toFixed(2)}€</span>
                    <button className="order-card-content-detail" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? 'Ocultar' : 'Ver detalle'}
                    </button>

                </div>


                {isExpanded && (
                    <div className="order-card-details-expanded">
                        <h4>Resumen de productos</h4>
                        <ul className="order-books-list">
                            {order.items.map((libro, index) => (
                                <li key={index} className="order-book-row">
                                <span className="book-info-main">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#e3e3e3"><path d="M288-96q-40 0-68-27.5T192-190v-553q0-34 22-59.5t56-32.5l354-74v626l-338.95 71.13Q277-210 270.5-203.75 264-197.5 264-190q0 10 7.2 16t16.8 6h407.55v-624H768v696H288Zm96-211 168-36v-477l-168 35v478Zm-72 15v-477l-30 6q-8 2-13 7.19T264-743v463q5-2 10.5-3t10.5-3l27-6Zm-48-469v481-481Z"/></svg>
                                    <span className="book-qty">
                                        {libro.quantity}x
                                    </span>
                                     { libro.title}
                                </span>
                                    <span className="book-price-subtotal">
                                    {(libro.price * (libro.quantity || 1)).toFixed(2)}€
                                </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>

    )
}

export default OrderItem;