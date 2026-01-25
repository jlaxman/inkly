'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  return (
    <motion.div
      className={cn('font-bold tracking-tight', sizeClasses[size], className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="relative inline-block">
        {/* Ink drop effect on "nkl" */}
        <span className="relative">
          <motion.span
            className="absolute -left-1 top-0 h-full w-full bg-gradient-to-b from-blue-600 to-blue-400 opacity-20 blur-sm"
            initial={{ scale: 0, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
          />
          <span className="relative">In</span>
          <motion.span
            className="relative inline-block gradient-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            k
          </motion.span>
          <motion.span
            className="relative inline-block gradient-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            l
          </motion.span>
        </span>
        {/* Relaxed "y" */}
        <motion.span
          className="relative inline-block ml-0.5"
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.6, duration: 0.5, type: 'spring', stiffness: 200 }}
          style={{ transformOrigin: 'bottom right' }}
        >
          y
        </motion.span>
      </span>
    </motion.div>
  );
}
