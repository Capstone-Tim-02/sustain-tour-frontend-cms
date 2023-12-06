import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import { useDebounce } from '@/hooks/useDebounce';
import {
  fetchGetTransactions,
  selectTransactions,
  toggleFetchLatestTransactions,
} from '@/stores/features/TransactionsSlice';
import {
  selectReactTable,
  setQueryPageIndex,
  setQuerySearchGlobal,
} from '@/stores/ReactTableSlice';
import { convertNumberToThousand } from '@/utils/format';

import { columns } from './TransactionsColumn';

export const TransactionsList = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTextFilter = useDebounce(searchText, 600);

  const transactionsSelector = useSelector(selectTransactions);
  const { searchGlobal, pageIndex, pageSize } = useSelector(selectReactTable);

  const dispatch = useDispatch();

  const TRANSACTIONS_DATA = transactionsSelector?.data?.tickets;
  const TRANSACTIONS_PAGINATION = transactionsSelector?.data?.pagination;

  useEffect(() => {
    dispatch(setQuerySearchGlobal(debouncedSearchTextFilter));
    dispatch(setQueryPageIndex(0));
  }, [dispatch, debouncedSearchTextFilter]);

  useEffect(() => {
    if (transactionsSelector?.shouldFetchLatestTransactions) {
      dispatch(fetchGetTransactions());
      dispatch(toggleFetchLatestTransactions());
    }
    dispatch(fetchGetTransactions({ search: searchGlobal, pageIndex: pageIndex + 1, pageSize }));
  }, [
    dispatch,
    transactionsSelector.shouldFetchLatestTransactions,
    searchGlobal,
    pageIndex,
    pageSize,
  ]);

  return (
    <>
      {/* Search */}
      <div className="sm:flex sm:gap-x-2">
        <InputSearchField
          type="text"
          id="search"
          autoComplete="off"
          placeholder={`${convertNumberToThousand(TRANSACTIONS_PAGINATION?.total || 0)} Data...`}
          startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>

      {/* Table */}
      {transactionsSelector?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}

      {transactionsSelector?.status === 'succeeded' && (
        <DataTable
          columns={columns}
          data={TRANSACTIONS_DATA}
          pageCount={TRANSACTIONS_PAGINATION?.last_page}
          queryPageIndex={pageIndex}
          queryPageSize={pageSize}
        />
      )}
    </>
  );
};
