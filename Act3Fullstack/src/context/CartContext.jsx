import { createContext, useState, useContext } from 'react';

// 1. Creamos el Contexto
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // FUNCIÓN: Añadir al carrito (o sumar 1 si ya existe)
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // FUNCIÓN: Restar 1 unidad (si llega a 0, se elimina automáticamente)
    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === productId);
            
            if (existingProduct.quantity === 1) {
                // Si solo queda uno, filtramos para quitarlo
                return prevCart.filter(item => item.id !== productId);
            }
            
            // Si hay más de uno, restamos la cantidad
            return prevCart.map(item =>
                item.id === productId 
                ? { ...item, quantity: item.quantity - 1 } 
                : item
            );
        });
    };

    // FUNCIÓN: Eliminar el producto completo (sin importar la cantidad)
    const deleteFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    // FUNCIÓN: Vaciar todo el carrito (para el botón de "Limpiar Carrito")
    const clearCart = () => {
        setCart([]);
    };

    // CÁLCULOS AUTOMÁTICOS
    // Total de productos (ej: 2 libros de uno + 1 de otro = 3 items)
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    // Precio total de la compra
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            deleteFromCart, // <--- Nueva
            clearCart, 
            totalItems, 
            totalPrice 
        }}>
            {children}
        </CartContext.Provider>
    );
};

// 3. Custom Hook para usar el carrito en cualquier componente
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};