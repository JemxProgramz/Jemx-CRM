import React from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-primary text-white hover:brightness-110 shadow-[var(--shadow-clay-sm)] active:shadow-[var(--shadow-clay-active)]",
      secondary: "bg-secondary text-white hover:brightness-110 shadow-[var(--shadow-clay-sm)] active:shadow-[var(--shadow-clay-active)]",
      danger: "bg-danger text-white hover:brightness-110 shadow-[var(--shadow-clay-sm)] active:shadow-[var(--shadow-clay-active)]",
      ghost: "bg-transparent text-text hover:bg-black/5 dark:hover:bg-white/10 shadow-none",
    };
    
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
      icon: "h-11 w-11 flex items-center justify-center p-0",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
