import { create } from 'zustand';
import { User, Customer, Order, Activity, AppNotification } from '../types';
import { mockCustomers, mockOrders, mockActivities, revenueData, salesData } from '../data/mock';

const mockNotifications: AppNotification[] = [
  { id: 'notif-1', title: 'New order received', message: 'Order #ORD-8921 was just placed.', time: '5m ago', isRead: false, type: 'success' },
  { id: 'notif-2', title: 'Server update', message: 'System maintenance scheduled for tonight.', time: '2h ago', isRead: false, type: 'info' },
  { id: 'notif-3', title: 'Payment failed', message: 'Failed to process payment for #ORD-8919.', time: '1d ago', isRead: true, type: 'error' },
];

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
  notifications: AppNotification[];
  
  // Actions
  addCustomer: (customer: Customer) => void;
  addOrder: (order: Order) => void;
  deleteOrder: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearAllNotifications: () => void;
  addNotification: (notification: AppNotification) => void;
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
  notifications: mockNotifications,
  
  addCustomer: (customer) => set((state) => ({ 
    customers: [customer, ...state.customers],
    activities: [{ id: `act-${Date.now()}`, title: `New customer ${customer.name} added`, timestamp: 'Just now', type: 'user' }, ...state.activities]
  })),
  addOrder: (order) => set((state) => ({ 
    orders: [order, ...state.orders],
    activities: [{ id: `act-${Date.now()}`, title: `New order from ${order.customerName}`, timestamp: 'Just now', type: 'order' }, ...state.activities]
  })),
  deleteOrder: (id) => set((state) => ({
    orders: state.orders.filter(order => order.id !== id),
    activities: [{ id: `act-${Date.now()}`, title: `Order ${id} deleted`, timestamp: 'Just now', type: 'system' }, ...state.activities]
  })),
  markAllNotificationsAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, isRead: true }))
  })),
  clearAllNotifications: () => set({ notifications: [] }),
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications]
  })),
}));
