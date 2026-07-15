import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-card rounded-[28px] shadow-[var(--shadow-clay)] p-6 transition-all duration-300 hover:shadow-[var(--shadow-clay-hover)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
