import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from 'lucide-react';

import { DataTable, Spinner } from '@/components/Elements';
import { InputSearchField } from '@/components/Forms';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchGetAllUser, selectUser, toggleFetchLatestAllUser } from '@/stores/features';
import { selectReactTable, setQueryPageIndex, setQuerySearchGlobal } from '@/stores/ui-slice';
import { convertNumberToThousand } from '@/utils/format';

import { columns } from './UserColumn';

export const UserList = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTextFilter = useDebounce(searchText, 600);

  const usersSelector = useSelector(selectUser);
  const { searchGlobal, pageIndex, pageSize } = useSelector(selectReactTable);

  const dispatch = useDispatch();

  const USERS_DATA = usersSelector?.data?.users;
  const USERS_PAGINATION = usersSelector?.data?.pagination;

  useEffect(() => {
    dispatch(setQuerySearchGlobal(debouncedSearchTextFilter));
    dispatch(setQueryPageIndex(0));
  }, [dispatch, debouncedSearchTextFilter]);

  useEffect(() => {
    if (usersSelector?.shouldFetchLatestAllUser) {
      dispatch(fetchGetAllUser());
      dispatch(toggleFetchLatestAllUser());
    }
    dispatch(fetchGetAllUser({ search: searchGlobal, pageIndex: pageIndex + 1, pageSize }));
  }, [dispatch, usersSelector.shouldFetchLatestAllUser, searchGlobal, pageIndex, pageSize]);

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
