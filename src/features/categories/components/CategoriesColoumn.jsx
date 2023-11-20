import { formatDate } from '@/utils/format';

import { DeleteCategory } from './DeleteCategories';
import { EditCategory } from './EditCategories';

const Name = ({ category }) => {
  return (
    <div className="flex items-center">
      <div className="ml-4">
        <div className="mb-1 text-sm font-semibold text-gray-600">
          {category?.category_name ? category?.category_name : '-'}
        </div>
      </div>
    </div>
  );
};

const Action = ({ value }) => {
  return (
    <div className="flex items-center space-x-4">
      <EditCategory category_name={value?.category_name} />
      <DeleteCategory id={value?.id} />
    </div>
  );
};

export const columns = [
  {
    header: 'Nama Category',
    accessorKey: 'category_name',
    cell: ({ row }) => {
      const categories = row.original;
      return <Name category={categories} />;
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
