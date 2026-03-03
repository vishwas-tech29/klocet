import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export const ProtectedRoute = ({ children }) => {
  const { adminAuth } = useAdmin();

  if (!adminAuth) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};
