import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { Customer, Order, Activity } from '../types';

export function useCustomers() {
  const [data, setData] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const result = await api.getCustomers();
      setData(result);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addCustomer = async (customer: Customer) => {
    try {
      await api.addCustomer(customer);
      await api.addActivity({ id: `act-${Date.now()}`, title: `New customer ${customer.name} added`, timestamp: 'Just now', type: 'user' });
      await fetchData();
      return true;
    } catch {
      return false;
    }
  };

  const updateCustomer = async (id: string, updates: Partial<Customer>) => {
    try {
      await api.updateCustomer(id, updates);
      await api.addActivity({ id: `act-${Date.now()}`, title: `Customer ${updates.name || id} updated`, timestamp: 'Just now', type: 'user' });
      await fetchData();
      return true;
    } catch {
      return false;
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      await api.deleteCustomer(id);
      await api.addActivity({ id: `act-${Date.now()}`, title: `Customer ${id} deleted`, timestamp: 'Just now', type: 'system' });
      await fetchData();
      return true;
    } catch {
      return false;
    }
  };

  return { data, isLoading, isError, addCustomer, updateCustomer, deleteCustomer, refetch: fetchData };
}

export function useOrders() {
  const [data, setData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const result = await api.getOrders();
      setData(result);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addOrder = async (order: Order) => {
    try {
      await api.addOrder(order);
      await api.addActivity({ id: `act-${Date.now()}`, title: `New order from ${order.customerName}`, timestamp: 'Just now', type: 'order' });
      await fetchData();
      return true;
    } catch {
      return false;
    }
  };

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    try {
      await api.updateOrder(id, updates);
      await api.addActivity({ id: `act-${Date.now()}`, title: `Order ${id} updated`, timestamp: 'Just now', type: 'order' });
      await fetchData();
      return true;
    } catch {
      return false;
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await api.deleteOrder(id);
      await api.addActivity({ id: `act-${Date.now()}`, title: `Order ${id} deleted`, timestamp: 'Just now', type: 'system' });
      await fetchData();
      return true;
    } catch {
      return false;
    }
  };

  return { data, isLoading, isError, addOrder, updateOrder, deleteOrder, refetch: fetchData };
}

export function useActivities() {
  const [data, setData] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const result = await api.getActivities();
      setData(result);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, isError, refetch: fetchData };
}

export function useDashboardData() {
  const [revenueData, setRevenueData] = useState<Array<{name: string; total: number}>>([]);
  const [salesData, setSalesData] = useState<Array<{name: string; value: number}>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const [revResult, salesResult] = await Promise.all([
        api.getRevenueData(),
        api.getSalesData()
      ]);
      setRevenueData(revResult);
      setSalesData(salesResult);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { revenueData, salesData, isLoading, isError, refetch: fetchData };
}
