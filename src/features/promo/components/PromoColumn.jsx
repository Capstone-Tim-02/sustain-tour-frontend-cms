import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { Tooltip } from '@/components/Elements';
import { EditIcon } from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/format';

import { DeletePromo } from './DeletePromo';

const ExpiredAt = ({ value }) => {
  const date = dayjs(formatDate(value, 'DD MMMM YYYY'));
  const today = dayjs();

  // if value is same or before today, then it will be red
  const isExpired = date.isSame(today, 'day') || date.isBefore(today, 'day');

  // if value is less or equal than 7 days from today, then it will be yellow
  const isLessThan7Days = date.isAfter(today.subtract(7, 'day'));

  if (isExpired) {
    return (
      <Tooltip message={'Kadaluarsa'}>
        <span className="cursor-default text-sm font-medium text-redDestimate-100">
          {formatDate(value, 'DD MMMM YYYY')}
        </span>
      </Tooltip>
    );
  } else if (isLessThan7Days) {
    return (
      <Tooltip message={'Kadaluarsa kurang dari 7 hari'}>
        <span className="cursor-default text-sm font-medium text-warning-500">
          {formatDate(value, 'DD MMMM YYYY')}
        </span>
      </Tooltip>
    );
  } else {
    return (
      <span className="text-sm font-medium text-success-500">
        {formatDate(value, 'DD MMMM YYYY')}
      </span>
    );
  }
};

const Status = ({ status }) => {
  return (
    <div>
      {status?.status_aktif ? (
        <Badge variant="success">Aktif</Badge>
      ) : (
        <Badge variant="destructive">Tidak Aktif</Badge>
      )}
    </div>
  );
};

const Action = ({ value }) => {
  return (
    <div className="flex items-center space-x-4">
      <Link to={`/promo/edit/${value?.id}`}>
        <EditIcon className="h-5 w-5 stroke-2 text-primary-100 hover:cursor-pointer hover:text-primary-100/70" />
      </Link>

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
    header: 'Kode Promo',
    accessorKey: 'kode_voucher',
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
      return <ExpiredAt value={expired} />;
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
