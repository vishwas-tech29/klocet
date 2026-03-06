import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryGrid.css';

export const CategoryGrid = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category.active) {
      // Navigate to filtered view or scroll to section
      const element = document.getElementById(category.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="category-grid-section">
      <div className="container">
        <h2 className="category-grid-title">SHOP BY CATEGORY</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card ${!category.active ? 'locked' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="category-image-wrapper">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className={`category-image ${!category.active ? 'blurred' : ''}`}
                />
                {!category.active && <div className="category-overlay"></div>}
              </div>

              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                
                {category.active ? (
                  <div className="category-status active-status">
                    <span className="status-dot"></span>
                    <span>Available Now</span>
                  </div>
                ) : (
                  <div className="category-status coming-soon">
                    <div className="coming-soon-badge">
                      <span className="glow-text">COMING SOON</span>
                    </div>
                    {category.countdown && (
                      <div className="countdown">{category.countdown}</div>
                    )}
                    <button className="notify-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                      NOTIFY ME
                    </button>
                  </div>
                )}
              </div>

              {!category.active && (
                <div className="lock-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
