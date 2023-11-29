import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from '@/components/Elements';
import { DataTable } from '@/components/Elements/Table';
import { fetchGetTnc, selectTnc, toggleFetchLatestTnc } from '@/stores/features/TncSlice';
import { selectReactTable } from '@/stores/ReactTableSlice';

import { columns } from './TncColumn';

export const TncList = () => {
  const tncSelector = useSelector(selectTnc);
  const { pageIndex, pageSize } = useSelector(selectReactTable);

  const dispatch = useDispatch();

  const TNC_DATA = tncSelector?.data?.term_conditions;
  const TNC_PAGINATION = tncSelector?.data?.pagination;

  useEffect(() => {
    if (tncSelector?.shouldFetchLatestTnc) {
      dispatch(fetchGetTnc());
      dispatch(toggleFetchLatestTnc());
    }
    dispatch(fetchGetTnc({ pageIndex: pageIndex + 1, pageSize }));
  }, [dispatch, tncSelector.shouldFetchLatestTnc, pageIndex, pageSize]);

  return (
    <>
      {/* Table */}
      {tncSelector?.status === 'loading' && (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" className="mx-auto mt-10" />
        </div>
      )}

      {tncSelector?.status === 'succeeded' && (
        <DataTable
          columns={columns}
          data={TNC_DATA}
          pageCount={TNC_PAGINATION?.last_page}
          queryPageIndex={pageIndex}
          queryPageSize={pageSize}
        />
      )}
    </>
  );
};
