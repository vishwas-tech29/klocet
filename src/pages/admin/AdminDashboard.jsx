import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAdmin();
  const { products } = useProducts();
  const { cartItems } = useCart();

  // Get orders from localStorage
  const orders = JSON.parse(localStorage.getItem('nevermind_orders') || '[]');
  const recentOrders = orders.slice(-5).reverse();

  // Advanced metrics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const lowStockItems = products.filter(p => p.stock <= 5);
  const lowStockCount = lowStockItems.length;
  
  // Category breakdown
  const categoryStats = {};
  products.forEach(p => {
    if (!categoryStats[p.category]) {
      categoryStats[p.category] = { count: 0, revenue: 0 };
    }
    categoryStats[p.category].count += 1;
    
    // Estimate revenue from orders
    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.id === p.id) {
          categoryStats[p.category].revenue += item.price * item.quantity;
        }
      });
    });
  });

  // Top products by sales
  const productSales = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      if (!productSales[item.id]) {
        productSales[item.id] = { name: item.name, quantity: 0, revenue: 0 };
      }
      productSales[item.id].quantity += item.quantity;
      productSales[item.id].revenue += item.price * item.quantity;
    });
  });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">NEVERMIND</div>

        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className="nav-item active">
            📊 Dashboard
          </Link>
          <Link to="/admin/products" className="nav-item">
            📦 Products
          </Link>
          <Link to="/admin/products/add" className="nav-item">
            ➕ Add Product
          </Link>
          <Link to="/admin/orders" className="nav-item">
            📋 Orders
          </Link>
          <Link to="/admin/hero" className="nav-item">
            🎨 Hero Settings
          </Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <h1>Welcome back, Admin</h1>
          <button className="logout-btn-header" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <div className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{products.length}</div>
              <div className="stat-label">Total Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{orders.length}</div>
              <div className="stat-label">Total Orders</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">${totalRevenue.toFixed(0)}</div>
              <div className="stat-label">Total Revenue</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">${avgOrderValue.toFixed(0)}</div>
              <div className="stat-label">Avg Order Value</div>
            </div>
            <div className="stat-card warning">
              <div className="stat-number">{lowStockCount}</div>
              <div className="stat-label">Low Stock Items</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Object.keys(categoryStats).length}</div>
              <div className="stat-label">Categories</div>
            </div>
          </div>

          {/* Top Products Section */}
          {topProducts.length > 0 && (
            <section className="dashboard-section">
              <h2>Top Selling Products</h2>
              <div className="top-products-grid">
                {topProducts.map((product, idx) => (
                  <div key={idx} className="top-product-card">
                    <div className="rank">#{idx + 1}</div>
                    <div className="product-name">{product.name}</div>
                    <div className="product-stats">
                      <div className="stat">
                        <span className="stat-value">{product.quantity}</span>
                        <span className="stat-name">Units</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">${product.revenue.toFixed(0)}</span>
                        <span className="stat-name">Revenue</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Low Stock Items Alert */}
          {lowStockCount > 0 && (
            <section className="dashboard-section">
              <h2>⚠️ Items Needing Restock</h2>
              <div className="low-stock-list">
                {lowStockItems.map(item => (
                  <div key={item.id} className="low-stock-item">
                    <span className="item-name">{item.name}</span>
                    <span className="stock-count">Stock: {item.stock}</span>
                    <Link to={`/admin/products/edit/${item.id}`} className="edit-link">
                      Edit →
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recent Orders Table */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <Link to="/admin/orders" className="view-all-link">
                View All →
              </Link>
            </div>

            {recentOrders.length > 0 ? (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer.firstName} {order.customer.lastName}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No orders yet</p>
            )}
          </section>

          {/* Quick Actions */}
          <section className="dashboard-section">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <Link to="/admin/products/add" className="quick-action-btn">
                ➕ Add New Product
              </Link>
              <Link to="/admin/products" className="quick-action-btn">
                👁️ View All Products
              </Link>
              <Link to="/admin/hero" className="quick-action-btn">
                🎨 Edit Hero Section
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
