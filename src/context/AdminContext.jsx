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

const DEFAULT_SECTIONS = {
  men: [
    { id: 'men-1', title: 'New Arrivals', description: 'Latest men collection', order: 1, active: true },
    { id: 'men-2', title: 'Best Sellers', description: 'Most popular items', order: 2, active: true },
    { id: 'men-3', title: 'On Sale', description: 'Discounted products', order: 3, active: true }
  ],
  women: [
    { id: 'women-1', title: 'New Arrivals', description: 'Latest women collection', order: 1, active: true },
    { id: 'women-2', title: 'Best Sellers', description: 'Most popular items', order: 2, active: true },
    { id: 'women-3', title: 'On Sale', description: 'Discounted products', order: 3, active: true }
  ]
};

export const AdminProvider = ({ children }) => {
  const [adminAuth, setAdminAuth] = useState(false);
  const [heroContent, setHeroContent] = useState(DEFAULT_HERO);
  const [sections, setSections] = useState(DEFAULT_SECTIONS);

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

    const savedSections = localStorage.getItem('nevermind_sections');
    if (savedSections) {
      try {
        setSections(JSON.parse(savedSections));
      } catch (e) {
        console.error('Error loading sections:', e);
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

  const addSection = (category, section) => {
    const newSection = {
      id: Date.now().toString(),
      ...section,
      active: true
    };
    const updatedSections = {
      ...sections,
      [category]: [...sections[category], newSection]
    };
    setSections(updatedSections);
    localStorage.setItem('nevermind_sections', JSON.stringify(updatedSections));
    return newSection;
  };

  const updateSection = (category, sectionId, data) => {
    const updatedSections = {
      ...sections,
      [category]: sections[category].map(s =>
        s.id === sectionId ? { ...s, ...data } : s
      )
    };
    setSections(updatedSections);
    localStorage.setItem('nevermind_sections', JSON.stringify(updatedSections));
  };

  const deleteSection = (category, sectionId) => {
    const updatedSections = {
      ...sections,
      [category]: sections[category].filter(s => s.id !== sectionId)
    };
    setSections(updatedSections);
    localStorage.setItem('nevermind_sections', JSON.stringify(updatedSections));
  };

  const reorderSections = (category, newOrder) => {
    const updatedSections = {
      ...sections,
      [category]: newOrder
    };
    setSections(updatedSections);
    localStorage.setItem('nevermind_sections', JSON.stringify(updatedSections));
  };

  const getSectionsByCategory = (category) => {
    return sections[category] || [];
  };

  return (
    <AdminContext.Provider value={{
      adminAuth,
      login,
      logout,
      heroContent,
      updateHero,
      sections,
      addSection,
      updateSection,
      deleteSection,
      reorderSections,
      getSectionsByCategory
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
