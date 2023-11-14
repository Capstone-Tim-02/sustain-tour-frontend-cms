import clsx from 'clsx';

import { FieldWrapper } from '../FieldWrapper';

export const InputSearchField = ({
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
  isDisabled,
  ...props
}) => {
  return (
    <FieldWrapper isHorizontal={isHorizontal} isRequired={isRequired} label={label} id={id}>
      {startIcon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-1.5 sm:pt-0">
          {startIcon}
        </div>
      )}
      <input
        type={type}
        className={clsx(
          'mt-1.5 w-full rounded-lg border border-gray-300 placeholder-gray-400 shadow-sm placeholder:text-sm focus:border-primary-100 focus:outline-none focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:mt-0 sm:text-sm',
          type !== 'file' && 'py-2.5',
          startIcon && 'pl-11',
          endIcon && 'pr-9',
          className
        )}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={isDisabled}
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
