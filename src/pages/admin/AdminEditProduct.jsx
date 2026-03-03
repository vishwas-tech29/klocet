import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import './AdminEditProduct.css';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const CATEGORIES = ['Hoodies', 'Tees', 'Bottoms', 'Accessories'];
const BADGES = ['Sale', 'New', 'Limited'];

export const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProducts();
  const product = getProductById(id);

  const [formData, setFormData] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product
      });
    } else {
      navigate('/admin/products');
    }
  }, [product, navigate]);

  if (!formData) return <div>Loading...</div>;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (formData.images.length < 5) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, event.target.result]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (formData.images.length < 5) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, event.target.result]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock || formData.sizes.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    updateProduct(id, {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price),
      stock: parseInt(formData.stock)
    });

    navigate('/admin/products');
  };

  return (
    <div className="admin-edit-product-page">
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-section">
          <h2>PRODUCT INFORMATION</h2>

          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleInputChange} required>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Badge</label>
              <select name="badge" value={formData.badge} onChange={handleInputChange}>
                <option value="">None</option>
                {BADGES.map(badge => (
                  <option key={badge} value={badge}>{badge}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                step="0.01"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="onSale"
                  checked={formData.onSale}
                  onChange={handleInputChange}
                />
                On Sale
              </label>
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                />
                Featured Product
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="5"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Available Sizes *</label>
            <div className="sizes-selector">
              {SIZES.map(size => (
                <button
                  key={size}
                  type="button"
                  className={`size-btn ${formData.sizes.includes(size) ? 'active' : ''}`}
                  onClick={() => handleSizeToggle(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Stock Quantity *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
        </div>

        {/* Images Section */}
        <div className="form-section">
          <h2>PRODUCT IMAGES</h2>
          <p className="section-hint">Upload up to 5 images</p>

          <div
            className={`drag-drop-zone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <p>Drag images here or click to browse</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-input"
            />
            <label htmlFor="image-input" className="browse-btn">
              ADD MORE IMAGES
            </label>
          </div>

          {formData.images.length > 0 && (
            <div className="image-previews">
              <h3>Product Images ({formData.images.length}/5)</h3>
              <div className="previews-grid">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="preview-item">
                    <img src={img} alt={`Preview ${idx + 1}`} />
                    <button
                      type="button"
                      className="remove-img-btn"
                      onClick={() => removeImage(idx)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            SAVE CHANGES
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/admin/products')}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};
