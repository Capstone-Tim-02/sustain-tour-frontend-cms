import { useDispatch } from 'react-redux';

import { APIDestinations } from '@/apis/APIDestinations';
import { DetailIcon } from '@/components/Icons';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export const DetailDestination = ({ id }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <DetailIcon className="h-5 w-5 stroke-2 text-black hover:cursor-pointer hover:opacity-60" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <></>
      </AlertDialogContent>
    </AlertDialog>
  );
};
