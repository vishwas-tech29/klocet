import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialProducts } from '../data/initialProducts';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load from localStorage or use initialProducts
  useEffect(() => {
    const saved = localStorage.getItem('nevermind_products');
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading products:', e);
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('nevermind_products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, ...updatedData } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured).slice(0, 4);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      getProductsByCategory,
      getFeaturedProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
