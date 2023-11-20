import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import {
  fetchGetCategories,
  selectCategories,
  toggleFetchLatestCategories,
} from '@/stores/features/CategoriesSlice';

import { AddCategory } from './AddCategories';
import { columns } from './CategoriesColoumn';

export const CategoryLists = () => {
  const [searchText, setSearchText] = useState('');

  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories?.shouldFetchLatestCategories) {
      dispatch(fetchGetCategories());
      dispatch(toggleFetchLatestCategories());
    }
    dispatch(fetchGetCategories());
  }, [dispatch, categories.shouldFetchLatestCategories]);

  return (
    <>
      {/* Search */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <InputSearchField
          type="text"
          id="search"
          autoComplete="off"
          placeholder="Cari data"
          startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/*Button Add category */}
        <AddCategory />
      </div>
      {/* Table */}
      {categories?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}
      {categories?.status === 'succeeded' && (
        <DataTable
          columns={columns}
          data={categories?.data}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      )}
    </>
  );
};
