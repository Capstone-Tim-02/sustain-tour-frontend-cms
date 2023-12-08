import { useDispatch } from 'react-redux';

import { APIUser } from '@/apis';
import { TrashIcon } from '@/components/Icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toggleFetchLatestAllUser } from '@/stores/features';

export const DeleteUser = ({ id }) => {
  const dispatch = useDispatch();

  const handleDeleteUser = async (id) => {
    await APIUser.deleteUser(id);
    dispatch(toggleFetchLatestAllUser());
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TrashIcon className="h-5 w-5 stroke-2 text-redDestimate-100 hover:cursor-pointer hover:text-redDestimate-100/70" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Pengguna</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus pengguna ini?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={async () => {
              await handleDeleteUser(id);
            }}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
