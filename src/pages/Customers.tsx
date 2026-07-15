import React, { useState, useEffect } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, MoreHorizontal, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Skeleton } from '../components/ui/Skeleton';
import { Customer } from '../types';
import { useAppStore } from '../store/useAppStore';
import { useToastStore } from '../store/useToastStore';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<Customer>();

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
    cell: () => (
      <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text">
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    ),
  }),
];

export function Customers() {
  const data = useAppStore(state => state.customers);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddCustomer = () => {
    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      name: `New Customer ${data.length + 1}`,
      email: `customer${data.length + 1}@example.com`,
      company: 'Acme Corp',
      plan: 'Pro',
      status: 'Active',
      joinDate: new Date().toISOString()
    };
    useAppStore.getState().addCustomer(newCustomer);
    useToastStore.getState().addToast({
      type: 'success',
      message: `${newCustomer.name} was added successfully.`
    });
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Customers</h1>
          <p className="text-text-muted">Manage your customer relationships.</p>
        </div>
        <Button onClick={handleAddCustomer}>Add Customer</Button>
      </div>

      <Card className="flex flex-col p-0 overflow-hidden">
        <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <Input 
              placeholder="Search customers..." 
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>

        <div className="overflow-x-auto px-6">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-black/5 dark:border-white/5">
                  {headerGroup.headers.map(header => (
                    <th 
                      key={header.id} 
                      className="py-4 px-2 font-semibold text-text-muted cursor-pointer hover:text-text transition-colors"
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
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-black/5 dark:border-white/5 last:border-0">
                    <td className="py-4 px-2"><div className="flex items-center gap-3"><Skeleton className="w-10 h-10 rounded-full" /><div className="space-y-2"><Skeleton className="w-24 h-4" /><Skeleton className="w-32 h-3" /></div></div></td>
                    <td className="py-4 px-2"><Skeleton className="w-24 h-4" /></td>
                    <td className="py-4 px-2"><Skeleton className="w-16 h-6 rounded-full" /></td>
                    <td className="py-4 px-2"><Skeleton className="w-20 h-6 rounded-full" /></td>
                    <td className="py-4 px-2"><Skeleton className="w-24 h-4" /></td>
                    <td className="py-4 px-2"><Skeleton className="w-8 h-8 rounded-md" /></td>
                  </tr>
                ))
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr 
                    key={row.id} 
                    className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="py-4 px-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
          <div className="text-sm text-text-muted">
            Showing {isLoading ? 0 : table.getRowModel().rows.length} of {data.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => table.previousPage()}
              disabled={isLoading || !table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => table.nextPage()}
              disabled={isLoading || !table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
