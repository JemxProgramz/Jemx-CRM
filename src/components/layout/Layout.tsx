import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useAppStore } from '../../store/useAppStore';
import { ToastContainer } from '../ui/Toast';

export function Layout({ children }: { children: React.ReactNode }) {
  const setSidebarOpen = useAppStore(state => state.setSidebarOpen);
  const randomizeData = useAppStore(state => state.randomizeData);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    
    const interval = setInterval(() => {
      randomizeData();
    }, 10000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [setSidebarOpen, randomizeData]);

  return (
    <div className="flex h-[100dvh] w-full relative z-0">
      <ToastContainer />
      <div className="blob-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Navbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-24">
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
