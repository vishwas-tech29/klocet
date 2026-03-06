import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursor) {
        cursor.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (cursorDot) {
        cursorDot.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('clickable') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Only show on desktop
  if (window.innerWidth < 768) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isPointer ? 'pointer' : ''}`}
      />
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot"
      />
    </>
  );
};
