import { Controller } from 'react-hook-form';
import Select from 'react-select';

import { FieldWrapper } from '../FieldWrapper';

export const ReactSelect = ({
  name,
  control,
  label,
  id,
  options,
  placeholder,
  isHorizontal,
  error,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FieldWrapper isHorizontal={isHorizontal} label={label} id={id} error={error}>
          <Select
            {...field}
            inputId={id}
            className="react-select-container"
            classNamePrefix="react-select"
            options={options}
            placeholder={placeholder}
            {...props}
          />
        </FieldWrapper>
      )}
    />
  );
};
