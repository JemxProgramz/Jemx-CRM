import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, BarChart3, FileText, Settings, LogOut } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';
import logoUrl from '../../assets/logo.jpg';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, logout } = useAppStore();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-64 flex flex-col bg-card z-50 transition-transform duration-300 md:translate-x-0 shadow-[var(--shadow-clay)]",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-3 px-6 h-24 shrink-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-[var(--shadow-clay-sm)] overflow-hidden bg-white border border-black/5 dark:border-white/5">
            <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-xl tracking-tight">Jemx CRM</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                onClick={() => {
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group",
                  isActive 
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-[var(--shadow-clay-sm)]" 
                    : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text hover:shadow-[var(--shadow-clay-sm)]"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-text-muted group-hover:text-text")} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 shrink-0 border-t border-black/5 dark:border-white/5">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-text-muted hover:bg-danger/10 hover:text-danger hover:shadow-[var(--shadow-clay-sm)] transition-all group"
          >
            <LogOut className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110 group-hover:translate-x-1" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
