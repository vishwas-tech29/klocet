import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './ScrollReveal.css';

export const ScrollReveal = ({ 
  children, 
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  once = true 
}) => {
  const [ref, isVisible] = useScrollAnimation({ once, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${animation} ${isVisible ? 'visible' : ''}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};
