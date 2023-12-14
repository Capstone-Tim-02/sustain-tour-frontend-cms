import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import { useDebounce } from '@/hooks/useDebounce';
import {
  fetchGetAllCategory,
  selectCategory,
  toggleFetchLatestAllCategory,
} from '@/stores/features';
import { selectReactTable, setQueryPageIndex, setQuerySearchGlobal } from '@/stores/ui-slice';
import { convertNumberToThousand } from '@/utils/format';

import { AddCategory } from './AddCategory';
import { columns } from './CategoryColumn';

export const CategoryList = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTextFilter = useDebounce(searchText, 600);

  const categoriesSelector = useSelector(selectCategory);
  const { searchGlobal, pageIndex, pageSize } = useSelector(selectReactTable);

  const dispatch = useDispatch();

  const CATEGORIES_DATA = categoriesSelector?.data.categories;
  const CATEGORIES_PAGINATION = categoriesSelector?.data?.pagination;

  useEffect(() => {
    dispatch(setQuerySearchGlobal(debouncedSearchTextFilter));
    dispatch(setQueryPageIndex(0));
  }, [dispatch, debouncedSearchTextFilter]);

  useEffect(() => {
    if (categoriesSelector?.shouldFetchLatestAllCategory) {
      dispatch(fetchGetAllCategory());
      dispatch(toggleFetchLatestAllCategory());
    }
    dispatch(fetchGetAllCategory({ search: searchGlobal, pageIndex: pageIndex + 1, pageSize }));
  }, [
    dispatch,
    categoriesSelector.shouldFetchLatestAllCategory,
    searchGlobal,
    pageIndex,
    pageSize,
  ]);

  return (
    <>
      {/* Search */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <InputSearchField
          type="text"
          id="search"
          autoComplete="off"
          placeholder={`${convertNumberToThousand(CATEGORIES_PAGINATION?.total || 0)} Data...`}
          startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/*Button Add category */}
        <AddCategory />
      </div>

      {/* Table */}
      {categoriesSelector?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}

      {categoriesSelector?.status === 'succeeded' && (
        <DataTable
          columns={columns}
          data={CATEGORIES_DATA}
          pageCount={CATEGORIES_PAGINATION?.last_page}
          queryPageIndex={pageIndex}
          queryPageSize={pageSize}
        />
      )}
    </>
  );
};
