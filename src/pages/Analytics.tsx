import React, { useMemo, useState } from 'react';
import { DollarSign, Users, Activity, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, LineChart, Line, ComposedChart } from 'recharts';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { KPICard } from '../components/dashboard/KPICard';
import { Skeleton } from '../components/ui/Skeleton';
import { useCustomers, useOrders, useDashboardData } from '../hooks/useData';
import { useToastStore } from '../store/useToastStore';
import { Download } from 'lucide-react';

export function Analytics() {
  const { revenueData, isLoading: dashboardLoading } = useDashboardData();
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: customers, isLoading: customersLoading } = useCustomers();

  const isLoading = dashboardLoading || ordersLoading || customersLoading;

  const [randomSalt] = useState(() => Math.random());
  
  // Generate some mock data for different charts based on revenueData
  const conversionData = useMemo(() => revenueData.map((d, i) => {
    // deterministic pseudo-random using index and salt
    const pseudoRand = (i * randomSalt) % 1;
    return {
      name: d.name,
      visitors: d.total * 1.5 + Math.floor(pseudoRand * 2000),
      conversions: d.total * 0.1 + Math.floor(pseudoRand * 200),
      rate: Math.floor(pseudoRand * 5) + 2
    };
  }), [revenueData, randomSalt]);

  const userGrowthData = useMemo(() => revenueData.map((d, i) => {
    const pseudoRand = (i * randomSalt * 1.5) % 1;
    return {
      name: d.name,
      active: d.total * 0.8 + Math.floor(pseudoRand * 500),
      new: d.total * 0.2 + Math.floor(pseudoRand * 200),
      churned: d.total * 0.05 + Math.floor(pseudoRand * 50)
    };
  }), [revenueData, randomSalt]);

  const { addToast } = useToastStore();

  const handleExportAnalytics = () => {
    addToast({
      type: 'success',
      message: 'Analytics data exported successfully.'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Analytics</h1>
          <p className="text-text-muted">Deep dive into your business metrics.</p>
        </div>
        <Button variant="secondary" className="gap-2" onClick={handleExportAnalytics}>
          <Download className="w-4 h-4" /> Export Analytics
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-[28px]" />
          ))
        ) : (
          <>
            <KPICard title="Total Revenue" value={`$${orders.reduce((acc, order) => acc + order.amount, 44000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} percentage={24.5} trend="up" icon={DollarSign} />
            <KPICard title="Active Users" value={customers.length.toString()} percentage={12.3} trend="up" icon={Users} />
            <KPICard title="Conversion Rate" value="4.8%" percentage={1.2} trend="up" icon={BarChart2} />
            <KPICard title="Bounce Rate" value="32.1%" percentage={-3.4} trend="down" icon={Activity} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col h-[400px]">
          <div className="mb-6">
            <h3 className="font-semibold text-lg">Traffic vs Conversions</h3>
            <p className="text-sm text-text-muted">Monthly website performance</p>
          </div>
          <div className="h-64 w-full">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <ComposedChart data={conversionData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} dy={10} tickMargin={10} minTickGap={30} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} tickMargin={10} tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} tickMargin={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '16px', border: 'none', boxShadow: 'var(--shadow-clay)' }}
                    itemStyle={{ color: 'var(--text)' }}
                  />
                  <Bar yAxisId="left" dataKey="visitors" fill="#6366F1" radius={[4, 4, 0, 0]} opacity={0.3} />
                  <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="flex flex-col h-[400px]">
          <div className="mb-6">
            <h3 className="font-semibold text-lg">User Growth</h3>
            <p className="text-sm text-text-muted">New vs Active vs Churned users</p>
          </div>
          <div className="h-64 w-full">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <AreaChart data={userGrowthData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} dy={10} tickMargin={10} minTickGap={30} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} tickMargin={10} tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '16px', border: 'none', boxShadow: 'var(--shadow-clay)' }}
                    itemStyle={{ color: 'var(--text)' }}
                  />
                  <Area type="monotone" dataKey="active" stroke="#14B8A6" strokeWidth={2} fillOpacity={1} fill="url(#colorActive)" />
                  <Area type="monotone" dataKey="new" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorNew)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>
      
      <Card className="flex flex-col h-[400px]">
        <div className="mb-6">
          <h3 className="font-semibold text-lg">Revenue Trends</h3>
          <p className="text-sm text-text-muted">Detailed revenue breakdown</p>
        </div>
        <div className="h-64 w-full">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <LineChart data={revenueData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} dy={10} tickMargin={10} minTickGap={30} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} tickMargin={10} tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '16px', border: 'none', boxShadow: 'var(--shadow-clay)' }}
                  itemStyle={{ color: 'var(--text)' }}
                />
                <Line type="monotone" dataKey="total" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'var(--card)' }} activeDot={{ r: 6, strokeWidth: 0, fill: '#6366F1' }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
