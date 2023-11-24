import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import { Button } from '@/components/ui/button';
import {
  fetchGetDestinations,
  selectDestinations,
  toggleFetchLatestDestinations,
} from '@/stores/features/DestinationSlice';

import { columns } from './DestinationColumn';

export const DestinationList = () => {
  const [searchText, setSearchText] = useState('');

  const destinations = useSelector(selectDestinations);
  const dispatch = useDispatch();

  useEffect(() => {
    if (destinations?.shouldFetchLatestDestinations) {
      dispatch(fetchGetDestinations());
      dispatch(toggleFetchLatestDestinations());
    }
    dispatch(fetchGetDestinations());
  }, [dispatch, destinations.shouldFetchLatestDestinations]);

  return (
    <>
      <div className="justify-between md:flex">
        {/* Search */}
        <div className="sm:flex sm:gap-x-2">
          <InputSearchField
            type="text"
            id="search"
            autoComplete="off"
            placeholder="Search"
            startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>

        {/* Add Destination Button */}
        <Link to={''}>
          <Button variant="default" size="default">
            Tambah Destinasi
            <span className="ml-1">
              <PlusIcon size={20} />
            </span>
          </Button>
        </Link>
      </div>

      {/* Table */}
      {destinations?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}

      {destinations?.status === 'succeeded' && (
        <DataTable
          columns={columns}
          data={destinations?.data}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      )}
    </>
  );
};
