// import avatar from '@/assets/images/avatar.png';
import { Link } from 'react-router-dom';

import { formatDate } from '@/utils/format';

import { DeletePromo } from './DeletePromo';
import { EditPromo } from './EditPromo';

const Status = ({ status }) => {
  return (
    <div className="text-sm font-normal">{status?.status_aktif ? 'Aktif' : 'Tidak Aktif'}</div>
  );
};

const Action = ({ value }) => {
  return (
    <div className="flex items-center space-x-4">
      <Link to="/promo/edit"><EditPromo id={value?.id} /></Link>
      
      <DeletePromo id={value?.id} />
    </div>
  );
};

export const columns = [
  {
    header: 'Nama Promo',
    accessorKey: 'nama_promo',
  },
  {
    header: 'Diskon',
    accessorKey: 'jumlah_potongan_persen',
    cell: ({ row }) => {
      const diskon = row.original.jumlah_potongan_persen;
      return diskon !== null ? `${diskon}%` : '-';
    },
  },
  {
    header: 'Tanggal Kadaluarsa',
    accessorKey: 'tanggal_kadaluarsa',
    cell: ({ row }) => {
      const expired = row.original.tanggal_kadaluarsa;
      return expired ? formatDate(expired, 'D MMMM YYYY') : '-';
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
    header: 'Status',
    accessorKey: 'status_aktif',
    cell: ({ row }) => {
      const status = row.original;
      return <Status status={status} />;
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
