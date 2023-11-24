import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogClose } from '@radix-ui/react-dialog';
import { PlusIcon } from 'lucide-react';
import * as y from 'yup';

import { APICategories } from '@/apis/APICategories';
import { InputField } from '@/components/Forms';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toggleFetchLatestCategories } from '@/stores/features/CategoriesSlice';

const schema = y.object({
  category_name: y
    .string()
    .required('Nama Kategori tidak boleh kosong')
    .min(3, 'Minimal 3 karakter untuk nama'),
});

export const AddCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await APICategories.postCategory(data);
      dispatch(toggleFetchLatestCategories());
      setIsDialogOpen(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isDialogOpen) reset();
  }, [reset, isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger onClick={() => setIsDialogOpen(!isDialogOpen)}>
        <div className="flex h-10 w-full items-center justify-center gap-2 gap-x-2 rounded-md bg-primary-80 px-4 py-2 text-sm font-medium text-white hover:bg-primary-80/90 sm:w-auto">
          Tambah Kategori
          <PlusIcon className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent onClick={() => setIsDialogOpen(!isDialogOpen)} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-primary-100">Tambah Kategori</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} id="addCategory" className="space-y-3">
          <InputField
            placeholder="Masukkan Nama Kategori"
            label="Nama Kategori"
            autoComplete="off"
            registration={register('category_name')}
            error={errors.category_name}
          />
        </form>
        <DialogFooter>
          <DialogClose
            onClick={() => setIsDialogOpen(!isDialogOpen)}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <span>Batal</span>
          </DialogClose>
          <Button isloading={isLoading} form="addCategory" type="submit">
            Tambah Kategori
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
