import React, { useState, useRef, useEffect } from 'react';
import { Bell, Sun, Moon, Menu, ShoppingCart, Users, Activity } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import logoUrl from '../../assets/logo.jpg';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const { theme, setTheme, user, toggleSidebar, globalSearchQuery, setGlobalSearchQuery, activities, clearActivities } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-24 w-full flex items-center justify-between px-4 md:px-8 shrink-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-card p-1.5 rounded-full shadow-[var(--shadow-clay-sm)]">
          <button 
            className={`p-2.5 rounded-full transition-all ${theme === 'light' ? 'bg-background shadow-[var(--shadow-clay-active)] text-primary' : 'text-text-muted hover:text-text'}`}
            onClick={() => setTheme('light')}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button 
            className={`p-2.5 rounded-full transition-all ${theme === 'dark' ? 'bg-background shadow-[var(--shadow-clay-active)] text-primary' : 'text-text-muted hover:text-text'}`}
            onClick={() => setTheme('dark')}
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>
        
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-3.5 bg-card rounded-full shadow-[var(--shadow-clay-sm)] text-text-muted hover:text-text transition-all"
          >
            <Bell className="w-5 h-5" />
            {activities.length > 0 && (
              <span className="absolute top-3 right-3 w-2 h-2 bg-danger rounded-full border-2 border-card"></span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-80 bg-card rounded-2xl shadow-[var(--shadow-clay)] overflow-hidden z-50 border border-black/5 dark:border-white/5"
              >
                <div className="p-4 border-b border-black/5 dark:border-white/5">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {activities.length > 0 ? (
                    <div className="flex flex-col">
                      {activities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="p-4 border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer flex gap-3 items-start">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            activity.type === 'order' ? 'bg-primary/10 text-primary' :
                            activity.type === 'user' ? 'bg-secondary/10 text-secondary' :
                            activity.type === 'system' ? 'bg-warning/10 text-warning' :
                            'bg-accent/10 text-accent'
                          }`}>
                            {activity.type === 'order' && <ShoppingCart className="w-4 h-4" />}
                            {activity.type === 'user' && <Users className="w-4 h-4" />}
                            {activity.type === 'system' && <Activity className="w-4 h-4" />}
                            {activity.type === 'meeting' && <Users className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text">{activity.title}</p>
                            <p className="text-xs text-text-muted mt-1">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-text-muted">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                      <p>No new notifications</p>
                    </div>
                  )}
                </div>
                {activities.length > 0 && (
                  <div className="p-3 bg-black/5 dark:bg-white/5 text-center">
                    <button 
                      onClick={() => {
                        clearActivities();
                        setShowNotifications(false);
                      }}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center gap-3 bg-card py-1.5 px-1.5 pr-4 rounded-[100px] shadow-[var(--shadow-clay-sm)] cursor-pointer hover:shadow-[var(--shadow-clay-hover)] transition-all">
          <div className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center text-white font-medium shadow-inner overflow-hidden border border-black/5 dark:border-white/5">
            <img src={logoUrl} alt="Avatar" className="w-full h-full object-contain" />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-text-muted">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
