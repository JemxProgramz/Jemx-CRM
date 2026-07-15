import { Customer, Order, Activity } from '../types';

export const mockCustomers: Customer[] = [
  { id: '1', name: 'Olivia Martin', email: 'olivia.martin@email.com', company: 'TechCorp', country: 'USA', plan: 'Enterprise', status: 'Active', joinDate: '2023-01-15' },
  { id: '2', name: 'Jackson Lee', email: 'jackson.lee@email.com', company: 'Global IO', country: 'UK', plan: 'Pro', status: 'Active', joinDate: '2023-02-20' },
  { id: '3', name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', company: 'Startup Inc', country: 'Canada', plan: 'Basic', status: 'Lead', joinDate: '2023-03-10' },
  { id: '4', name: 'William Kim', email: 'will@kim.com', company: 'Design Co', country: 'Australia', plan: 'Pro', status: 'Inactive', joinDate: '2022-11-05' },
  { id: '5', name: 'Sophia Patel', email: 'sophia@patel.com', company: 'Cloud Solutions', country: 'India', plan: 'Enterprise', status: 'Active', joinDate: '2023-04-01' },
];

export const mockOrders: Order[] = [
  { id: 'ORD-001', customerId: '1', customerName: 'Olivia Martin', amount: 1500.00, date: '2023-05-15', status: 'Completed', paymentMethod: 'Credit Card' },
  { id: 'ORD-002', customerId: '2', customerName: 'Jackson Lee', amount: 250.00, date: '2023-05-16', status: 'Processing', paymentMethod: 'PayPal' },
  { id: 'ORD-003', customerId: '3', customerName: 'Isabella Nguyen', amount: 89.99, date: '2023-05-17', status: 'Pending', paymentMethod: 'Stripe' },
  { id: 'ORD-004', customerId: '4', customerName: 'William Kim', amount: 450.00, date: '2023-05-18', status: 'Cancelled', paymentMethod: 'Credit Card' },
  { id: 'ORD-005', customerId: '5', customerName: 'Sophia Patel', amount: 3200.00, date: '2023-05-19', status: 'Completed', paymentMethod: 'Bank Transfer' },
];

export const mockActivities: Activity[] = [
  { id: 'act1', title: 'New order from TechCorp', timestamp: '10 mins ago', type: 'order' },
  { id: 'act2', title: 'Jackson Lee joined Pro plan', timestamp: '2 hours ago', type: 'user' },
  { id: 'act3', title: 'System update completed', timestamp: '5 hours ago', type: 'system' },
  { id: 'act4', title: 'Meeting with Startup Inc', timestamp: 'Yesterday', type: 'meeting' },
];

export const revenueData = [
  { name: 'Jan', total: 1500 },
  { name: 'Feb', total: 2300 },
  { name: 'Mar', total: 3400 },
  { name: 'Apr', total: 2800 },
  { name: 'May', total: 4200 },
  { name: 'Jun', total: 5100 },
  { name: 'Jul', total: 4800 },
];

export const salesData = [
  { name: 'Pro', value: 400 },
  { name: 'Enterprise', value: 300 },
  { name: 'Basic', value: 300 },
];
