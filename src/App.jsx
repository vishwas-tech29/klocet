import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AdminProvider } from './context/AdminContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

// Pages
import { Home } from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminAddProduct } from './pages/admin/AdminAddProduct';
import { AdminEditProduct } from './pages/admin/AdminEditProduct';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminHero } from './pages/admin/AdminHero';

function App() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  return (
    <AdminProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute>
                  <AdminProducts />
                </ProtectedRoute>
              } />
              <Route path="/admin/products/add" element={
                <ProtectedRoute>
                  <AdminAddProduct />
                </ProtectedRoute>
              } />
              <Route path="/admin/products/edit/:id" element={
                <ProtectedRoute>
                  <AdminEditProduct />
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute>
                  <AdminOrders />
                </ProtectedRoute>
              } />
              <Route path="/admin/hero" element={
                <ProtectedRoute>
                  <AdminHero />
                </ProtectedRoute>
              } />

              {/* Storefront Routes */}
              <Route path="/" element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                  <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
                </>
              } />
              <Route path="/men" element={
                <>
                  <Navbar />
                  <Men />
                  <Footer />
                </>
              } />
              <Route path="/women" element={
                <>
                  <Navbar />
                  <Women />
                  <Footer />
                </>
              } />
              <Route path="/catalog" element={
                <>
                  <Navbar />
                  <Catalog />
                  <Footer />
                </>
              } />
              <Route path="/product/:id" element={
                <>
                  <Navbar />
                  <ProductDetail />
                  <Footer />
                </>
              } />
              <Route path="/cart" element={
                <>
                  <Navbar />
                  <Cart />
                  <Footer />
                </>
              } />
              <Route path="/checkout" element={
                <>
                  <Navbar />
                  <Checkout />
                  <Footer />
                </>
              } />
              <Route path="/about" element={
                <>
                  <Navbar />
                  <About />
                  <Footer />
                </>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AdminProvider>
  );
}

export default App;
