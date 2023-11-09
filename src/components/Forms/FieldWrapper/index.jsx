import clsx from 'clsx';

export const FieldWrapper = ({
  isHorizontal,
  label,
  id,
  className,
  error,
  children,
  isRequired,
}) => {
  if (isHorizontal) {
    return (
      <div className="space-y-6 sm:space-y-5">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-gray-200 sm:pt-5 lg:grid-cols-5">
          {label && (
            <label
              className={clsx(
                'text-sm font-medium text-gray-600 sm:grid sm:items-center sm:justify-items-start',
                error && '-mt-6',
                className
              )}
              htmlFor={id}
            >
              <span
                className={clsx(
                  isRequired && 'after:ml-0.5 after:text-error-500 after:content-["*"]'
                )}
              >
                {label}
              </span>
            </label>
          )}

          <div className="mt-1 sm:col-span-2 sm:mt-0 lg:col-span-4">
            <div className="relative">{children}</div>
            {error?.message && (
              <div role="alert" aria-label={error.message} className="mt-1 text-sm text-error-500">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className={clsx('block text-sm font-medium text-gray-600', className)} htmlFor={id}>
        <span
          className={clsx(isRequired && 'after:ml-0.5 after:text-error-500 after:content-["*"]')}
        >
          {label}
        </span>
        <div className="relative mt-2">{children}</div>
      </label>

      {error?.message && (
        <div role="alert" aria-label={error.message} className="mt-1 text-sm text-error-500">
          {error.message}
        </div>
      )}
    </div>
  );
};
