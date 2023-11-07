import { Link } from 'react-router-dom';

export const Logo = ({ children, onClick }) => {
  return (
    <Link className="my-2 flex items-center" to="." onClick={onClick}>
      <div className="h-8 w-8 shrink-0 items-center justify-center">
        <img src="/logo-2.png" alt="Destimate Logo" className="rounded-lg" />
      </div>
      {children}
    </Link>
  );
};
