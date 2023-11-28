import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80',
        secondary: 'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80',
        destructive:
          'border-transparent bg-redDestimate-100 text-slate-50 hover:bg-redDestimate-100/80',
        outline: 'text-slate-950',
        success:
          'border-transparent bg-greenDestimate-100 text-white hover:bg-greenDestimate-100/80',
        pending: 'border-transparent bg-primary-40 text-white hover:bg-primary-40/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
