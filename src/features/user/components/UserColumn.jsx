import avatar from '@/assets/images/avatar.png';
import { formatDate } from '@/utils/format';

import { DeleteUser } from './DeleteUser';
import { EditUser } from './EditUser';

const Name = ({ user }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <img
          src={user?.photo_profil || avatar}
          alt="avatar"
          className="h-12 w-12 rounded-full object-cover object-center"
        />
      </div>
      <div className="ml-4">
        <div className="mb-1 text-sm font-semibold text-gray-600">
          {user?.name ? user?.name : '-'}
        </div>
        <div className="text-sm text-gray-400">{user?.email ? user?.email : '-'}</div>
      </div>
    </div>
  );
};

const Action = ({ value }) => {
  return (
    <div className="flex items-center space-x-4">
      <EditUser id={value?.id} />
      <DeleteUser id={value?.id} />
    </div>
  );
};

export const columns = [
  {
    header: 'Nama',
    accessorKey: 'name',
    cell: ({ row }) => {
      const users = row.original;
      return <Name user={users} />;
    },
  },
  {
    header: 'No. Telepon',
    accessorKey: 'phone_number',
    cell: ({ row }) => {
      const phone_number = row.original.phone_number;
      return phone_number ? '+62' + phone_number : '-';
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
