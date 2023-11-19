import { useDispatch } from 'react-redux';

import { APITransactions } from '@/apis/APITransactions';
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
import { toggleFetchLatestTransactions } from '@/stores/features/TransactionsSlice';

export const DeleteTransaction = ({ invoice_number }) => {
  const dispatch = useDispatch();

  const handleDeleteTransaction = async (invoice_number) => {
    await APITransactions.deleteTransaction(invoice_number);
    dispatch(toggleFetchLatestTransactions());
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TrashIcon className="h-5 w-5 stroke-2 text-redDestimate-100 hover:cursor-pointer hover:text-redDestimate-100/70" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Transaksi</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus transaksi ini?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={async () => {
              await handleDeleteTransaction(invoice_number);
            }}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
