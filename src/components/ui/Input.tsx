import React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-[16px] bg-background/50 border border-black/5 dark:border-white/5 px-4 py-2 text-sm text-text shadow-[var(--shadow-clay-active)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-text-muted",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
