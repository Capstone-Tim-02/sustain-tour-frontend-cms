import { useDispatch } from 'react-redux';

import { APIDestinations } from '@/apis/APIDestinations';
import { EditIcon } from '@/components/Icons';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export const EditDestination = ({ id }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <EditIcon className="h-5 w-5 stroke-2 text-primary-100 hover:cursor-pointer hover:opacity-60" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <></>
      </AlertDialogContent>
    </AlertDialog>
  );
};
