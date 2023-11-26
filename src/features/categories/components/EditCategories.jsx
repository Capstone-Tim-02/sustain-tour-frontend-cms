import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogClose } from '@radix-ui/react-dialog';
import * as y from 'yup';

import { APICategories } from '@/apis/APICategories';
import { InputField } from '@/components/Forms';
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
import { toggleFetchLatestCategories } from '@/stores/features/CategoriesSlice';

const schema = y.object({
  category_name: y
    .string()
    .required('Nama Kategori tidak boleh kosong')
    .min(5, 'Nama kategori minimal 5 karakter')
    .max(30, 'Nama kategori tidak boleh lebih dari 30 karakter'),
});

export const EditCategory = ({ category_name }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailCategory, setDetailCategory] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCategory() {
      setDetailCategory(await APICategories.getCategory(category_name));
    }
    if (isDialogOpen) {
      fetchCategory();
    }
  }, [category_name, isDialogOpen]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await APICategories.updateCategory(detailCategory.id, data);
      dispatch(toggleFetchLatestCategories());
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isDialogOpen) {
      reset({
        ...detailCategory,
      });
    }
  }, [reset, detailCategory, isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger onClick={() => setIsDialogOpen(!isDialogOpen)}>
        <EditIcon className="h-5 w-5 stroke-2 text-primary-100 hover:cursor-pointer hover:text-primary-100/70" />
      </DialogTrigger>
      <DialogContent onClick={() => setIsDialogOpen(!isDialogOpen)} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-primary-100">Edit Kategori</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} id="editCategory" className="space-y-3">
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
          <Button isloading={isLoading} form="editCategory" type="submit">
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
