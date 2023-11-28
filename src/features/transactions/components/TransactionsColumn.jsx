import { Badge } from '@/components/ui/badge';
import { convertToRupiah, formatDate } from '@/utils/format';

import { DetailTransaction } from './DetailTransaction';
import { EditTransaction } from './EditTransaction';

const StatusOrder = ({ status_order }) => {
  if (status_order === 'success') return <Badge variant="success">Selesai</Badge>;
  if (status_order === 'pending') return <Badge variant="pending">Tertunda</Badge>;
  if (status_order === 'dibatalkan') return <Badge variant="destructive">Batal</Badge>;
};

const Action = ({ value }) => {
  return (
    <div className="flex items-center space-x-4">
      <DetailTransaction invoiceNumber={value?.invoice_number} />
      <EditTransaction invoiceId={value?.invoice_number} />
    </div>
  );
};

export const columns = [
  {
    header: 'ID Order',
    accessorKey: 'invoice_number',
  },
  {
    header: 'Nama Pengguna',
    accessorKey: 'user_name',
  },
  {
    header: 'Destinasi',
    accessorKey: 'wisata_title',
  },
  {
    header: 'Harga Tiket',
    accessorKey: 'total_cost',
    cell: ({ row }) => {
      const total_cost = row.original.total_cost;
      return total_cost ? convertToRupiah(total_cost) : '-';
    },
  },
  {
    header: 'Tanggal Pembelian',
    accessorKey: 'created_at',
    cell: ({ row }) => {
      const created_at = row.original.created_at;
      return created_at ? formatDate(created_at, 'D MMMM YYYY HH:mm:ss') : '-';
    },
  },
  {
    header: 'Tanggal Penggunaan',
    accessorKey: 'CheckinBooking',
    cell: ({ row }) => {
      const CheckinBooking = row.original.checkin_booking;
      return CheckinBooking ? formatDate(CheckinBooking, 'D MMMM YYYY HH:mm:ss') : '-';
    },
  },
  {
    header: 'Status',
    accessorKey: 'status_order',
    cell: ({ row }) => {
      const status_order = row.original.status_order;
      return <StatusOrder status_order={status_order} />;
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
