import { useEffect, useState } from 'react';
import { CheckIcon, ClockIcon, XIcon } from 'lucide-react';

import { APITransactions } from '@/apis/APITransactions';
import { DetailIcon } from '@/components/Icons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { convertToRupiah, formatDate } from '@/utils/format';

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
      <DialogContent onClick={() => setIsDialogOpen(!isDialogOpen)} className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-primary-100">Detail Transaksi</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 items-center justify-center gap-2 sm:grid-cols-2">
          <div className="flex flex-col items-center justify-center sm:hidden">
            {detailTransaction?.status_order === 'success' ? (
              <>
                <CheckIcon className="mb-2 h-14 w-14 text-greenDestimate-200" />
                <h1 className="text-[20px] text-greenDestimate-200">
                  {detailTransaction?.status_order}
                </h1>
              </>
            ) : detailTransaction?.status_order === 'pending' ? (
              <>
                <ClockIcon className="h-14 w-14 text-primary-40" />
                <h1 className="text-[20px] text-primary-40">{detailTransaction?.status_order}</h1>
              </>
            ) : detailTransaction?.status_order === 'dibatalkan' ? (
              <>
                <XIcon className="h-14 w-14 text-red-500" />
                <h1 className="text-[20px] text-red-500">{detailTransaction?.status_order}</h1>
              </>
            ) : null}
          </div>
          <div
            className={`${
              detailTransaction?.status_order === 'success'
                ? 'bg-greenDestimate-200'
                : detailTransaction?.status_order === 'pending'
                ? 'bg-primary-40'
                : detailTransaction?.status_order === 'dibatalkan'
                ? 'bg-red-500'
                : ''
            } mr-3 flex flex-col items-center rounded-[10px] p-4`}
          >
            <img
              src={detailTransaction?.photo_profil}
              className="m-2 h-40 w-40 rounded-[60px] object-cover"
            />
            <h1 className="font-semibold text-white">{detailTransaction?.name}</h1>
            <h1 className="text-center text-sm text-white">
              ID Order: #{detailTransaction?.invoice_number}
            </h1>
          </div>
          <div>
            <div className="mb-5 hidden flex-col items-center justify-center sm:flex">
              {detailTransaction?.status_order === 'success' ? (
                <>
                  <CheckIcon className="h-14 w-14 text-greenDestimate-200" />
                  <h1 className="text-[20px] text-greenDestimate-200">
                    {detailTransaction?.status_order}
                  </h1>
                </>
              ) : detailTransaction?.status_order === 'pending' ? (
                <>
                  <ClockIcon className="h-14 w-14 text-primary-40" />
                  <h1 className="text-[20px] text-primary-40">{detailTransaction?.status_order}</h1>
                </>
              ) : detailTransaction?.status_order === 'dibatalkan' ? (
                <>
                  <XIcon className="h-14 w-14 text-red-500" />
                  <h1 className="text-[20px] text-red-500">{detailTransaction?.status_order}</h1>
                </>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="flex flex-col font-bold">
                <h1 className="mb-2">Harga</h1>
                <h1 className="mb-2">Destinasi</h1>
                <h1 className="mb-2">Tanggal Penggunaan</h1>
              </div>
              <div className="-ml-5 text-base">
                <h1 className="mb-2">: {convertToRupiah(detailTransaction?.total_cost || 0)}</h1>
                <h1 className="mb-2">: {detailTransaction?.wisata_title}</h1>
                <h1>: {formatDate(detailTransaction?.check_in_booking, 'DD MMM YYYY')}</h1>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
