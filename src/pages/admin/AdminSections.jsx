import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import './AdminSections.css';

export const AdminSections = () => {
  const { sections, addSection, updateSection, deleteSection, reorderSections } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('men');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const categorySections = sections[activeCategory] || [];

  const handleAddSection = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      addSection(activeCategory, {
        title: formData.title,
        description: formData.description
      });
      setFormData({ title: '', description: '' });
      setShowForm(false);
    }
  };

  const handleUpdateSection = (e, sectionId) => {
    e.preventDefault();
    if (formData.title.trim()) {
      updateSection(activeCategory, sectionId, {
        title: formData.title,
        description: formData.description
      });
      setEditingId(null);
      setFormData({ title: '', description: '' });
    }
  };

  const handleEditClick = (section) => {
    setEditingId(section.id);
    setFormData({ title: section.title, description: section.description });
    setShowForm(true);
  };

  const handleDeleteSection = (sectionId) => {
    deleteSection(activeCategory, sectionId);
    setDeleteConfirm(null);
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const newOrder = [...categorySections];
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
      reorderSections(activeCategory, newOrder);
    }
  };

  const handleMoveDown = (index) => {
    if (index < categorySections.length - 1) {
      const newOrder = [...categorySections];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      reorderSections(activeCategory, newOrder);
    }
  };

  const handleToggleActive = (sectionId) => {
    const section = categorySections.find(s => s.id === sectionId);
    updateSection(activeCategory, sectionId, { active: !section.active });
  };

  return (
    <div className="admin-sections-page">
      <div className="page-header">
        <Link to="/admin/dashboard" className="back-link">← Back to Dashboard</Link>
        <h1>Manage Collection Sections</h1>
        <p>Create and organize product collection sections for Men and Women categories</p>
      </div>

      <div className="sections-container">
        {/* Category Tabs */}
        <div className="category-tabs">
          <button
            className={`tab ${activeCategory === 'men' ? 'active' : ''}`}
            onClick={() => setActiveCategory('men')}
          >
            👨 Men's Sections
          </button>
          <button
            className={`tab ${activeCategory === 'women' ? 'active' : ''}`}
            onClick={() => setActiveCategory('women')}
          >
            👩 Women's Sections
          </button>
        </div>

        {/* Add Section Form */}
        {!showForm ? (
          <button className="add-section-btn" onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData({ title: '', description: '' });
          }}>
            ➕ Add New Section
          </button>
        ) : (
          <div className="form-card">
            <h3>{editingId ? 'Edit Section' : 'Add New Section'}</h3>
            <form onSubmit={(e) => editingId ? handleUpdateSection(e, editingId) : handleAddSection(e)}>
              <div className="form-group">
                <label>Section Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., New Arrivals, Best Sellers"
                  required
                />
              </div>

              <div className="form-group">
                <label>Section Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Latest men collection, Most popular items"
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  {editingId ? 'Update Section' : 'Add Section'}
                </button>
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ title: '', description: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Sections List */}
        <div className="sections-list">
          <h3>Active Sections for {activeCategory === 'men' ? "Men's" : "Women's"} Category</h3>
          
          {categorySections.length === 0 ? (
            <div className="empty-state">
              <p>No sections created yet. Create your first section to get started.</p>
            </div>
          ) : (
            <div className="sections-grid">
              {categorySections.map((section, index) => (
                <div key={section.id} className={`section-card ${!section.active ? 'inactive' : ''}`}>
                  <div className="section-header">
                    <div className="section-info">
                      <h4>{section.title}</h4>
                      <p>{section.description}</p>
                    </div>
                    <span className={`status-badge ${section.active ? 'active' : 'inactive'}`}>
                      {section.active ? '✓ Active' : '✕ Inactive'}
                    </span>
                  </div>

                  <div className="section-meta">
                    <span className="position">Position: {index + 1}</span>
                  </div>

                  <div className="section-actions">
                    <button 
                      className="btn-move"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      title="Move up"
                    >
                      ▲ Up
                    </button>
                    <button 
                      className="btn-move"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === categorySections.length - 1}
                      title="Move down"
                    >
                      ▼ Down
                    </button>
                    <button
                      className={`btn-toggle ${section.active ? 'on' : 'off'}`}
                      onClick={() => handleToggleActive(section.id)}
                      title={section.active ? 'Deactivate' : 'Activate'}
                    >
                      {section.active ? '✓ Active' : '○ Inactive'}
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClick(section)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => setDeleteConfirm(section.id)}
                    >
                      🗑️ Delete
                    </button>

                    {deleteConfirm === section.id && (
                      <div className="delete-confirm-modal">
                        <p>Delete this section?</p>
                        <div className="confirm-actions">
                          <button 
                            className="confirm-yes"
                            onClick={() => handleDeleteSection(section.id)}
                          >
                            Yes, Delete
                          </button>
                          <button 
                            className="confirm-no"
                            onClick={() => setDeleteConfirm(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="info-box">
          <h4>📋 How Collection Sections Work:</h4>
          <ul>
            <li><strong>Create Sections:</strong> Add custom sections like "New Arrivals", "Best Sellers", etc.</li>
            <li><strong>Organize:</strong> Reorder sections using the up/down buttons to control display order</li>
            <li><strong>Toggle:</strong> Activate or deactivate sections without deleting them</li>
            <li><strong>Edit:</strong> Update section titles and descriptions anytime</li>
            <li><strong>Products:</strong> Products are displayed based on their attributes (newest, on sale, featured)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSections;
