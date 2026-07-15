import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Users, ShoppingCart, BarChart3, FileText, Settings, LogOut, ChevronLeft } from 'lucide-react';
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
          className="fixed inset-0 bg-black/20 dark:bg-white/10 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 88 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "h-[calc(100vh-2rem)] flex flex-col bg-card rounded-[28px] shadow-[var(--shadow-clay)] m-4 py-6 px-4 overflow-visible absolute md:relative z-50 transition-transform duration-300 md:!translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-[150%]"
        )}
      >
      <div className={cn("flex items-center mb-8 transition-all min-h-[48px]", sidebarOpen ? "px-2" : "justify-center px-0")}>
        <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl flex items-center justify-center shrink-0 shadow-[var(--shadow-clay-sm)] overflow-hidden bg-white border border-black/5 dark:border-white/5">
          <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.span 
              initial={{ opacity: 0, width: 0 }} 
              animate={{ opacity: 1, width: "auto" }} 
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="font-bold text-xl tracking-tight whitespace-nowrap overflow-hidden"
            >
              <span className="pl-3">Jemx CRM</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={() => {
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center rounded-[16px] transition-all whitespace-nowrap group",
                  sidebarOpen ? "px-4 py-3" : "justify-center w-12 h-12 mx-auto",
                  isActive 
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-[var(--shadow-clay-sm)]" 
                    : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text hover:shadow-[var(--shadow-clay-sm)]"
                )}
              >
                <motion.div
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="shrink-0"
                >
                  <item.icon className={cn("transition-transform group-hover:scale-110", sidebarOpen ? "w-5 h-5" : "w-6 h-6")} />
                </motion.div>
                <AnimatePresence initial={false}>
                  {sidebarOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      <span className="font-medium pl-4">{item.label}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-black/5 dark:border-white/5">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className={cn(
            "flex items-center rounded-[16px] text-text-muted hover:bg-danger/10 hover:text-danger hover:shadow-[var(--shadow-clay-sm)] transition-all whitespace-nowrap group",
            sidebarOpen ? "px-4 py-3" : "justify-center w-12 h-12 mx-auto"
          )}
        >
          <LogOut className={cn("shrink-0 transition-transform group-hover:scale-110 group-hover:translate-x-1", sidebarOpen ? "w-5 h-5" : "w-6 h-6")} />
          <AnimatePresence initial={false}>
            {sidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="font-medium pl-4">Logout</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-12 bg-card rounded-full p-1 shadow-[var(--shadow-clay-sm)] border border-black/5 dark:border-white/5 hidden md:flex"
        >
          <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }}>
            <ChevronLeft className="w-4 h-4 text-text-muted" />
          </motion.div>
        </button>
      </div>
    </motion.aside>
    </>
  );
}
