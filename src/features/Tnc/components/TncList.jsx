import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { fetchGetTnc, selectTnc, toggleFetchLatestTnc } from '@/stores/features/TncSlice';

import { columns } from './TncColumn';

export const TncList = () => {
  const tnc = useSelector(selectTnc);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tnc?.shouldFetchLatestTnc) {
      dispatch(fetchGetTnc());
      dispatch(toggleFetchLatestTnc());
    }
    dispatch(fetchGetTnc());
  }, [dispatch, tnc.shouldFetchLatestTnc]);

  return (
    <>
      {/* Table */}
      {tnc?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}

      {tnc?.status === 'succeeded' && <DataTable columns={columns} data={tnc?.data} />}
    </>
  );
};
