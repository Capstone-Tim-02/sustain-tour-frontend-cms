import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Spinner } from '@/components/Elements';

const variants = {
  primary: 'bg-primary-80 text-white',
  danger: 'bg-error-600 text-white',
  inverse: 'bg-white text-gray-900',
  warning: 'bg-warning-500 text-white',
  gray: 'bg-gray-700 text-white',
  outline: 'bg-white text-primary-60 !border-primary-60',
};

const sizes = {
  xs: 'px-2 py-2 text-sm',
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
};

export const Button = ({
  type = 'button',
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  href,
  startIcon,
  endIcon,
  isDisabled,
  ...props
}) => {
  if (href) {
    return (
      <Link
        to={href}
        className={clsx(
          'flex items-center justify-center rounded-md border border-gray-300 font-medium shadow-sm hover:opacity-80 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-60',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="!text-current" />}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={clsx(
        'flex items-center justify-center rounded-md border border-gray-300 font-medium shadow-sm focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-60 enabled:hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading || isDisabled}
      {...props}
    >
      {isLoading && <Spinner size="sm" className="!text-current" />}
      {!isLoading && startIcon}
      <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
    </button>
  );
};
