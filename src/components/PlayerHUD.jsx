import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './PlayerHUD.css';

export const PlayerHUD = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();
  const [playerData, setPlayerData] = useState({
    name: 'PLAYER_001',
    level: 1,
    xp: 0,
    maxXp: 100
  });

  useEffect(() => {
    // Load player data from localStorage
    const saved = localStorage.getItem('player_data');
    if (saved) {
      setPlayerData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Calculate XP based on actions
    const calculateXP = () => {
      const baseXP = cartItems.length * 20; // 20 XP per item
      const totalXP = Math.min(baseXP, playerData.maxXp);
      
      setPlayerData(prev => {
        const newData = { ...prev, xp: totalXP };
        
        // Level up logic
        if (totalXP >= prev.maxXp && prev.level < 10) {
          newData.level = prev.level + 1;
          newData.xp = 0;
          newData.maxXp = prev.maxXp + 50;
          
          // Show level up notification
          showLevelUpNotification(newData.level);
        }
        
        // Save to localStorage
        localStorage.setItem('player_data', JSON.stringify(newData));
        return newData;
      });
    };

    calculateXP();
  }, [cartItems]);

  const showLevelUpNotification = (level) => {
    // Create level up notification
    const notification = document.createElement('div');
    notification.className = 'level-up-notification';
    notification.innerHTML = `
      <div class="level-up-content">
        <div class="level-up-icon">⚡</div>
        <div class="level-up-text">LEVEL UP!</div>
        <div class="level-up-level">LEVEL ${level}</div>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const xpPercentage = (playerData.xp / playerData.maxXp) * 100;

  return (
    <div className="player-hud">
      <div className="hud-content">
        {/* Player Info */}
        <div className="hud-section player-info">
          <div className="player-avatar">
            <div className="avatar-icon">👤</div>
          </div>
          <div className="player-details">
            <div className="player-name">{playerData.name}</div>
            <div className="player-level">
              <span className="level-label">LVL</span>
              <span className="level-value">{playerData.level}</span>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="hud-section xp-section">
          <div className="xp-bar">
            <div 
              className="xp-bar-fill" 
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
          <div className="xp-text">
            {playerData.xp} / {playerData.maxXp} XP
          </div>
        </div>

        {/* Inventory */}
        <div 
          className="hud-section inventory-section clickable"
          onClick={() => navigate('/cart')}
        >
          <div className="inventory-icon">🛒</div>
          <div className="inventory-details">
            <div className="inventory-label">LOADOUT</div>
            <div className="inventory-count">{cartItems.length} ITEMS</div>
          </div>
        </div>

        {/* Currency */}
        <div className="hud-section currency-section">
          <div className="currency-icon">💰</div>
          <div className="currency-amount">₹{cartTotal.toFixed(0)}</div>
        </div>
      </div>
    </div>
  );
};
