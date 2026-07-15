export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  country: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Inactive' | 'Lead';
  joinDate: string;
  avatar?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Processing' | 'Cancelled';
  paymentMethod: string;
}

export interface Activity {
  id: string;
  title: string;
  timestamp: string;
  type: 'order' | 'user' | 'system' | 'meeting';
}

export interface KPI {
  label: string;
  value: string;
  percentage: number;
  isPositive: boolean;
  data: number[];
}
