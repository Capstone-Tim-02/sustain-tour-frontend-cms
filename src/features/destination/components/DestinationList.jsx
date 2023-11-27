import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import {
  fetchGetDestinations,
  selectDestinations,
  toggleFetchLatestDestinations,
} from '@/stores/features/DestinationSlice';

import { ButtonAddDestination } from './ButtonAddDestination';
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
      <div className="flex flex-col justify-between gap-3 sm:flex-row ">
        {/* Search */}
        <InputSearchField
          type="text"
          id="search"
          autoComplete="off"
          placeholder="Cari"
          startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        {/* Add Destination Button */}
        <Link to="/destinasi/tambah">
          <ButtonAddDestination />
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
