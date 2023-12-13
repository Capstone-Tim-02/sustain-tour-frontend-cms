import { formatDate } from '@/utils/format';

import { DeleteCategory } from './DeleteCategory';
import { EditCategory } from './EditCategory';

const Action = ({ value }) => {
  const categoryDefaultId = {
    1: 'Wisata Alam',
    2: 'Wisata Hiburan',
    16: 'Wisata Budaya',
    21: 'Wisata Sejarah',
  };

  return (
    <div className="flex items-center space-x-4">
      {!categoryDefaultId[value.id] && <EditCategory category_name={value?.category_name} />}
      {!categoryDefaultId[value.id] && <DeleteCategory id={value?.id} />}
    </div>
  );
};

export const columns = [
  {
    header: 'Nama Kategori',
    accessorKey: 'category_name',
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
