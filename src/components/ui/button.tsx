'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background shadow-sm hover:shadow-md active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-600/25 hover:shadow-green-600/40',
        destructive:
          'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 hover:shadow-red-500/40',
        outline:
          'border-2 border-green-500/60 bg-transparent text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-600 dark:text-green-400 dark:hover:bg-green-950/30 dark:hover:text-green-300',
        secondary:
          'bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800 shadow-lg shadow-slate-600/25',
        ghost: 'bg-transparent hover:bg-green-50 hover:text-green-700 text-slate-600 dark:text-slate-300 dark:hover:bg-green-950/20 dark:hover:text-green-400',
        link: 'underline-offset-4 hover:underline text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 bg-transparent shadow-none',
        success: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40',
        warning: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40',
      },
      size: {
        default: 'h-11 py-3 px-6',
        sm: 'h-9 px-4 rounded-lg text-xs',
        lg: 'h-13 px-8 rounded-xl text-base',
        icon: 'h-10 w-10 rounded-xl',
        xs: 'h-8 px-3 rounded-lg text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Memuat...
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };