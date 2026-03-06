import React, { useState, useEffect } from 'react';
import './BootScreen.css';

export const BootScreen = ({ onComplete }) => {
  const [stage, setStage] = useState('boot'); // boot, logo, ready
  const [bootLines, setBootLines] = useState([]);
  const [logoProgress, setLogoProgress] = useState(0);

  const bootSequence = [
    'INITIALIZING SYSTEM...',
    'LOADING CORE MODULES... OK',
    'CHECKING INVENTORY DATABASE... OK',
    'CONNECTING TO PAYMENT GATEWAY... OK',
    'LOADING PRODUCT CATALOG... OK',
    'INITIALIZING PLAYER PROFILE... OK',
    'MOUNTING GAME WORLD... OK',
    'SYSTEM READY',
    '',
    'WELCOME TO THE ARENA'
  ];

  useEffect(() => {
    let lineIndex = 0;
    const bootInterval = setInterval(() => {
      if (lineIndex < bootSequence.length) {
        setBootLines(prev => [...prev, bootSequence[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => setStage('logo'), 500);
      }
    }, 200);

    return () => clearInterval(bootInterval);
  }, []);

  useEffect(() => {
    if (stage === 'logo') {
      const logoInterval = setInterval(() => {
        setLogoProgress(prev => {
          if (prev >= 100) {
            clearInterval(logoInterval);
            setTimeout(() => setStage('ready'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      return () => clearInterval(logoInterval);
    }
  }, [stage]);

  const handleStart = () => {
    onComplete();
  };

  if (stage === 'boot') {
    return (
      <div className="boot-screen">
        <div className="boot-terminal">
          <div className="terminal-header">
            <span className="terminal-title">SYSTEM BOOT v2.0.1</span>
            <span className="terminal-cursor">_</span>
          </div>
          <div className="terminal-content">
            {bootLines.map((line, index) => (
              <div key={index} className="terminal-line">
                <span className="terminal-prompt">&gt;</span> {line}
              </div>
            ))}
            <div className="terminal-line terminal-cursor-line">
              <span className="terminal-prompt">&gt;</span>
              <span className="blinking-cursor">_</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'logo') {
    return (
      <div className="boot-screen logo-stage">
        <div className="logo-container">
          <div className="logo-assembly">
            <h1 className="brand-logo glitch" data-text="NEVERMIND">
              NEVERMIND
            </h1>
            <div className="logo-subtitle">DESIGNED TO DISRUPT</div>
          </div>
          
          <div className="logo-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${logoProgress}%` }}
              />
            </div>
            <div className="progress-text">{Math.floor(logoProgress)}%</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="boot-screen ready-stage">
      <div className="ready-container">
        <div className="ready-content">
          <h1 className="ready-title neon-text">SYSTEM ONLINE</h1>
          <p className="ready-subtitle">PREPARE FOR DEPLOYMENT</p>
          
          <button className="start-button game-button" onClick={handleStart}>
            <span className="button-icon">▶</span>
            PRESS START
          </button>
          
          <div className="ready-hint">
            <span className="hint-text">TIP: Try the Konami Code for a surprise</span>
          </div>
        </div>
        
        <div className="particle-field">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="field-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
