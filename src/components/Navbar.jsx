import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="marquee-wrapper">
          <div className="marquee-content">
            LIMITED RELEASES. EXCLUSIVE DROPS. ELEGANCE IS NOW LIVE.
          </div>
          <div className="marquee-content">
            LIMITED RELEASES. EXCLUSIVE DROPS. ELEGANCE IS NOW LIVE.
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
        <div className="nav-container">
          {/* Left: Nav Links */}
          <div className="nav-left">
            <Link to="/" className="nav-link">HOME</Link>
            <Link to="/men" className="nav-link">MEN</Link>
            <Link to="/women" className="nav-link">WOMEN</Link>
            <Link to="/catalog" className="nav-link">CATALOG</Link>
            <Link to="/about" className="nav-link">ABOUT</Link>
          </div>

          {/* Center: Logo */}
          <Link to="/" className="nav-logo">NEVERMIND</Link>

          {/* Right: Search & Cart */}
          <div className="nav-right">
            {searchOpen && (
              <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="search-input"
                />
              </form>
            )}
            <button 
              className="nav-icon-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              title="Search"
            >
              🔍
            </button>
            <Link to="/cart" className="nav-icon-btn cart-icon">
              🛍️
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              HOME
            </Link>
            <Link to="/men" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              MEN
            </Link>
            <Link to="/women" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              WOMEN
            </Link>
            <Link to="/catalog" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              CATALOG
            </Link>
            <Link to="/about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              ABOUT
            </Link>
            <Link to="/cart" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              CART ({cartCount})
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
