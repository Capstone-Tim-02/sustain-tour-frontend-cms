import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import { useDebounce } from '@/hooks/useDebounce';
import {
  fetchGetAdmins,
  selectAdmins,
  toggleFetchLatestAdmins,
} from '@/stores/features/AdminsSlice';
import {
  selectReactTable,
  setQueryPageIndex,
  setQuerySearchGlobal,
} from '@/stores/ReactTableSlice';
import { convertNumberToThousand } from '@/utils/format';

import { columns } from './AdminsColumn';

export const AdminsList = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTextFilter = useDebounce(searchText, 600);

  const adminsSelector = useSelector(selectAdmins);
  const { searchGlobal, pageIndex, pageSize } = useSelector(selectReactTable);

  const dispatch = useDispatch();

  const ADMINS_DATA = adminsSelector?.data?.users;
  const ADMINS_PAGINATION = adminsSelector?.data?.pagination;

  useEffect(() => {
    dispatch(setQuerySearchGlobal(debouncedSearchTextFilter));
    dispatch(setQueryPageIndex(0));
  }, [dispatch, debouncedSearchTextFilter]);

  useEffect(() => {
    if (adminsSelector?.shouldFetchLatestAdmins) {
      dispatch(fetchGetAdmins());
      dispatch(toggleFetchLatestAdmins());
    }
    dispatch(fetchGetAdmins({ search: searchGlobal, pageIndex: pageIndex + 1, pageSize }));
  }, [dispatch, adminsSelector.shouldFetchLatestAdmins, searchGlobal, pageIndex, pageSize]);

  return (
    <>
      {/* Search */}
      <div className="sm:flex sm:gap-x-2">
        <InputSearchField
          type="text"
          id="search"
          autoComplete="off"
          placeholder={`${convertNumberToThousand(ADMINS_PAGINATION?.total || 0)} Data...`}
          startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>

      {/* Table */}
      {adminsSelector?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}

      {adminsSelector?.status === 'succeeded' && (
        <DataTable
          columns={columns}
          data={ADMINS_DATA}
          pageCount={ADMINS_PAGINATION?.last_page}
          queryPageIndex={pageIndex}
          queryPageSize={pageSize}
        />
      )}
    </>
  );
};
