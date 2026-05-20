import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const STORAGE_KEY = "cartItems_v1";

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                setCartItems(JSON.parse(raw));
            }
        } catch (_) {
            console.error("Error cargando el carrito desde localStorage");
        }
    }, []);

    // Guardar en localStorage cada vez que cambian los items
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.title === product.title);

            if (existingItemIndex >= 0) {
                // Item existe, incrementar cantidad
                const newItems = [...prevItems];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    qty: newItems[existingItemIndex].qty + 1
                };
                return newItems;
            } else {
                // Nuevo item
                return [...prevItems, { ...product, qty: 1 }];
            }
        });
        openCart();
    };

    const changeQuantity = (title, delta) => {
        setCartItems(prevItems => {
            return prevItems.map(item => {
                if (item.title === title) {
                    const newQty = Math.max(1, item.qty + delta);
                    return { ...item, qty: newQty };
                }
                return item;
            });
        });
    };

    const removeFromCart = (title) => {
        setCartItems(prevItems => prevItems.filter(item => item.title !== title));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            toggleCart,
            openCart,
            closeCart,
            addToCart,
            changeQuantity,
            removeFromCart,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
