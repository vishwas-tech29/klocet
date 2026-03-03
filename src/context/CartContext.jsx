import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nevermind_cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('nevermind_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, qty) => {
    const existingItem = cartItems.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + qty }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, size, quantity: qty }]);
    }
  };

  const removeFromCart = (id, size) => {
    setCartItems(cartItems.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQty = (id, size, qty) => {
    if (qty <= 0) {
      removeFromCart(id, size);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity: qty }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
