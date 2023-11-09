import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

export const Breadcrumb = ({
  startingLocation = 'Dashboard',
  separator = <ChevronRightIcon className="h-4 w-4 text-gray-400" />,
  children,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <nav className="flex">
      <ol className="flex flex-wrap items-center space-x-2 md:space-x-3">
        <li>
          <div>
            <Link to="/" className="px-2 text-sm font-semibold text-primary-100">
              <span>{startingLocation}</span>
            </Link>
          </div>
        </li>

        {childrenArray.map((child, index) => {
          return (
            <li key={index}>
              <div className="flex items-center">
                <span className="shrink-0 text-gray-300">{separator}</span>
                <div className="ml-1 md:ml-2">{child}</div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
