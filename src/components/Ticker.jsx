import React from 'react';
import './Ticker.css';

export const Ticker = () => {
  const text = '⊙ LIMITED EDITION  ⊙ NEW ARRIVAL  ⊙ LIMITED EDITION  ⊙ NEW ARRIVAL';

  return (
    <div className="ticker-container">
      <div className="ticker-text marquee">
        {text}
      </div>
      <div className="ticker-text marquee" style={{ animationDelay: '-15s' }}>
        {text}
      </div>
    </div>
  );
};
