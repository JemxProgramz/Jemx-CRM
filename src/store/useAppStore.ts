import { create } from 'zustand';
import { User, Customer, Order, Activity } from '../types';
import { mockCustomers, mockOrders, mockActivities, revenueData, salesData } from '../data/mock';

interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  
  // Data
  customers: Customer[];
  orders: Order[];
  activities: Activity[];
  revenueData: any[];
  salesData: any[];
  
  // Actions
  addCustomer: (customer: Customer) => void;
  addOrder: (order: Order) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  setTheme: (theme) => {
    set({ theme });
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  user: { id: '1', name: 'Alex Doe', email: 'alex@jemxcrm.com', role: 'Admin' }, // Pre-logged in for demo
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  updateUser: (data) => set((state) => ({ user: state.user ? { ...state.user, ...data } : null })),
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  
  globalSearchQuery: '',
  setGlobalSearchQuery: (globalSearchQuery) => set({ globalSearchQuery }),
  
  // Initial Data
  customers: mockCustomers,
  orders: mockOrders,
  activities: mockActivities,
  revenueData: revenueData,
  salesData: salesData,
  
  addCustomer: (customer) => set((state) => ({ 
    customers: [customer, ...state.customers],
    activities: [{ id: `act-${Date.now()}`, title: `New customer ${customer.name} added`, timestamp: 'Just now', type: 'user' }, ...state.activities]
  })),
  addOrder: (order) => set((state) => ({ 
    orders: [order, ...state.orders],
    activities: [{ id: `act-${Date.now()}`, title: `New order from ${order.customerName}`, timestamp: 'Just now', type: 'order' }, ...state.activities]
  })),
}));
