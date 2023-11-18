import clsx from 'clsx';
import { AlertCircleIcon } from 'lucide-react';

import { FieldWrapper } from '../FieldWrapper';

export const TextAreaField = ({
    label,
    rows=4,
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
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-1.5 sm:pt-0">
                    {startIcon}
                </div>
            )}

        <textarea
            rows={rows}
            className={clsx(
            error && 'focus:!border-0 focus:bg-white focus:!ring-redDestimate-100',
            'bg-white border-dashboardDestimate-300 mt-1.5 w-full rounded-lg border placeholder-gray-400 shadow-sm placeholder:text-sm focus:border-primary-100 focus:outline-none focus:ring-primary-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:mt-0 sm:text-sm',
            'py-2.5',
            startIcon && 'pl-11',
            endIcon && 'pr-9',
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

        {error?.message && (
            <AlertCircleIcon className="pointer-events-none absolute right-3 top-[18px] h-5 w-5 text-redDestimate-100 sm:top-2.5" />
        )}
        </FieldWrapper>
    )
}