import { toast } from 'react-toastify';

import { APIUsers } from '@/apis/APIUsers';
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

export const DeleteUser = ({ id }) => {
  const handleDeleteUser = async (id) => {
    await APIUsers.deleteUser(id).then((res) => console.log(res));
  };

  const handleReload = () => {
    toast.success('Berhasil menghapus pengguna');

    setTimeout(() => {
      window.location.reload();
    }, 2000);
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
              handleReload();
            }}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
