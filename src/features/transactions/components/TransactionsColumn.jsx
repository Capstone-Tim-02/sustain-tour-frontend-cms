import { formatDate } from '@/utils/format';

import { DeleteTransaction } from './DeleteTransaction';
import { DetailTransaction } from './DetailTransaction';
import { EditTransaction } from './EditTransaction';

const Action = ({ value }) => {
  return (
    <div className="flex items-center space-x-4">
      <DetailTransaction invoiceNumber={value?.invoice_number} />
      <EditTransaction invoiceId={value?.invoice_number} />
      <DeleteTransaction invoice_number={value?.invoice_number} />
    </div>
  );
};

export const columns = [
  {
    header: 'ID Order',
    accessorKey: 'invoice_number',
  },
  {
    header: 'Tanggal Pembelian',
    accessorKey: 'created_at',
    cell: ({ row }) => {
      const created_at = row.original.created_at;
      return created_at ? formatDate(created_at, 'MMMM D, YYYY') : '-';
    },
  },
  {
    header: 'Tanggal Penggunaan',
    accessorKey: 'CheckinBooking',
    cell: ({ row }) => {
      const CheckinBooking = row.original.checkin_booking;
      return CheckinBooking ? formatDate(CheckinBooking, 'MMMM D, YYYY') : '-';
    },
  },
  {
    header: 'Status',
    accessorKey: 'paid_status',
    cell: ({ row }) => {
      const paid_status = row.original.paid_status;
      return paid_status === true ? 'Sudah Bayar' : 'Belum Bayar';
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
