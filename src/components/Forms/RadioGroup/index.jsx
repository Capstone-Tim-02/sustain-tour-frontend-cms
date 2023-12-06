import { FieldWrapper } from '../FieldWrapper';

export const RadioGroup = ({ label, isHorizontal, isRequired, children, error }) => {
  return (
    <FieldWrapper isHorizontal={isHorizontal} isRequired={isRequired} label={label} error={error}>
      <div className="flex space-x-4">{children}</div>
    </FieldWrapper>
  );
};

