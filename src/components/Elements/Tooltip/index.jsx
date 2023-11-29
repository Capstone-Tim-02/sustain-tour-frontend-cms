export const Tooltip = ({ message, children }) => {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-7 scale-0 rounded bg-gray-800 p-2 text-xs text-white transition-all group-hover:scale-100">
        {message}
      </span>
    </div>
  );
};
