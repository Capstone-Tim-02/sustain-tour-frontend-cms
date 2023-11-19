import { useEffect, useState } from 'react';

import { APITransactions } from '@/apis/APITransactions';
import { DetailIcon } from '@/components/Icons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const DetailTransaction = ({ invoiceNumber }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailTransaction, setDetailTransaction] = useState(null);
  useEffect(() => {
    async function fetchTransaction() {
      setDetailTransaction(await APITransactions.getTransaction(invoiceNumber));
    }

    if (isDialogOpen) {
      fetchTransaction();
    }
  }, [invoiceNumber, isDialogOpen]);

  return (
    <Dialog>
      <DialogTrigger onClick={() => setIsDialogOpen(!isDialogOpen)}>
        <DetailIcon className="h-5 w-5 stroke-2 text-black hover:cursor-pointer hover:opacity-60" />
      </DialogTrigger>
      <DialogContent onClick={() => setIsDialogOpen(!isDialogOpen)} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-primary-100">Detail Transaksi</DialogTitle>
        </DialogHeader>
        <h1>{detailTransaction?.username}</h1>
        <h1>{detailTransaction?.invoice_number}</h1>
        <h1>{detailTransaction?.status_order}</h1>
        <h1>Rp.{detailTransaction?.total_cost}</h1>
        <h1>{detailTransaction?.wisata_title}</h1>
        <h1>{detailTransaction?.check_in_booking}</h1>
      </DialogContent>
    </Dialog>
  );
};
