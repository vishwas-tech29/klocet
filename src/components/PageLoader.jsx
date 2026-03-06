import React, { useState, useEffect } from 'react';
import './PageLoader.css';

export const PageLoader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className={`page-loader ${!loading ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          <h1 className="loader-text">KLOCET</h1>
          <div className="loader-tagline">DESIGNED TO DISRUPT</div>
        </div>
        
        <div className="loader-bar-container">
          <div 
            className="loader-bar" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        <div className="loader-percentage">{Math.floor(Math.min(progress, 100))}%</div>
      </div>
    </div>
  );
};
