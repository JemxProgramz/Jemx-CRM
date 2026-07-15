import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Layout } from '../layout/Layout';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore(state => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
}
