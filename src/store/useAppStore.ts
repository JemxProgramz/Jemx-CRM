import { create } from 'zustand';
import { User, Customer, Order, Activity } from '../types';
import { mockCustomers, mockOrders, mockActivities, revenueData, salesData } from '../data/mock';

interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  isAuthenticated: boolean;
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
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, data: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  clearActivities: () => void;
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
  isAuthenticated: false,
  user: null, // Start logged out
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
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
  updateCustomer: (id, data) => set((state) => ({
    customers: state.customers.map(c => c.id === id ? { ...c, ...data } : c),
    activities: [{ id: `act-${Date.now()}`, title: `Customer ${data.name || id} updated`, timestamp: 'Just now', type: 'user' }, ...state.activities]
  })),
  deleteCustomer: (id) => set((state) => {
    const customer = state.customers.find(c => c.id === id);
    return {
      customers: state.customers.filter(c => c.id !== id),
      activities: [{ id: `act-${Date.now()}`, title: `Customer ${customer?.name || id} deleted`, timestamp: 'Just now', type: 'system' }, ...state.activities]
    };
  }),
  addOrder: (order) => set((state) => ({ 
    orders: [order, ...state.orders],
    activities: [{ id: `act-${Date.now()}`, title: `New order from ${order.customerName}`, timestamp: 'Just now', type: 'order' }, ...state.activities]
  })),
  updateOrder: (id, data) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { ...o, ...data } : o),
    activities: [{ id: `act-${Date.now()}`, title: `Order ${id} updated`, timestamp: 'Just now', type: 'order' }, ...state.activities]
  })),
  deleteOrder: (id) => set((state) => ({
    orders: state.orders.filter(o => o.id !== id),
    activities: [{ id: `act-${Date.now()}`, title: `Order ${id} deleted`, timestamp: 'Just now', type: 'system' }, ...state.activities]
  })),
  clearActivities: () => set({ activities: [] }),
}));
