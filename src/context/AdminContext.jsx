import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();

const DEFAULT_HERO = {
  headline1: 'DESIGNED',
  headline2: 'TO',
  headline3: 'DISRUPT',
  subtext: 'Limited releases. Exclusive drops. Elegance is now live.',
  ctaText: 'SHOP NOW',
  leftImage: '',
  rightImage: '',
  missionImage: '',
  visionImage: ''
};

export const AdminProvider = ({ children }) => {
  const [adminAuth, setAdminAuth] = useState(false);
  const [heroContent, setHeroContent] = useState(DEFAULT_HERO);

  // Load from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('nevermind_admin_auth');
    if (savedAuth === 'true') {
      setAdminAuth(true);
    }

    const savedHero = localStorage.getItem('nevermind_hero');
    if (savedHero) {
      try {
        setHeroContent(JSON.parse(savedHero));
      } catch (e) {
        console.error('Error loading hero:', e);
      }
    }
  }, []);

  const login = (password) => {
    const ADMIN_PASSWORD = 'admin123';
    if (password === ADMIN_PASSWORD) {
      setAdminAuth(true);
      localStorage.setItem('nevermind_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdminAuth(false);
    localStorage.removeItem('nevermind_admin_auth');
  };

  const updateHero = (data) => {
    const updated = { ...heroContent, ...data };
    setHeroContent(updated);
    localStorage.setItem('nevermind_hero', JSON.stringify(updated));
  };

  return (
    <AdminContext.Provider value={{
      adminAuth,
      login,
      logout,
      heroContent,
      updateHero
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
