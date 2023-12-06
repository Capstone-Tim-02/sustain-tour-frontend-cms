import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchGetPromo, selectPromo, toggleFetchLatestPromo } from '@/stores/features/PromoSlice';
import {
  selectReactTable,
  setQueryPageIndex,
  setQuerySearchGlobal,
} from '@/stores/ReactTableSlice';
import { convertNumberToThousand } from '@/utils/format';

import { columns } from './PromoColumn';

export const PromoList = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTextFilter = useDebounce(searchText, 600);

  const promosSelector = useSelector(selectPromo);
  const { searchGlobal, pageIndex, pageSize } = useSelector(selectReactTable);

  const dispatch = useDispatch();

  const PROMOS_DATA = promosSelector?.data?.promos;
  const PROMOS_PAGINATION = promosSelector?.data?.pagination;

  useEffect(() => {
    dispatch(setQuerySearchGlobal(debouncedSearchTextFilter));
    dispatch(setQueryPageIndex(0));
  }, [dispatch, debouncedSearchTextFilter]);

  useEffect(() => {
    if (promosSelector?.shouldFetchLatestPromo) {
      dispatch(fetchGetPromo());
      dispatch(toggleFetchLatestPromo());
    }
    dispatch(fetchGetPromo({ search: searchGlobal, pageIndex: pageIndex + 1, pageSize }));
  }, [dispatch, promosSelector?.shouldFetchLatestPromo, searchGlobal, pageIndex, pageSize]);

  return (
    <>
      {/* Search */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row ">
        <InputSearchField
          type="text"
          id="search"
          autoComplete="off"
          placeholder={`${convertNumberToThousand(PROMOS_PAGINATION?.total || 0)} Data...`}
          startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />

        {/* Button Add Promo */}
        <Link to="/promo/tambah">
          <Button className="w-full gap-2 sm:w-auto">
            Tambah Promo
            <PlusIcon className="mr-2 h-4 w-4 bg-primary-80" />
          </Button>
        </Link>
      </div>

      {/* Table */}
      {promosSelector?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}

      {promosSelector?.status === 'succeeded' && (
        <DataTable
          columns={columns}
          data={PROMOS_DATA}
          pageCount={PROMOS_PAGINATION?.last_page}
          queryPageIndex={pageIndex}
          queryPageSize={pageSize}
        />
      )}
    </>
  );
};
