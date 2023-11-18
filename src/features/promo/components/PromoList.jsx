import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { InputSearchField } from '@/components/Forms';
import { fetchGetPromo, selectPromo, toggleFetchLatestPromo } from '@/stores/features/PromoSlice';

import { ButtonAddPromo } from './ButtonAddPromo';
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
      <div className="justify-between flex flex-col sm:flex-row gap-3 ">
        <InputSearchField
          type="text"
          id="search"
          autoComplete="off"
          placeholder="Cari"
          startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <Link to="/promo/tambah">
          <ButtonAddPromo />
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
