import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, MoreHorizontal, Search, Download, Pencil, Trash2, Eye, ShoppingCart, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Skeleton';
import { Order } from '../types';
import { useOrders } from '../hooks/useData';
import { useToastStore } from '../store/useToastStore';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<Order>();

const OrderActions = ({ 
  order, 
  onUpdate, 
  onDelete 
}: { 
  order: Order;
  onUpdate: (id: string, updates: Partial<Order>) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToastStore();
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData(e.currentTarget);
    const success = await onUpdate(order.id, {
      customerName: formData.get('customerName') as string,
      amount: Number(formData.get('amount')),
      status: formData.get('status') as 'Completed' | 'Pending' | 'Processing' | 'Cancelled',
      paymentMethod: formData.get('paymentMethod') as string
    });
    setIsUpdating(false);
    if (success) {
      addToast({ type: 'success', message: `Order ${order.id} was updated successfully.` });
      setIsEditOpen(false);
    } else {
      addToast({ type: 'error', message: `Failed to update order ${order.id}.` });
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const success = await onDelete(order.id);
    setIsDeleting(false);
    if (success) {
      addToast({ type: 'success', message: `Order ${order.id} was deleted.` });
    } else {
      addToast({ type: 'error', message: `Failed to delete order ${order.id}.` });
    }
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-text-muted hover:text-text"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, transformOrigin: "top right" }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 top-10 w-48 bg-card rounded-xl shadow-[var(--shadow-clay-hover)] border border-black/5 dark:border-white/5 z-50 overflow-hidden"
            >
              <div className="py-1">
                <button 
                  className="w-full text-left px-4 py-3 min-h-[44px] text-sm text-text hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2"
                  onClick={() => {
                    setIsOpen(false);
                    setIsViewOpen(true);
                  }}
                >
                  <Eye className="w-4 h-4 text-secondary" /> View Details
                </button>
                <button 
                  className="w-full text-left px-4 py-3 min-h-[44px] text-sm text-text hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2"
                  onClick={() => {
                    setIsOpen(false);
                    setIsEditOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4 text-primary" /> Edit
                </button>
                <button 
                  className="w-full text-left px-4 py-3 min-h-[44px] text-sm text-danger hover:bg-danger/10 flex items-center gap-2 transition-colors disabled:opacity-50"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4" /> {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title={`Order Details: ${order.id}`}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-sm text-text-muted">Customer Name</span>
              <p className="font-medium">{order.customerName}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-text-muted">Amount</span>
              <p className="font-medium">${order.amount.toFixed(2)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-text-muted">Date</span>
              <p className="font-medium">{format(new Date(order.date), 'MMM d, yyyy')}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-text-muted">Payment Method</span>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
            <div className="space-y-1">
              <span className="text-sm text-text-muted">Status</span>
              <p className="font-medium">
                <span className={`px-2 py-1 rounded-full text-xs font-medium shadow-[var(--shadow-clay-sm)] ${
                  order.status === 'Completed' ? 'bg-success/10 text-success' :
                  order.status === 'Pending' ? 'bg-warning/10 text-warning' :
                  order.status === 'Processing' ? 'bg-primary/10 text-primary' :
                  'bg-danger/10 text-danger'
                }`}>
                  {order.status}
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button variant="secondary" onClick={() => setIsViewOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Order">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Customer Name</label>
            <Input name="customerName" defaultValue={order.customerName} required placeholder="John Doe" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Amount ($)</label>
            <Input name="amount" type="number" step="0.01" defaultValue={order.amount} required placeholder="99.99" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Payment Method</label>
            <select name="paymentMethod" defaultValue={order.paymentMethod} className="flex min-h-[44px] w-full rounded-[14px] border border-black/10 dark:border-white/10 bg-background px-3 py-2 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner" required>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Stripe">Stripe</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Status</label>
            <select name="status" defaultValue={order.status} className="flex min-h-[44px] w-full rounded-[14px] border border-black/10 dark:border-white/10 bg-background px-3 py-2 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner" required>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isUpdating}>{isUpdating ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export function Orders() {
  const { data, isLoading, isError, addOrder, updateOrder, deleteOrder, refetch } = useOrders();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [localSearch, setLocalSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToast } = useToastStore();

  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: 'Order ID',
      cell: info => <span className="font-mono font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('customerName', {
      header: 'Customer',
      cell: info => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: info => <span className="font-medium">${info.getValue().toFixed(2)}</span>,
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: info => <span className="text-text-muted">{format(new Date(info.getValue()), 'MMM d, yyyy')}</span>,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        const styles = {
          Completed: 'bg-success/10 text-success',
          Pending: 'bg-warning/10 text-warning',
          Processing: 'bg-primary/10 text-primary',
          Cancelled: 'bg-danger/10 text-danger',
        };
        return (
          <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-[var(--shadow-clay-sm)] ${styles[status]}`}>
            {status}
          </span>
        );
      },
    }),
    columnHelper.accessor('paymentMethod', {
      header: 'Payment',
      cell: info => <span className="text-text-muted">{info.getValue()}</span>,
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <OrderActions 
          order={info.row.original} 
          onUpdate={updateOrder} 
          onDelete={deleteOrder} 
        />
      ),
    }),
  ], [updateOrder, deleteOrder]);

  const handleAddOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAdding(true);
    const formData = new FormData(e.currentTarget);
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerId: `cust-${Date.now()}`,
      customerName: formData.get('customerName') as string,
      amount: Number(formData.get('amount')),
      date: new Date().toISOString(),
      status: formData.get('status') as 'Completed' | 'Pending' | 'Processing' | 'Cancelled',
      paymentMethod: formData.get('paymentMethod') as string
    };
    
    const success = await addOrder(newOrder);
    setIsAdding(false);
    if (success) {
      addToast({
        type: 'success',
        message: `Order ${newOrder.id} was added successfully.`
      });
      setIsAddModalOpen(false);
    } else {
      addToast({
        type: 'error',
        message: `Failed to add order.`
      });
    }
  };

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Customer', 'Amount', 'Date', 'Status', 'Payment'];
    const csvData = data.map(order => [
      order.id,
      order.customerName,
      order.amount,
      format(new Date(order.date), 'yyyy-MM-dd'),
      order.status,
      order.paymentMethod
    ].join(','));
    
    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'orders.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    addToast({
      type: 'success',
      message: 'Orders exported to CSV successfully.'
    });
  };

  
  const table = useReactTable<Order>({
    data,
    columns,
    state: {
      sorting,
      globalFilter: localSearch,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setLocalSearch,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-text-muted text-center max-w-md">We couldn't load the orders at this time. Please try again.</p>
        <Button onClick={refetch} className="gap-2">
          <RefreshCw className="w-4 h-4" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Orders</h1>
          <p className="text-text-muted">Track and manage recent transactions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2" onClick={handleExportCSV}>
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>Add Order</Button>
        </div>
      </div>

      <Card className="flex flex-col p-0 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <Input 
              placeholder="Search orders..." 
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-6 space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl" />
            ))}
          </div>
        ) : table.getRowModel().rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-xl font-semibold">No orders found</h3>
            <p className="text-text-muted text-center max-w-sm">
              {localSearch ? `No orders matched "${localSearch}".` : 'You haven\'t received any orders yet.'}
            </p>
            {!localSearch && (
              <Button onClick={() => setIsAddModalOpen(true)}>Create your first order</Button>
            )}
          </div>
        ) : (
          <div className="w-full">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto w-full pb-4">
              <div className="inline-block min-w-full align-middle">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id} className="border-b border-black/5 dark:border-white/5">
                        {headerGroup.headers.map((header, index) => (
                          <th 
                            key={header.id} 
                            className={`py-4 px-2 font-semibold text-text-muted cursor-pointer hover:text-text transition-colors ${index === 0 ? 'pl-6 sticky left-0 bg-card z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]' : ''} ${index === headerGroup.headers.length - 1 ? 'pr-6' : ''}`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                          <div className="flex items-center gap-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <ChevronUp className="w-4 h-4" />,
                              desc: <ChevronDown className="w-4 h-4" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr 
                      key={row.id} 
                      className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <td key={cell.id} className={`py-4 px-2 ${index === 0 ? 'pl-6 sticky left-0 bg-card group-hover:bg-black/5 dark:group-hover:bg-white/5 z-10 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)] transition-colors' : ''} ${index === row.getVisibleCells().length - 1 ? 'pr-6' : ''}`}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
            
            {/* Mobile Stacked Cards View */}
            <div className="md:hidden flex flex-col p-4 space-y-4">
              {table.getRowModel().rows.map(row => (
                <div key={row.id} className="bg-black/5 dark:bg-white/5 rounded-2xl p-4 flex flex-col gap-3 relative">
                  <div className="absolute top-4 right-4">
                    {(() => {
                      const actionsCell = row.getVisibleCells().find(c => c.column.id === 'actions');
                      return actionsCell ? flexRender(actionsCell.column.columnDef.cell, actionsCell.getContext()) : null;
                    })()}
                  </div>
                  
                  <div className="pr-10 mb-1">
                    <p className="font-semibold text-lg">{row.original.customerName}</p>
                    <p className="font-mono text-sm text-text-muted">{row.original.id}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mt-2">
                    <div>
                      <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Amount</p>
                      <p className="font-semibold text-lg">${row.original.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Date</p>
                      <p className="font-medium">{format(new Date(row.original.date), 'MMM d, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Payment</p>
                      <p className="font-medium text-text-muted">{row.original.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Status</p>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium shadow-[var(--shadow-clay-sm)] inline-block ${
                        row.original.status === 'Completed' ? 'bg-success/10 text-success' :
                        row.original.status === 'Pending' ? 'bg-warning/10 text-warning' :
                        row.original.status === 'Processing' ? 'bg-primary/10 text-primary' :
                        'bg-danger/10 text-danger'
                      }`}>
                        {row.original.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 border-t border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
          <div className="text-sm text-text-muted">
            Showing {table.getRowModel().rows.length} of {data.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Order">
        <form onSubmit={handleAddOrder} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Customer Name</label>
            <Input name="customerName" required placeholder="John Doe" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Amount ($)</label>
            <Input name="amount" type="number" step="0.01" required placeholder="99.99" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Payment Method</label>
            <select name="paymentMethod" className="flex min-h-[44px] w-full rounded-[14px] border border-black/10 dark:border-white/10 bg-background px-3 py-2 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner" required>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Stripe">Stripe</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Status</label>
            <select name="status" className="flex min-h-[44px] w-full rounded-[14px] border border-black/10 dark:border-white/10 bg-background px-3 py-2 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner" required>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isAdding}>{isAdding ? 'Adding...' : 'Add Order'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
