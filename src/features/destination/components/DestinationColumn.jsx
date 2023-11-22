import { formatDate } from '@/utils/format';

import { DeleteDestination } from './DeleteDestination';
import { DetailDestination } from './DetailDestination';
import { EditDestination } from './EditDestinations';

const Status = ({ value }) => {
  return value ? 'Open' : 'Close';
};

const Destination = ({ title, kode }) => {
  return (
    <>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="mt-1 text-gray-800">{kode}</div>
      </div>
    </>
  );
};

const Category = ({ value }) => {
  return (
    <div className="rounded-[25px] bg-primary-40 px-2.5 py-1 text-center text-white">
      {value?.category_name}
    </div>
  );
};

const Action = ({ value }) => {
  return (
    <div className="flex items-center space-x-4">
      <DetailDestination id={value?.id} />
      <EditDestination id={value?.id} />
      <DeleteDestination id={value?.id} />
    </div>
  );
};

export const columns = [
  {
    header: 'Status',
    accessorKey: 'is_open',
    cell: ({ row }) => {
      const status = row.original.is_open;
      return <Status value={status} />;
    },
  },
  {
    header: 'Destinasi',
    accessorKey: 'title',
    cell: ({ row }) => {
      const title = row.original.title;
      const kode = row.original.kode;
      return <Destination title={title} kode={kode} />;
    },
  },
  {
    header: 'Kota',
    accessorKey: 'kota',
  },
  {
    header: 'Kategori',
    accessorKey: 'category.category_name',
    cell: ({ row }) => {
      const category = row.original.category;
      return <Category value={category} />;
    },
  },
  {
    header: 'Tanggal Dibuat',
    accessorKey: 'created_at',
    cell: ({ row }) => {
      const created_at = row.original.created_at;
      return created_at ? formatDate(created_at, 'D MMMM YYYY') : '-';
    },
  },
  {
    header: 'Aksi',
    cell: ({ row }) => {
      const value = row.original;
      return <Action value={value} />;
    },
  },
];
