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
import { ChevronDown, ChevronUp, MoreHorizontal, Search, Download } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Order } from '../types';
import { useAppStore } from '../store/useAppStore';
import { useToastStore } from '../store/useToastStore';
import { format } from 'date-fns';

import { Trash2 } from 'lucide-react';

const columnHelper = createColumnHelper<Order>();
const columns = [
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
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-danger hover:text-white hover:bg-danger"
        onClick={() => {
          useAppStore.getState().deleteOrder(info.row.original.id);
          useToastStore.getState().addToast({
            type: 'success',
            message: `Order ${info.row.original.id} was deleted.`
          });
        }}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    ),
  }),
];

export function Orders() {
  const { orders: data } = useAppStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [localSearch, setLocalSearch] = useState('');

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
    
    useToastStore.getState().addToast({
      type: 'success',
      message: 'Orders exported to CSV successfully.'
    });
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
          <h1 className="text-3xl font-bold tracking-tight mb-1">Orders</h1>
          <p className="text-text-muted">Track and manage recent transactions.</p>
        </div>
        <Button variant="secondary" className="gap-2" onClick={handleExportCSV}>
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <Card className="flex flex-col p-0 overflow-hidden">
        <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <Input 
              placeholder="Search orders..." 
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
    </div>
  );
}
