import { SearchIcon } from 'lucide-react';

import avatar from '@/assets/images/avatar.png';
import { InputField } from '@/components/Forms';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/utils/format';

import { DeleteUser } from './DeleteUser';
import { EditUser } from './EditUser';

const users = [
  {
    id: 1,
    name: 'Admin Destimate',
    username: 'admin',
    email: 'destimatetour@gmail.com',
    phone_number: '08514321876131',
    photo_profil: '',
    points: 0,
    is_verified: true,
    category_kesukaan: '',
    category_id: 0,
    created_at: null,
  },
  {
    id: 2,
    name: 'Aimar Rizki',
    username: 'aimrzki',
    email: 'muhammadaimar77@gmail.com',
    phone_number: '08514321876132',
    photo_profil: 'https://storage.googleapis.com/relaverse/users/user2/profile_1699522788.jpg',
    points: 0,
    is_verified: true,
    category_kesukaan: 'lifestyle',
    category_id: 2,
    created_at: null,
  },
  {
    id: 5,
    name: 'Angga',
    username: 'Angga',
    email: 'saputraa170503@gmail.com ',
    phone_number: '85711254527',
    photo_profil: '',
    points: 0,
    is_verified: true,
    category_kesukaan: '',
    category_id: 0,
    created_at: null,
  },
  {
    id: 7,
    name: 'usertesting',
    username: 'busertesting',
    email: 'usertesting123@gmail.com',
    phone_number: '08262722727',
    photo_profil: '',
    points: 0,
    is_verified: false,
    category_kesukaan: '',
    category_id: 0,
    created_at: null,
  },
  {
    id: 8,
    name: 'Yunus',
    username: 'yunus',
    email: 'yunus@gmail.com',
    phone_number: '8571219292322',
    photo_profil: '',
    points: 0,
    is_verified: false,
    category_kesukaan: '',
    category_id: 0,
    created_at: null,
  },
  {
    id: 9,
    name: 'Rafli',
    username: 'rafli',
    email: 'rafli@gmail.com',
    phone_number: '821201212912',
    photo_profil: '',
    points: 0,
    is_verified: false,
    category_kesukaan: '',
    category_id: 0,
    created_at: null,
  },
  {
    id: 10,
    name: 'usertestingg',
    username: 'busertestingg',
    email: 'usertestingg123@gmail.com',
    phone_number: '082627227277',
    photo_profil: '',
    points: 0,
    is_verified: false,
    category_kesukaan: '',
    category_id: 0,
    created_at: '2023-11-08T14:40:57.589Z',
  },
  {
    id: 11,
    name: 'coba',
    username: 'cobacoba',
    email: 'coba@gmail.com',
    phone_number: '0987654321',
    photo_profil: '',
    points: 0,
    is_verified: false,
    category_kesukaan: '',
    category_id: 0,
    created_at: '2023-11-09T00:08:03.033Z',
  },
  {
    id: 12,
    name: 'string',
    username: 'string',
    email: 'string@gmail.com',
    phone_number: 'string',
    photo_profil: '',
    points: 0,
    is_verified: false,
    category_kesukaan: '',
    category_id: 0,
    created_at: '2023-11-09T04:35:52.101Z',
  },
];

export const UsersList = () => {
  return (
    <>
      {/* Search */}
      <div className="sm:flex sm:gap-x-2">
        <InputField
          type="text"
          id="search"
          autoComplete="off"
          placeholder="Cari"
          startIcon={<SearchIcon className="h-4 w-4 text-gray-400" />}
        />
      </div>

      {/* Table */}
      <div className="mt-8 overflow-hidden rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 text-xs capitalize">
              <TableHead className="pl-7">Nama</TableHead>
              <TableHead>No. Telepon</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead className="pr-7">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="pl-7">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          src={user?.photo_profil || avatar}
                          alt="avatar"
                          className="h-10 w-10 rounded-lg object-cover object-center"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="mb-1 text-sm font-semibold text-gray-600">
                          {user?.name ? user?.name : '-'}
                        </div>
                        <div className="text-sm text-gray-400">
                          {user?.email ? user?.email : '-'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm font-medium text-gray-500">
                    {user?.phone_number ? user?.phone_number : '-'}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm font-medium text-gray-500">
                    {user?.created_at ? formatDate(user?.created_at, 'MMMM D, YYYY HH:mm:ss') : '-'}
                  </TableCell>
                  <TableCell className="pr-7 text-sm font-medium text-gray-500">
                    <div className="flex items-center space-x-4">
                      <EditUser />
                      <DeleteUser />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="flex items-center justify-center">
                    <div className="mt-2 text-sm text-gray-700">Data tidak tersedia</div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
