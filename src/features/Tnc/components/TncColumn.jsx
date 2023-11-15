import { Link } from 'react-router-dom';

import { MarkdownPreview } from '@/components/Elements';
import { EditIcon } from '@/components/Icons';
import { formatDate } from '@/utils/format';

const TncName = ({ tncName }) => {
  const isLongTncName = tncName.length > 40;

  return (
    <div className={`${isLongTncName ? 'text-ellipsis whitespace-normal' : 'text-sm'}`}>
      {tncName}
    </div>
  );
};

const Description = ({ description }) => {
  const isLongDescription = description.length > 40;

  return (
    <div className={`${isLongDescription ? 'text-ellipsis whitespace-normal' : 'text-sm'}`}>
      <MarkdownPreview value={description} />
    </div>
  );
};

const Action = ({ value }) => {
  return (
    <div className="flex items-center space-x-4">
      <Link to={`/syarat_dan_ketentuan/${value.id}`}>
        <EditIcon className="h-5 w-5 stroke-2 text-primary-100 hover:cursor-pointer hover:text-primary-100/70" />
      </Link>
    </div>
  );
};

export const columns = [
  {
    header: 'Judul',
    accessorKey: 'tnc_name',
    cell: ({ row }) => {
      const tnc_name = row.original.tnc_name;
      return <TncName tncName={tnc_name} />;
    },
  },
  {
    header: 'Deskripsi',
    accessorKey: 'description',
    cell: ({ row }) => {
      const description = row.original.description;
      return <Description description={description} />;
    },
  },
  {
    header: 'Tanggal Dibuat',
    accessorKey: 'created_at',
    cell: ({ row }) => {
      const created_at = row.original.created_at;
      return created_at ? formatDate(created_at, 'MMMM D, YYYY HH:mm:ss') : '-';
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
