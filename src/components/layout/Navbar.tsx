import React from 'react';
import { Search, Bell, Sun, Moon, Menu } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import logoUrl from '../../assets/logo.jpg';

export function Navbar() {
  const { theme, setTheme, user, toggleSidebar, globalSearchQuery, setGlobalSearchQuery } = useAppStore();

  return (
    <header className="h-24 w-full flex items-center justify-between px-4 md:px-8 shrink-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
          <Menu className="w-5 h-5" />
        </Button>
        <div className="max-w-md w-full relative hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <Input 
            placeholder="Search everything..." 
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="pl-12 bg-card border-none shadow-[var(--shadow-clay-sm)] h-14" 
          />
        </div>
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
        
        <button className="relative p-3.5 bg-card rounded-full shadow-[var(--shadow-clay-sm)] text-text-muted hover:text-text transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-danger rounded-full border-2 border-card"></span>
        </button>
        
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
