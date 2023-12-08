import { useDispatch } from 'react-redux';

import { APIDestination } from '@/apis';
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
import { toggleFetchLatestAllDestination } from '@/stores/features';

export const DeleteDestination = ({ id }) => {
  const dispatch = useDispatch();

  const handleDeleteDestination = async (id) => {
    await APIDestination.deleteDestination(id);
    dispatch(toggleFetchLatestAllDestination());
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TrashIcon className="h-5 w-5 stroke-2 text-redDestimate-100 hover:cursor-pointer hover:text-redDestimate-100/70" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Destinasi</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus destinasi ini ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={async () => {
              await handleDeleteDestination(id);
            }}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
