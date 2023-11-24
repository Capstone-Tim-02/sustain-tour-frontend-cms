import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import { Button } from '@/components/ui/button';
import { fetchGetPromo, selectPromo, toggleFetchLatestPromo } from '@/stores/features/PromoSlice';

import { columns } from './PromoColumn';

export const PromoList = () => {
  const [searchText, setSearchText] = useState('');

  const promos = useSelector(selectPromo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (promos?.shouldFetchLatestPromo) {
      dispatch(fetchGetPromo());
      dispatch(toggleFetchLatestPromo());
    }
    dispatch(fetchGetPromo());
  }, [dispatch, promos?.shouldFetchLatestPromo]);

  return (
    <>
      {/* Search */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row ">
        <InputSearchField
          type="text"
          id="search"
          autoComplete="off"
          placeholder="Cari"
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
      {promos?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}

      {promos?.status === 'succeeded' && (
        <DataTable
          columns={columns}
          data={promos?.data}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      )}
    </>
  );
};
