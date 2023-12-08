import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { CheckIcon, ClockIcon, XIcon } from 'lucide-react';

import { APITransaction } from '@/apis';
import avatar from '@/assets/images/avatar.png';
import { Spinner } from '@/components/Elements';
import { DetailIcon } from '@/components/Icons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { convertToRupiah, formatDate } from '@/utils/format';

const StatusTransaction = (status_order, screen) => {
  const color = {
    success: 'text-greenDestimate-100',
    pending: 'text-primary-40',
    dibatalkan: 'text-redDestimate-100',
  };

  const screenSize = {
    mobile: 'h-14 w-14',
    desktop: 'mb-2 h-20 w-20',
  };

  return (
    <>
      {status_order === 'success' && (
        <CheckIcon className={clsx(color.success, screenSize[screen])} />
      )}
      {status_order === 'pending' && (
        <ClockIcon className={clsx(color.pending, screenSize[screen])} />
      )}
      {status_order === 'dibatalkan' && (
        <XIcon className={clsx(color.dibatalkan, screenSize[screen])} />
      )}

      {status_order === 'success' && (
        <h1 className={clsx('text-xl', color.success)}>Transaksi Selesai</h1>
      )}
      {status_order === 'pending' && (
        <h1 className={clsx('text-xl', color.pending)}>Transaksi Tertunda</h1>
      )}
      {status_order === 'dibatalkan' && (
        <h1 className={clsx('text-xl', color.dibatalkan)}>Transaksi Batal</h1>
      )}
    </>
  );
};

export const DetailTransaction = ({ invoiceNumber }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailTransaction, setDetailTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTransaction() {
      try {
        setDetailTransaction(await APITransaction.getTransactionById(invoiceNumber));
      } finally {
        setIsLoading(false);
      }
    }

    if (isDialogOpen) {
      setIsLoading(true);
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
        {isLoading ? (
          <Spinner size="base" className="mx-auto mb-5" />
        ) : (
          <div className="grid grid-cols-1 items-center justify-center gap-2 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center sm:hidden">
              {StatusTransaction(detailTransaction?.status_order, 'mobile')}
            </div>
            <div
              className={clsx(
                detailTransaction?.status_order === 'success' && 'bg-greenDestimate-100',
                detailTransaction?.status_order === 'pending' && 'bg-primary-40',
                detailTransaction?.status_order === 'dibatalkan' && 'bg-redDestimate-100',
                'mr-3 flex flex-col items-center rounded-[10px] p-5'
              )}
            >
              <img
                src={detailTransaction?.photo_profil || avatar}
                className="h-40 w-40 rounded-[60px] object-cover"
              />
              <h1 className="mb-2 mt-4 text-center text-lg font-semibold text-white">
                {detailTransaction?.name || '-'}
              </h1>
              <h1 className="mb-3 text-center text-sm text-white">
                ID Order: #{detailTransaction?.invoice_number || '-'}
              </h1>
            </div>
            <div>
              <div className="mb-5 hidden flex-col items-center justify-center sm:flex">
                {StatusTransaction(detailTransaction?.status_order, 'desktop')}
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="flex flex-col font-bold">
                  <h1>Harga</h1>
                  <h1 className="my-2">Destinasi</h1>
                  <h1>Tanggal Penggunaan</h1>
                </div>
                <div className="-ml-5 text-base">
                  <h1>: {convertToRupiah(detailTransaction?.total_cost || 0)}</h1>
                  <h1 className="my-2">: {detailTransaction?.wisata_title || '-'}</h1>
                  <h1>: {formatDate(detailTransaction?.check_in_booking, 'DD MMM YYYY')}</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
