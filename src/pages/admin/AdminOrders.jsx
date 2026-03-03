import React, { useState } from 'react';
import './AdminOrders.css';

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export const AdminOrders = () => {
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem('nevermind_orders') || '[]');
  });

  const [expandedOrder, setExpandedOrder] = useState(null);

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    localStorage.setItem('nevermind_orders', JSON.stringify(updated));
  };

  const sortedOrders = [...orders].reverse();

  return (
    <div className="admin-orders-page">
      <div className="page-header">
        <h1>Orders</h1>
        <span className="total-orders">{orders.length} Total Orders</span>
      </div>

      <div className="orders-container">
        {sortedOrders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>DATE</th>
                <th>ITEMS</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map(order => (
                <React.Fragment key={order.id}>
                  <tr className="order-row">
                    <td>{order.id}</td>
                    <td>{order.customer.firstName} {order.customer.lastName}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</td>
                    <td className="price">${order.total.toFixed(2)}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="status-select"
                      >
                        {STATUSES.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="expand-btn"
                        onClick={() => setExpandedOrder(
                          expandedOrder === order.id ? null : order.id
                        )}
                      >
                        {expandedOrder === order.id ? '▲' : '▼'}
                      </button>
                    </td>
                  </tr>

                  {expandedOrder === order.id && (
                    <tr className="order-details-row">
                      <td colSpan="7">
                        <div className="order-details">
                          <div className="details-column">
                            <h4>CUSTOMER DETAILS</h4>
                            <p><strong>Name:</strong> {order.customer.firstName} {order.customer.lastName}</p>
                            <p><strong>Email:</strong> {order.customer.email}</p>
                            <p><strong>Address:</strong> {order.customer.address}</p>
                            <p><strong>City:</strong> {order.customer.city}</p>
                            <p><strong>ZIP:</strong> {order.customer.zip}</p>
                            <p><strong>Country:</strong> {order.customer.country}</p>
                          </div>

                          <div className="details-column">
                            <h4>ORDER ITEMS</h4>
                            {order.items.map((item, idx) => (
                              <div key={idx} className="item-detail">
                                <p><strong>{item.name}</strong></p>
                                <p>Size: {item.size} | Qty: {item.quantity} | ${item.price} each</p>
                              </div>
                            ))}
                          </div>

                          <div className="details-column">
                            <h4>ORDER SUMMARY</h4>
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p className="total"><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-orders">
            <p>No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
