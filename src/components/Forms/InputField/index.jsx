import clsx from 'clsx';

import { FieldWrapper } from '../FieldWrapper';

const types = {
  file: 'cursor-pointer py-0 file:rounded-l-lg file:border file:border-solid file:border-gray-200 file:py-2.5 file:text-sm file:focus:border-primary-100',
};

export const InputField = ({
  type = 'text',
  label,
  id,
  placeholder,
  isHorizontal,
  className,
  startIcon,
  endIcon,
  autoComplete,
  isRequired,
  error,
  isDisabled,
  registration,
  ...props
}) => {
  return (
    <FieldWrapper
      isHorizontal={isHorizontal}
      isRequired={isRequired}
      label={label}
      id={id}
      error={error}
    >
      {startIcon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-1 md:pt-0">
          {startIcon}
        </div>
      )}
      <input
        type={type}
        className={clsx(
          error && 'focus:!border-error-500 focus:!ring-error-500',
          'mt-1.5 w-full rounded-lg border border-gray-300 placeholder-gray-400 shadow-sm placeholder:text-sm focus:border-primary-100 focus:outline-none focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:mt-0 sm:text-sm',
          type !== 'file' && 'py-2.5',
          startIcon && 'pl-11',
          endIcon && 'pr-9',
          types[type],
          className
        )}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={isDisabled}
        {...registration}
        {...props}
      />
      {endIcon && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {endIcon}
        </div>
      )}
    </FieldWrapper>
  );
};