import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogClose } from '@radix-ui/react-dialog';
import * as y from 'yup';

import { APITransactions } from '@/apis/APITransactions';
import { Spinner } from '@/components/Elements';
import { InputField } from '@/components/Forms';
import { DropdownField } from '@/components/Forms/DropdownField';
import { EditIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toggleFetchLatestTransactions } from '@/stores/features/TransactionsSlice';
import { convertToRupiah, formatDate } from '@/utils/format';

const schema = y.object({
  paid_status: y.boolean().required('Status pembayaran harus diisi'),
});

const statusOptions = [
  { value: false, label: 'Belum Bayar' },
  { value: true, label: 'Sudah Bayar' },
];

export const EditTransaction = ({ invoiceId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailTransaction, setDetailTransaction] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchTransaction() {
      setIsLoading(true);
      setDetailTransaction(await APITransactions.getTransaction(invoiceId));
      setIsLoading(false);
    }

    if (isDialogOpen) {
      fetchTransaction();
    }
  }, [invoiceId, isDialogOpen]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await APITransactions.updateTransaction(invoiceId, data);
      dispatch(toggleFetchLatestTransactions());
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isDialogOpen) {
      const formattedCreatedAt = formatDate(detailTransaction?.created_at, 'D MMMM YYYY');
      const formattedCheckinBooking = formatDate(
        detailTransaction?.check_in_booking,
        'D MMMM YYYY'
      );
      reset({
        ...detailTransaction,
        created_at: formattedCreatedAt,
        check_in_booking: formattedCheckinBooking,
        total_cost: convertToRupiah(detailTransaction?.total_cost || 0),
      });
    }
  }, [reset, detailTransaction, isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger onClick={() => setIsDialogOpen(!isDialogOpen)}>
        <EditIcon className="h-5 w-5 stroke-2 text-primary-100 hover:cursor-pointer hover:text-primary-100/70" />
      </DialogTrigger>
      <DialogContent
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary-20 scrollbar-thumb-rounded-full sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle className="mb-4 text-primary-100">Edit Transaksi</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <Spinner size="base" className="mx-auto mb-5" />
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)} id="editTransaction" className="space-y-4">
              <InputField
                disabled
                placeholder="ID Order"
                label="ID Order"
                autoComplete="off"
                registration={register('invoice_number')}
              />
              <InputField
                disabled
                placeholder="Nama Pengguna"
                label="Nama Pengguna"
                autoComplete="off"
                registration={register('name')}
              />
              <InputField
                disabled
                placeholder="Destinasi"
                label="Destinasi"
                autoComplete="off"
                registration={register('wisata_title')}
              />
              <InputField
                disabled
                placeholder="Harga Tiket"
                label="Harga Tiket"
                autoComplete="off"
                registration={register('total_cost')}
              />
              <InputField
                disabled
                placeholder="Kode Promo"
                label="Kode Promo"
                autoComplete="off"
                registration={register('kode_voucher')}
              />
              <InputField
                disabled
                placeholder="Tanggal Pembelian"
                label="Tanggal Pembelian"
                autoComplete="off"
                registration={register('created_at')}
              />
              <InputField
                disabled
                placeholder="Tanggal Penggunaan"
                label="Tanggal Penggunaan"
                autoComplete="off"
                registration={register('check_in_booking')}
              />

              {(detailTransaction?.status_order === 'pending' ||
                detailTransaction?.status_order === 'success') && (
                <DropdownField
                  label="Status"
                  options={statusOptions}
                  registration={register('paid_status')}
                  error={errors.paid_status}
                />
              )}
            </form>
            <DialogFooter>
              <DialogClose
                onClick={() => setIsDialogOpen(!isDialogOpen)}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Batal
              </DialogClose>

              {(detailTransaction?.status_order === 'pending' ||
                detailTransaction?.status_order === 'success') && (
                <Button isloading={isLoading} form="editTransaction" type="submit">
                  Simpan
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
