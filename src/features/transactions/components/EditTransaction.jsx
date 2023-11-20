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
import { formatDate } from '@/utils/format';

const schema = y.object({
  paid_status: y.boolean().required('Status pembayaran harus diisi!'),
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
      setDetailTransaction(await APITransactions.getTransaction(invoiceId));
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
      const formattedCreatedAt = formatDate(detailTransaction?.created_at, 'YYYY-MM-DD');
      const formattedCheckinBooking = formatDate(detailTransaction?.check_in_booking, 'YYYY-MM-DD');
      reset({
        ...detailTransaction,
        created_at: formattedCreatedAt,
        check_in_booking: formattedCheckinBooking,
      });
    }
  }, [reset, detailTransaction, isDialogOpen]);

  return (
    <Dialog>
      <DialogTrigger onClick={() => setIsDialogOpen(!isDialogOpen)}>
        <EditIcon className="h-5 w-5 stroke-2 text-primary-100 hover:cursor-pointer hover:text-primary-100/70" />
      </DialogTrigger>
      <DialogContent onClick={() => setIsDialogOpen(!isDialogOpen)} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-primary-100">Edit Transaksi</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} id="editTransaction" className="space-y-4">
          <InputField
            disabled
            placeholder="Invoice Number"
            label="Invoice Number"
            autoComplete="off"
            registration={register('invoice_number')}
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
            type="date"
            placeholder="Tanggal Pembelian"
            label="Tanggal Pembelian"
            autoComplete="off"
            registration={register('created_at')}
          />
          <InputField
            disabled
            type="date"
            placeholder="Tanggal Penggunaan"
            label="Tanggal Penggunaan"
            autoComplete="off"
            registration={register('check_in_booking')}
          />
          <DropdownField
            label="Status"
            options={statusOptions}
            registration={register('paid_status')}
            error={errors.paid_status}
          />
        </form>
        <DialogFooter>
          <DialogClose
            onClick={() => setIsDialogOpen(!isDialogOpen)}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <span>Batal</span>
          </DialogClose>
          <Button disabled={isLoading} form="editTransaction" type="submit">
            {isLoading && <Spinner size="sm" className="mr-3" />} Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
