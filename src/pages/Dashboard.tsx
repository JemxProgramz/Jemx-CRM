import React, { useState, useEffect } from 'react';
import { DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { KPICard } from '../components/dashboard/KPICard';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { useAppStore } from '../store/useAppStore';

const COLORS = ['#6366F1', '#8B5CF6', '#14B8A6'];

export function Dashboard() {
  const { activities, revenueData, salesData, customers, orders } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
          <p className="text-text-muted">Welcome back, here's what's happening today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="flex flex-col gap-4">
              <div className="flex justify-between">
                <Skeleton className="w-12 h-12 rounded-2xl" />
                <Skeleton className="w-16 h-6 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-32 h-8" />
              </div>
            </Card>
          ))
        ) : (
          <>
            <KPICard title="Total Revenue" value={`$${orders.reduce((acc, order) => acc + order.amount, 44000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} percentage={20.1} trend="up" icon={DollarSign} />
            <KPICard title="Total Customers" value={customers.length.toString()} percentage={15.2} trend="up" icon={Users} />
            <KPICard title="Active Orders" value={orders.length.toString()} percentage={4.1} trend="up" icon={ShoppingCart} />
            <KPICard title="Growth Rate" value="12.5%" percentage={-2.4} trend="down" icon={Activity} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 flex flex-col h-[400px]">
          <div className="mb-6">
            <h3 className="font-semibold text-lg">Revenue Overview</h3>
            <p className="text-sm text-text-muted">Monthly revenue performance</p>
          </div>
          <div className="flex-1 w-full min-h-0">
            {isLoading ? (
              <Skeleton className="w-full h-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '16px', border: 'none', boxShadow: 'var(--shadow-clay)' }}
                    itemStyle={{ color: 'var(--text)' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="col-span-1 flex flex-col h-[400px]">
          <div className="mb-6">
            <h3 className="font-semibold text-lg">Sales by Plan</h3>
            <p className="text-sm text-text-muted">Distribution of active subscriptions</p>
          </div>
          <div className="flex-1 w-full min-h-0 relative flex items-center justify-center">
            {isLoading ? (
              <Skeleton className="w-48 h-48 rounded-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '16px', border: 'none', boxShadow: 'var(--shadow-clay)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="mb-6">
            <h3 className="font-semibold text-lg">Recent Activities</h3>
            <p className="text-sm text-text-muted">Latest actions across your team</p>
          </div>
          <div className="space-y-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="w-3/4 h-4" />
                    <Skeleton className="w-1/2 h-3" />
                  </div>
                </div>
              ))
            ) : (
              activities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-[var(--shadow-clay-sm)] ${
                    activity.type === 'order' ? 'bg-primary/10 text-primary' :
                    activity.type === 'user' ? 'bg-secondary/10 text-secondary' :
                    activity.type === 'system' ? 'bg-warning/10 text-warning' :
                    'bg-accent/10 text-accent'
                  }`}>
                    {activity.type === 'order' && <ShoppingCart className="w-5 h-5" />}
                    {activity.type === 'user' && <Users className="w-5 h-5" />}
                    {activity.type === 'system' && <Activity className="w-5 h-5" />}
                    {activity.type === 'meeting' && <Users className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-text">{activity.title}</p>
                    <p className="text-sm text-text-muted">{activity.timestamp}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <div className="mb-6">
            <h3 className="font-semibold text-lg">Monthly Performance</h3>
            <p className="text-sm text-text-muted">Comparing actual vs targets</p>
          </div>
          <div className="h-[300px] w-full">
            {isLoading ? (
              <Skeleton className="w-full h-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData.slice(0, 5)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '16px', border: 'none', boxShadow: 'var(--shadow-clay)' }}
                    cursor={{ fill: 'currentColor', opacity: 0.05 }}
                  />
                  <Bar dataKey="total" fill="#14B8A6" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
