import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchGetUsers, selectUsers, toggleFetchLatestUsers } from '@/stores/features/UsersSlice';
import {
  selectReactTable,
  setQueryPageIndex,
  setQuerySearchGlobal,
} from '@/stores/ReactTableSlice';
import { convertNumberToThousand } from '@/utils/format';

import { columns } from './UsersColumn';

export const UsersList = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTextFilter = useDebounce(searchText, 600);

  const usersSelector = useSelector(selectUsers);
  const { searchGlobal, pageIndex, pageSize } = useSelector(selectReactTable);

  const dispatch = useDispatch();

  const USERS_DATA = usersSelector?.data?.users;
  const USERS_PAGINATION = usersSelector?.data?.pagination;

  useEffect(() => {
    dispatch(setQuerySearchGlobal(debouncedSearchTextFilter));
    dispatch(setQueryPageIndex(0));
  }, [dispatch, debouncedSearchTextFilter]);

  useEffect(() => {
    if (usersSelector?.shouldFetchLatestUsers) {
      dispatch(fetchGetUsers());
      dispatch(toggleFetchLatestUsers());
    }
    dispatch(fetchGetUsers({ search: searchGlobal, pageIndex: pageIndex + 1, pageSize }));
  }, [dispatch, usersSelector.shouldFetchLatestUsers, searchGlobal, pageIndex, pageSize]);

  return (
    <>
      {/* Search */}
      <div className="sm:flex sm:gap-x-2">
        <InputSearchField
          type="text"
          id="search"
          autoComplete="off"
          placeholder={`${convertNumberToThousand(USERS_PAGINATION?.total || 0)} Data...`}
          startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>

      {/* Table */}
      {usersSelector?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}

      {usersSelector?.status === 'succeeded' && (
        <DataTable
          columns={columns}
          data={USERS_DATA}
          pageCount={USERS_PAGINATION?.last_page}
          queryPageIndex={pageIndex}
          queryPageSize={pageSize}
        />
      )}
    </>
  );
};
