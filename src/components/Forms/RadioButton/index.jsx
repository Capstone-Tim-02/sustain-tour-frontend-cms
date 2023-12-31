export const RadioButton = ({ label, id, value, registration }) => {
  return (
    <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
      <div className="flex items-center">
        <input
          id={id}
          type="radio"
          className="text-primary-600 focus:ring-primary-500 h-4 w-4 border-gray-300"
          value={value}
          {...registration}
        />
        <label htmlFor={id} className="ml-3 block text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
    </div>
  );
};
