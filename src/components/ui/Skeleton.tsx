import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "rounded-2xl bg-black/5 dark:bg-white/10",
        className
      )}
      {...props}
    />
  );
}
