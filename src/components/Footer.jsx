import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">NEVERMIND</h3>
          <p className="footer-text">Dark streetwear for the discerning mind.</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">LINKS</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalog">Catalog</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">SOCIAL</h4>
          <ul className="footer-links">
            <li><a href="#instagram">Instagram</a></li>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#discord">Discord</a></li>
            <li><a href="#tiktok">TikTok</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">CONTACT</h4>
          <p className="footer-text">
            hello@nevermind.com<br />
            +1 (555) 123-4567
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; NEVERMIND 2024. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};
