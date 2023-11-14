import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputField } from '@/components/Forms';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchGetUsers, selectUsers, toggleFetchLatestUsers } from '@/stores/features/UsersSlice';

import { columns } from './UsersColumn';

export const UsersList = () => {
  const [searchText, setSearchText] = useState('');
  const debounceSearchFilter = useDebounce(searchText, 600);

  const users = useSelector(selectUsers);

  const dispatch = useDispatch();

  useEffect(() => {
    if (users?.shouldFetchLatestUsers) {
      dispatch(fetchGetUsers());
      dispatch(toggleFetchLatestUsers());
    }
    dispatch(fetchGetUsers());
  }, [dispatch, users.shouldFetchLatestUsers]);

  useEffect(() => {
    dispatch(fetchGetUsers(debounceSearchFilter));
  }, [dispatch, debounceSearchFilter]);

  return (
    <>
      {/* Search */}
      <div className="sm:flex sm:gap-x-2">
        <InputField
          type="text"
          id="search"
          autoComplete="off"
          placeholder="Cari"
          startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Table */}
      {users?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}

      {users?.status === 'succeeded' && <DataTable columns={columns} data={users?.data} />}
    </>
  );
};
