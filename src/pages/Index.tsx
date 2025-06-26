
import { useState } from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { LoginPage } from '@/components/LoginPage';
import { Dashboard } from '@/components/Dashboard';
import { MembersPage } from '@/components/MembersPage';
import { AttendancePage } from '@/components/AttendancePage';
import { ReportsPage } from '@/components/ReportsPage';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage('dashboard');
  };

  switch (currentPage) {
    case 'members':
      return <MembersPage onBack={handleBack} />;
    case 'attendance':
      return <AttendancePage onBack={handleBack} />;
    case 'reports':
      return <ReportsPage onBack={handleBack} />;
    default:
      return <Dashboard onNavigate={handleNavigate} />;
  }
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
