import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import './AdminProducts.css';

export const AdminProducts = () => {
  const { products, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="admin-products-page">
      <div className="page-header">
        <h1>Products</h1>
        <Link to="/admin/products/add" className="add-btn">
          ➕ ADD NEW PRODUCT
        </Link>
      </div>

      <div className="controls-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="result-count">{filteredProducts.length} products</span>
      </div>

      <div className="products-table-container">
        {filteredProducts.length > 0 ? (
          <table className="products-table">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className="img-cell">
                    {product.images && product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : (
                      <div className="placeholder"></div>
                    )}
                  </td>
                  <td className="name-cell">{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>
                    <span className={`stock-badge ${product.stock <= 5 ? 'low' : ''}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    {product.onSale && <span className="status-sale">On Sale</span>}
                    {product.featured && <span className="status-featured">Featured</span>}
                    {!product.onSale && !product.featured && <span className="status-normal">—</span>}
                  </td>
                  <td className="actions-cell">
                    <Link to={`/admin/products/edit/${product.id}`} className="action-btn edit">
                      ✏️ Edit
                    </Link>
                    <button
                      className="action-btn delete"
                      onClick={() => setDeleteConfirm(product.id)}
                    >
                      🗑️ Delete
                    </button>

                    {deleteConfirm === product.id && (
                      <div className="delete-confirm">
                        <p>Delete this product?</p>
                        <button
                          className="confirm-yes"
                          onClick={() => handleDelete(product.id)}
                        >
                          Yes
                        </button>
                        <button
                          className="confirm-no"
                          onClick={() => setDeleteConfirm(null)}
                        >
                          No
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-products">
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};
