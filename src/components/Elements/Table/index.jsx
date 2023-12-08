import { useDispatch, useSelector } from 'react-redux';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import { DropdownField } from '@/components/Forms';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DOTS, useCustomPagination } from '@/hooks/useCustomPagination';
import { selectReactTable, setQueryPageIndex, setQueryPageSize } from '@/stores/ui-slice';

const PaginationOptions = ({ currentPage, pageCount, siblingCount = 1, pageSize }) => {
  const dispatch = useDispatch();

  const paginationRange = useCustomPagination({
    currentPage,
    pageCount,
    siblingCount,
    pageSize,
  });

  const handlePageChange = (page) => dispatch(setQueryPageIndex(page - 1));

  return (
    <>
      {paginationRange?.map((page, index) => {
        if (page === DOTS) {
          return (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className={clsx(
                '!rounded-none',
                currentPage === page && '!bg-primary-80 text-white hover:text-white'
              )}
            >
              ...
            </Button>
          );
        }

        return (
          <Button
            key={index}
            variant="outline"
            size="icon"
            className={clsx(
              '!rounded-none disabled:cursor-not-allowed disabled:!opacity-100',
              currentPage === page - 1 &&
                '!bg-primary-80 text-white hover:!bg-primary-80/80 hover:text-white'
            )}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        );
      })}
    </>
  );
};

export const DataTable = ({ columns, data, pageCount, queryPageIndex, queryPageSize }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      pageIndex: queryPageIndex,
      pageSize: queryPageSize,
    },
    pageCount,
    manualPagination: true,
  });

  const reactTableSelector = useSelector(selectReactTable);
  const dispatch = useDispatch();

  const setPageSizeHandler = (e) => {
    const pageSize = Number(e.target.value);
    table.setPageSize(pageSize);
    dispatch(setQueryPageSize(pageSize));
    dispatch(setQueryPageIndex(0));
  };

  const statusOptions = [
    { value: 10, label: 'Tampilkan 10' },
    { value: 50, label: 'Tampilkan 50' },
    { value: 100, label: 'Tampilkan 100' },
  ];

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-lg shadow">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="whitespace-nowrap bg-gray-100 text-xs capitalize"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-7">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap px-7">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Data Tidak Tersedia
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between py-6">
        <div className="mx-auto flex flex-col items-center space-y-8 sm:flex-1 sm:flex-row sm:justify-between sm:space-y-0">
          <div className="flex items-baseline gap-x-3">
            <span className="text-sm text-gray-600">
              Halaman{' '}
              <span className="font-medium">
                {table.getPageOptions().length > 0 ? reactTableSelector?.pageIndex + 1 : 0} dari{' '}
                {table.getPageOptions().length}
              </span>
            </span>

            <DropdownField
              options={statusOptions}
              defaultValue={reactTableSelector?.pageSize}
              onChange={setPageSizeHandler}
            />
          </div>
          <div>
            <div className="inline-flex -space-x-px shadow-sm" aria-label="Pagination">
              <Button
                variant="outline"
                size="icon"
                className="!rounded-none !rounded-l-md"
                onClick={() => dispatch(setQueryPageIndex(reactTableSelector?.pageIndex - 1))}
                disabled={reactTableSelector?.pageIndex === 0}
              >
                <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
              </Button>

              <PaginationOptions
                currentPage={reactTableSelector?.pageIndex}
                pageCount={pageCount}
                pageSize={reactTableSelector?.pageSize}
              />

              <Button
                variant="outline"
                size="icon"
                className="!rounded-none !rounded-r-md"
                onClick={() => dispatch(setQueryPageIndex(reactTableSelector?.pageIndex + 1))}
                disabled={reactTableSelector?.pageIndex === pageCount - 1}
              >
                <ArrowRightIcon className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
