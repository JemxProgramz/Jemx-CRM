import React, { useState, useEffect, useRef } from 'react';
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
import { ChevronDown, ChevronUp, MoreHorizontal, Search, Pencil, Trash2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Customer } from '../types';
import { useAppStore } from '../store/useAppStore';
import { useToastStore } from '../store/useToastStore';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<Customer>();

const CustomerActions = ({ customer }: { customer: Customer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { deleteCustomer, updateCustomer } = useAppStore();
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

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateCustomer(customer.id, {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      country: formData.get('country') as string,
      plan: formData.get('plan') as 'Basic' | 'Pro' | 'Enterprise',
      status: formData.get('status') as 'Active' | 'Inactive' | 'Lead'
    });
    addToast({ type: 'success', message: `${customer.name} was updated successfully.` });
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-text-muted hover:text-text"
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
                  className="w-full text-left px-4 py-2 text-sm text-text hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2"
                  onClick={() => {
                    setIsOpen(false);
                    setIsEditOpen(true);
                  }}
                >
                  <Pencil className="w-4 h-4 text-primary" /> Edit
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-text hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2"
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = `mailto:${customer.email}`;
                  }}
                >
                  <Mail className="w-4 h-4 text-success" /> Email
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 flex items-center gap-2 transition-colors"
                  onClick={() => {
                    deleteCustomer(customer.id);
                    addToast({ type: 'success', message: `${customer.name} was deleted.` });
                  }}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Customer">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Name</label>
            <Input name="name" defaultValue={customer.name} required placeholder="John Doe" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <Input name="email" type="email" defaultValue={customer.email} required placeholder="john@example.com" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Company</label>
            <Input name="company" defaultValue={customer.company} required placeholder="Acme Corp" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Country</label>
            <Input name="country" defaultValue={customer.country} required placeholder="United States" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Plan</label>
              <select name="plan" defaultValue={customer.plan} className="flex h-10 w-full rounded-[14px] border border-black/10 dark:border-white/10 bg-background px-3 py-2 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner" required>
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Status</label>
              <select name="status" defaultValue={customer.status} className="flex h-10 w-full rounded-[14px] border border-black/10 dark:border-white/10 bg-background px-3 py-2 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner" required>
                <option value="Active">Active</option>
                <option value="Lead">Lead</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

const columns = [
  columnHelper.accessor('name', {
    header: 'Customer',
    cell: info => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center text-white font-medium shadow-[var(--shadow-clay-sm)]">
          {info.getValue().charAt(0)}
        </div>
        <div>
          <p className="font-medium">{info.getValue()}</p>
          <p className="text-sm text-text-muted">{info.row.original.email}</p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('company', {
    header: 'Company',
    cell: info => <span className="text-text-muted">{info.getValue()}</span>,
  }),
  columnHelper.accessor('plan', {
    header: 'Plan',
    cell: info => (
      <span className="px-3 py-1 bg-background rounded-full text-sm font-medium shadow-inner">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      const styles = {
        Active: 'bg-success/10 text-success',
        Inactive: 'bg-danger/10 text-danger',
        Lead: 'bg-warning/10 text-warning',
      };
      return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-[var(--shadow-clay-sm)] ${styles[status]}`}>
          {status}
        </span>
      );
    },
  }),
  columnHelper.accessor('joinDate', {
    header: 'Join Date',
    cell: info => <span className="text-text-muted">{format(new Date(info.getValue()), 'MMM d, yyyy')}</span>,
  }),
  columnHelper.display({
    id: 'actions',
    cell: (info) => <CustomerActions customer={info.row.original} />,
  }),
];

export function Customers() {
  const { customers: data } = useAppStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [localSearch, setLocalSearch] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      country: formData.get('country') as string,
      plan: formData.get('plan') as 'Basic' | 'Pro' | 'Enterprise',
      status: formData.get('status') as 'Active' | 'Inactive' | 'Lead',
      joinDate: new Date().toISOString()
    };
    useAppStore.getState().addCustomer(newCustomer);
    useToastStore.getState().addToast({
      type: 'success',
      message: `${newCustomer.name} was added successfully.`
    });
    setIsAddModalOpen(false);
  };

  const table = useReactTable({
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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Customers</h1>
          <p className="text-text-muted">Manage your customer relationships.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Customer</Button>
      </div>

      <Card className="flex flex-col p-0 overflow-hidden">
        <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <Input 
              placeholder="Search customers..." 
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="inline-block min-w-full align-middle">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className="border-b border-black/5 dark:border-white/5">
                    {headerGroup.headers.map((header, index) => (
                      <th 
                        key={header.id} 
                        className={`py-4 px-2 font-semibold text-text-muted cursor-pointer hover:text-text transition-colors ${index === 0 ? 'pl-6' : ''} ${index === headerGroup.headers.length - 1 ? 'pr-6' : ''}`}
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
                    <td key={cell.id} className={`py-4 px-2 ${index === 0 ? 'pl-6' : ''} ${index === row.getVisibleCells().length - 1 ? 'pr-6' : ''}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
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
      
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Customer">
        <form onSubmit={handleAddCustomer} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Name</label>
            <Input name="name" required placeholder="John Doe" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <Input name="email" type="email" required placeholder="john@example.com" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Company</label>
            <Input name="company" required placeholder="Acme Corp" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Country</label>
            <Input name="country" required placeholder="United States" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Plan</label>
              <select name="plan" className="flex h-10 w-full rounded-[14px] border border-black/10 dark:border-white/10 bg-background px-3 py-2 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner" required>
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Status</label>
              <select name="status" className="flex h-10 w-full rounded-[14px] border border-black/10 dark:border-white/10 bg-background px-3 py-2 text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-inner" required>
                <option value="Active">Active</option>
                <option value="Lead">Lead</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Customer</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
