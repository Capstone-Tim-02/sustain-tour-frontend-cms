import clsx from 'clsx';

import { FieldWrapper } from '../FieldWrapper';

export const TextareaField = ({
  rows = 4,
  label,
  id,
  placeholder,
  isHorizontal,
  isHorizontalStart,
  className,
  isRequired,
  error,
  registration,
  ...props
}) => {
  return (
    <FieldWrapper
      isHorizontal={isHorizontal}
      isHorizontalStart={isHorizontalStart}
      label={label}
      id={id}
      error={error}
      isRequired={isRequired}
    >
      <textarea
        rows={rows}
        className={clsx(
          error && 'focus:!border-error-500 focus:!ring-error-500',
          'mt-1.5 w-full rounded-lg border border-gray-300 py-2.5 placeholder-gray-400 shadow-sm placeholder:text-sm placeholder:font-normal focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:mt-0 sm:text-sm',
          className
        )}
        id={id}
        placeholder={placeholder}
        {...registration}
        {...props}
      />
    </FieldWrapper>
  );
};