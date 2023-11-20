import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import {
  fetchGetTransactions,
  selectTransactions,
  toggleFetchLatestTransactions,
} from '@/stores/features/TransactionsSlice';

import { columns } from './TransactionsColumn';

export const TransactionsList = () => {
  const [searchText, setSearchText] = useState('');

  const transactions = useSelector(selectTransactions);

  const dispatch = useDispatch();

  useEffect(() => {
    if (transactions?.shouldFetchLatestTransactions) {
      dispatch(fetchGetTransactions());
      dispatch(toggleFetchLatestTransactions());
    }
    dispatch(fetchGetTransactions());
  }, [dispatch, transactions.shouldFetchLatestTransactions]);

  return (
    <>
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

      {/* Table */}
      {transactions?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}

      {transactions?.status === 'succeeded' && (
        <DataTable
          columns={columns}
          data={transactions?.data}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      )}
    </>
  );
};
