import React, { useState, useRef, useEffect } from 'react';
import { Bell, Sun, Moon, Menu, CheckCircle2, AlertCircle, Info, CheckCheck, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import logoUrl from '../../assets/logo.jpg';
import { cn } from '../../lib/utils';

export function Navbar() {
  const { theme, setTheme, user, toggleSidebar, notifications, markAllNotificationsAsRead, clearAllNotifications } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-danger" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

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
            className={cn("relative p-3.5 rounded-full shadow-[var(--shadow-clay-sm)] transition-all", showNotifications ? "bg-background shadow-[var(--shadow-clay-active)] text-primary" : "bg-card text-text-muted hover:text-text")}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center bg-danger text-white text-[10px] font-bold rounded-full border-2 border-card">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-80 bg-card rounded-[24px] shadow-[var(--shadow-clay)] border border-black/5 dark:border-white/5 overflow-hidden z-50 flex flex-col"
              >
                <div className="p-4 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                
                <div className="max-h-[320px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-text-muted">
                      <Bell className="w-8 h-8 mx-auto mb-3 opacity-20" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={cn("p-4 border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer flex gap-3", !notification.isRead && "bg-primary/5 dark:bg-primary/5")}
                        >
                          <div className="mt-0.5 shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div>
                            <div className="flex justify-between items-start mb-1 gap-2">
                              <h4 className={cn("text-sm font-semibold line-clamp-1", !notification.isRead ? "text-text" : "text-text-muted")}>{notification.title}</h4>
                              <span className="text-[10px] text-text-muted whitespace-nowrap">{notification.time}</span>
                            </div>
                            <p className="text-xs text-text-muted line-clamp-2">{notification.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-3 bg-black/5 dark:bg-white/5 border-t border-black/5 dark:border-white/5 flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex-1 text-xs h-8 gap-1.5"
                      onClick={markAllNotificationsAsRead}
                    >
                      <CheckCheck className="w-3.5 h-3.5" /> Read All
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1 text-xs h-8 gap-1.5 text-danger hover:text-danger hover:bg-danger/10"
                      onClick={clearAllNotifications}
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center gap-3 bg-card py-1.5 px-1.5 pr-4 rounded-[100px] shadow-[var(--shadow-clay-sm)] cursor-pointer hover:shadow-[var(--shadow-clay-hover)] transition-all">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-white font-medium shadow-inner overflow-hidden border border-black/5 dark:border-white/5">
            <img src={logoUrl} alt="Avatar" className="w-full h-full object-cover" />
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
