import clsx from 'clsx';

export const FieldWrapper = ({ isHorizontal, label, id, className, error, children }) => {
  if (isHorizontal) {
    return (
      <div className="space-y-6 sm:space-y-5">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-gray-200 sm:pt-5 lg:grid-cols-5">
          {label && (
            <label
              className={clsx(
                'text-sm font-medium text-dashboardDestimate-400 sm:grid sm:items-center sm:justify-items-start',
                error && '-mt-6',
                className
              )}
              htmlFor={id}
            >
              {label}
            </label>
          )}

          <div className="mt-1 sm:col-span-2 sm:mt-0 lg:col-span-4">
            <div className="relative !text-blackDestimate-100">{children}</div>
            {error?.message && (
              <div
                role="alert"
                aria-label={error.message}
                className="mt-1 text-xs text-redDestimate-100"
              >
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
      <label
        className={clsx('block text-sm font-medium text-dashboardDestimate-400', className)}
        htmlFor={id}
      >
        {label}
        <div className="relative !text-blackDestimate-100">{children}</div>
      </label>

      {error?.message && (
        <div role="alert" aria-label={error.message} className="mt-1 text-xs text-redDestimate-100">
          {error.message}
        </div>
      )}
    </div>
  );
};
