'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
// import Footer from '../components/Footer'; // Decided to skip the footer for a full-height admin view

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [userName, setUserName] = useState('Admin User'); // Placeholder
  const [loading, setLoading] = useState(true);

  // ⚠️ IMPORTANT: Implement Auth/Role Check Here
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // In a real application, you would also need to validate the token on the server 
    // to check the user's 'role' and redirect if they are not an 'admin'.
    if (!token) {
      router.replace('/auth/login');
      return;
    }

    // Example: Decode token to get user name (Requires a utility function in real app)
    // const userData = decodeToken(token);
    // setUserName(userData.name || 'Admin'); 

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Clear any other auth data (like cookies if used)
    router.replace('/auth/login');
  };

  if (loading) {
    // Basic loading state while checking auth
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-medium text-blue-600">Loading Dashboard...</div>
      </div>
    );
  }

  // Main Dashboard Structure
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar - Fixed width, sticky top */}
      <Sidebar />

      {/* Main Content Area - Flex grow, scrollable */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        
        {/* Header */}
        <Header userName={userName} onLogout={handleLogout} />

        {/* Page Content - Padding applied here */}
        <main className="p-6 flex-1">
          {children}
        </main>
        
        {/* Footer (Optional) 
        <Footer /> */}
      </div>
    </div>
  );
};

export default DashboardLayout;
