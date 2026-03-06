import React, { useEffect, useRef } from 'react';
import './ParallaxImage.css';

export const ParallaxImage = ({ src, alt, speed = 0.5, className = '' }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        imageRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div className={`parallax-container ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="parallax-image"
      />
    </div>
  );
};
