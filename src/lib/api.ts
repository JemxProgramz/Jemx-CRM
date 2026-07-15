import { Customer, Order, Activity } from '../types';
import { mockCustomers, mockOrders, mockActivities, revenueData, salesData } from '../data/mock';

// In-memory state for mutations to persist during the session
let customers = [...mockCustomers];
let orders = [...mockOrders];
let activities = [...mockActivities];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const simulateNetwork = async () => {
  await delay(600);
  if (Math.random() < 0.05) {
    throw new Error('Network error simulated. Please try again.');
  }
};

export const api = {
  // Customers
  getCustomers: async (): Promise<Customer[]> => {
    await simulateNetwork();
    return [...customers];
  },
  
  addCustomer: async (customer: Customer): Promise<Customer> => {
    await simulateNetwork();
    customers = [customer, ...customers];
    return customer;
  },
  
  updateCustomer: async (id: string, updates: Partial<Customer>): Promise<Customer> => {
    await simulateNetwork();
    const index = customers.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Customer not found');
    customers[index] = { ...customers[index], ...updates };
    return customers[index];
  },
  
  deleteCustomer: async (id: string): Promise<void> => {
    await simulateNetwork();
    customers = customers.filter(c => c.id !== id);
  },

  // Orders
  getOrders: async (): Promise<Order[]> => {
    await simulateNetwork();
    return [...orders];
  },
  
  addOrder: async (order: Order): Promise<Order> => {
    await simulateNetwork();
    orders = [order, ...orders];
    return order;
  },
  
  updateOrder: async (id: string, updates: Partial<Order>): Promise<Order> => {
    await simulateNetwork();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Order not found');
    orders[index] = { ...orders[index], ...updates };
    return orders[index];
  },
  
  deleteOrder: async (id: string): Promise<void> => {
    await simulateNetwork();
    orders = orders.filter(o => o.id !== id);
  },

  // Activities
  getActivities: async (): Promise<Activity[]> => {
    await simulateNetwork();
    return [...activities];
  },
  
  addActivity: async (activity: Activity): Promise<Activity> => {
    await simulateNetwork();
    activities = [activity, ...activities];
    return activity;
  },

  // Dashboards / Analytics data
  getRevenueData: async () => {
    await simulateNetwork();
    return [...revenueData];
  },

  getSalesData: async () => {
    await simulateNetwork();
    return [...salesData];
  }
};
