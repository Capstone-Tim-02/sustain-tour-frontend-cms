import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import {
  fetchgetAllDestination,
  selectDestination,
  toggleFetchLatestAllDestination,
} from '@/stores/features';
import { selectReactTable, setQueryPageIndex, setQuerySearchGlobal } from '@/stores/ui-slice';
import { convertNumberToThousand } from '@/utils/format';

import { columns } from './DestinationColumn';

export const DestinationList = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTextFilter = useDebounce(searchText, 600);

  const destinationsSelector = useSelector(selectDestination);
  const { searchGlobal, pageIndex, pageSize } = useSelector(selectReactTable);

  const dispatch = useDispatch();

  const DESTINATIONS_DATA = destinationsSelector?.data?.wisatas;
  const DESTINATIONS_PAGINATION = destinationsSelector?.data?.pagination;

  useEffect(() => {
    dispatch(setQuerySearchGlobal(debouncedSearchTextFilter));
    dispatch(setQueryPageIndex(0));
  }, [dispatch, debouncedSearchTextFilter]);

  useEffect(() => {
    if (destinationsSelector?.shouldFetchLatestAllDestination) {
      dispatch(fetchgetAllDestination());
      dispatch(toggleFetchLatestAllDestination());
    }
    dispatch(fetchgetAllDestination({ search: searchGlobal, pageIndex: pageIndex + 1, pageSize }));
  }, [
    dispatch,
    destinationsSelector.shouldFetchLatestAllDestination,
    searchGlobal,
    pageIndex,
    pageSize,
  ]);

  return (
    <>
      <div className="flex flex-col justify-between gap-3 sm:flex-row ">
        {/* Search */}
        <InputSearchField
          type="text"
          id="search"
          autoComplete="off"
          placeholder={`${convertNumberToThousand(DESTINATIONS_PAGINATION?.total || 0)} Data...`}
          startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        {/* Add Destination Button */}
        <Link to="/destinasi/tambah">
          <Button className="w-full gap-2 sm:w-auto">
            Tambah Destinasi
            <PlusIcon className="mr-2 h-4 w-4 bg-primary-80" />
          </Button>
        </Link>
      </div>

      {/* Table */}
      {destinationsSelector?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}

      {destinationsSelector?.status === 'succeeded' && (
        <DataTable
          columns={columns}
          data={DESTINATIONS_DATA}
          pageCount={DESTINATIONS_PAGINATION?.last_page}
          queryPageIndex={pageIndex}
          queryPageSize={pageSize}
        />
      )}
    </>
  );
};
