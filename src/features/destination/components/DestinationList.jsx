import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import { fetchGetUsers, selectUsers, toggleFetchLatestUsers } from '@/stores/features/UsersSlice';

// import { columns } from './DestinationColumn';

export const DestinationList = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <div className="justify-between md:flex">
        {/* Search */}
        <div className="sm:flex sm:gap-x-2">
          <InputSearchField
            type="text"
            id="search"
            autoComplete="off"
            placeholder="Cari"
            startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>

        {/* Add Destination Button */}
        <div className="mr-6">
          <Button variant="default" size="default">
            Tambah Destinasi +
          </Button>
        </div>
      </div>
    </>
  );
};
