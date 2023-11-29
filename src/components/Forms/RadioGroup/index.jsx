
import { FieldWrapper } from '../FieldWrapper';

export const RadioGroup = ({ label, isVertical, isRequired, children, error }) => {
  return (
    <FieldWrapper
      isVertical={isVertical}
      isRequired={isRequired}
      label={label}
      error={error}
    >
      <div className="flex space-x-4">{children}</div>
    </FieldWrapper>);
};

