import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import './AdminHero.css';

export const AdminHero = () => {
  const { heroContent, updateHero } = useAdmin();
  const [formData, setFormData] = useState(heroContent);
  const [dragActive, setDragActive] = useState({});

  useEffect(() => {
    setFormData(heroContent);
  }, [heroContent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (fieldName, file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({
        ...prev,
        [fieldName]: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(prev => ({ ...prev, [field]: true }));
    } else if (e.type === 'dragleave') {
      setDragActive(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleDrop = (e, fieldName) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [fieldName]: false }));
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(fieldName, file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateHero(formData);
    alert('Hero section updated successfully!');
  };

  const removeImage = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  };

  return (
    <div className="admin-hero-page">
      <h1>Hero Section Settings</h1>

      <form onSubmit={handleSubmit} className="hero-form">
        {/* Text Content */}
        <div className="form-section">
          <h2>HERO TEXT</h2>

          <div className="form-group">
            <label>Headline Line 1</label>
            <input
              type="text"
              name="headline1"
              value={formData.headline1}
              onChange={handleInputChange}
              placeholder="e.g., DESIGNED"
              maxLength="30"
            />
          </div>

          <div className="form-group">
            <label>Headline Line 2</label>
            <input
              type="text"
              name="headline2"
              value={formData.headline2}
              onChange={handleInputChange}
              placeholder="e.g., TO"
              maxLength="30"
            />
          </div>

          <div className="form-group">
            <label>Headline Line 3</label>
            <input
              type="text"
              name="headline3"
              value={formData.headline3}
              onChange={handleInputChange}
              placeholder="e.g., DISRUPT"
              maxLength="30"
            />
          </div>

          <div className="form-group">
            <label>Subtext</label>
            <input
              type="text"
              name="subtext"
              value={formData.subtext}
              onChange={handleInputChange}
              placeholder="Short description"
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label>CTA Button Text</label>
            <input
              type="text"
              name="ctaText"
              value={formData.ctaText}
              onChange={handleInputChange}
              placeholder="e.g., SHOP NOW"
              maxLength="20"
            />
          </div>
        </div>

        {/* Images */}
        <div className="form-section">
          <h2>HERO IMAGES</h2>

          {/* Left Image */}
          <div className="image-field">
            <label>Left Hero Image</label>
            <div
              className={`drag-drop-zone ${dragActive.leftImage ? 'active' : ''}`}
              onDragEnter={(e) => handleDrag(e, 'leftImage')}
              onDragLeave={(e) => handleDrag(e, 'leftImage')}
              onDragOver={(e) => handleDrag(e, 'leftImage')}
              onDrop={(e) => handleDrop(e, 'leftImage')}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload('leftImage', e.target.files[0])}
                style={{ display: 'none' }}
                id="left-image-input"
              />
              <label htmlFor="left-image-input" className="browse-btn">
                UPLOAD IMAGE
              </label>
            </div>
            {formData.leftImage && (
              <div className="image-preview">
                <img src={formData.leftImage} alt="Left Hero" />
                <button
                  type="button"
                  className="remove-img-btn"
                  onClick={() => removeImage('leftImage')}
                >
                  ✕ REMOVE
                </button>
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="image-field">
            <label>Right Hero Image</label>
            <div
              className={`drag-drop-zone ${dragActive.rightImage ? 'active' : ''}`}
              onDragEnter={(e) => handleDrag(e, 'rightImage')}
              onDragLeave={(e) => handleDrag(e, 'rightImage')}
              onDragOver={(e) => handleDrag(e, 'rightImage')}
              onDrop={(e) => handleDrop(e, 'rightImage')}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload('rightImage', e.target.files[0])}
                style={{ display: 'none' }}
                id="right-image-input"
              />
              <label htmlFor="right-image-input" className="browse-btn">
                UPLOAD IMAGE
              </label>
            </div>
            {formData.rightImage && (
              <div className="image-preview">
                <img src={formData.rightImage} alt="Right Hero" />
                <button
                  type="button"
                  className="remove-img-btn"
                  onClick={() => removeImage('rightImage')}
                >
                  ✕ REMOVE
                </button>
              </div>
            )}
          </div>

          {/* Mission Image */}
          <div className="image-field">
            <label>Mission Section Image</label>
            <div
              className={`drag-drop-zone ${dragActive.missionImage ? 'active' : ''}`}
              onDragEnter={(e) => handleDrag(e, 'missionImage')}
              onDragLeave={(e) => handleDrag(e, 'missionImage')}
              onDragOver={(e) => handleDrag(e, 'missionImage')}
              onDrop={(e) => handleDrop(e, 'missionImage')}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload('missionImage', e.target.files[0])}
                style={{ display: 'none' }}
                id="mission-image-input"
              />
              <label htmlFor="mission-image-input" className="browse-btn">
                UPLOAD IMAGE
              </label>
            </div>
            {formData.missionImage && (
              <div className="image-preview">
                <img src={formData.missionImage} alt="Mission" />
                <button
                  type="button"
                  className="remove-img-btn"
                  onClick={() => removeImage('missionImage')}
                >
                  ✕ REMOVE
                </button>
              </div>
            )}
          </div>

          {/* Vision Image */}
          <div className="image-field">
            <label>Vision Section Image</label>
            <div
              className={`drag-drop-zone ${dragActive.visionImage ? 'active' : ''}`}
              onDragEnter={(e) => handleDrag(e, 'visionImage')}
              onDragLeave={(e) => handleDrag(e, 'visionImage')}
              onDragOver={(e) => handleDrag(e, 'visionImage')}
              onDrop={(e) => handleDrop(e, 'visionImage')}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload('visionImage', e.target.files[0])}
                style={{ display: 'none' }}
                id="vision-image-input"
              />
              <label htmlFor="vision-image-input" className="browse-btn">
                UPLOAD IMAGE
              </label>
            </div>
            {formData.visionImage && (
              <div className="image-preview">
                <img src={formData.visionImage} alt="Vision" />
                <button
                  type="button"
                  className="remove-img-btn"
                  onClick={() => removeImage('visionImage')}
                >
                  ✕ REMOVE
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="preview-section">
          <h2>PREVIEW</h2>
          <div className="preview-hero">
            <div className="preview-headline">
              <div className="preview-line">{formData.headline1}</div>
              <div className="preview-line">{formData.headline2}</div>
              <div className="preview-line">{formData.headline3}</div>
            </div>
            <p className="preview-subtext">{formData.subtext}</p>
            <button className="preview-cta">{formData.ctaText}</button>
          </div>
        </div>

        {/* Submit */}
        <div className="form-actions">
          <button type="submit" className="save-btn">
            SAVE CHANGES
          </button>
        </div>
      </form>
    </div>
  );
};
