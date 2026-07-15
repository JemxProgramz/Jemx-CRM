import React, { useState, useEffect } from 'react';
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
import { ChevronDown, ChevronUp, MoreHorizontal, Search } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
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
  const { customers: data, globalSearchQuery, setGlobalSearchQuery } = useAppStore();
  const [sorting, setSorting] = useState<SortingState>([]);

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
      globalFilter: globalSearchQuery,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalSearchQuery,
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
        <Button onClick={handleAddCustomer}>Add Customer</Button>
      </div>

      <Card className="flex flex-col p-0 overflow-hidden">
        <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <Input 
              placeholder="Search customers..." 
              value={globalSearchQuery ?? ''}
              onChange={e => setGlobalSearchQuery(e.target.value)}
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
    </div>
  );
}
