// OrderContext.jsx
import { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

    //HOOK para controlar pedidos
    const [orders, setOrders] = useState([]);

    //HOOK para controlar stats
    const [stats, setStats] = useState({ totalOrders: 0, totalBooks: 0 });

    // HOOK para cargar pedidos anteriores al iniciar app
    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('order_history')) || [];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrders(savedOrders);
    }, []);

    // Función para calcular stats
    const updateStats = (allOrders) => {
        const totalOrders = allOrders.length;
        const totalBooks = allOrders.reduce((acc, order) => {
            return acc + order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        }, 0);

        setStats({ totalOrders, totalBooks });
    };

    // Función para añadir un pedido al historial
    const addOrder = (newOrder) => {
        const orderWithId = {
            ...newOrder,
            id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
            date: new Date().toISOString()
        };

        setOrders((prev) => {
            const updated = [orderWithId, ...prev].slice(0, 5);
            localStorage.setItem('my_orders', JSON.stringify(updated));
            updateStats(updated); // Actualizamos contadores al momento
            return updated;
        });
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, stats }}>
            {children}
        </OrderContext.Provider>
    );
};