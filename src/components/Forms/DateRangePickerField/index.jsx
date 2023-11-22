import { useEffect, useRef, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { CalendarIcon, XIcon } from 'lucide-react';

import { formatDate } from '@/utils/format';

export const DateRangePickerField = ({ placeholder, id, name, value, onChangeData, remove }) => {
  // open close
  const [open, setOpen] = useState(false);

  // get element target
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  // hide date range picker when click outside
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) setOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative flex items-center justify-center">
        <div className="relative w-full rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <CalendarIcon className="h-5 w-5 text-gray-800" />
          </div>
          <input
            value={
              value.length > 0 && value[0].startDate && value[0].endDate
                ? `${formatDate(value[0].startDate, 'DD MMM YYYY')} - ${formatDate(
                    value[0].endDate,
                    'DD MMM YYYY'
                  )}`
                : ''
            }
            readOnly
            id={id}
            name={name}
            onClick={() => setOpen((open) => !open)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-gray-300 px-2.5 py-2.5 pl-10 pr-8 text-sm placeholder-gray-400 shadow-sm focus:border-primary-80 focus:outline-none focus:ring-primary-80 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:mt-0 sm:text-sm"
          />
        </div>
        {value.length > 0 && value[0].startDate ? (
          <div className="mt-1">
            <button
              className="absolute bottom-0 right-0 top-0 transform px-2 text-gray-400"
              onClick={() => {
                remove();
              }}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        ) : (
          ''
        )}
      </div>

      <div ref={ref} className="absolute left-0 top-14 z-10 shadow-2xl shadow-gray-400">
        {open && (
          <DateRangePicker
            onChange={(item) => {
              onChangeData([item.selection]);
            }}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            rangeColors={['#2D68F8']}
            ranges={value}
            color="#2D68F8"
            direction="horizontal"
            preventSnapRefocus={true}
          />
        )}
      </div>
    </div>
  );
};
