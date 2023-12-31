import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogClose } from '@radix-ui/react-dialog';
import * as y from 'yup';

import { APIUser } from '@/apis';
import { Spinner } from '@/components/Elements';
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
import { toggleFetchLatestAllUser } from '@/stores/features';

const schema = y.object({
  name: y.string().required('Nama tidak boleh kosong').min(3, 'Minimal 3 karakter untuk nama'),
  username: y
    .string()
    .required('Username tidak boleh kosong')
    .min(5, 'Minimal 5 karakter untuk username')
    .max(20, 'Maksimal 20 karakter untuk username')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh terdiri dari a-z, A-Z, 0-9, dan _'),
  email: y.string().email('Masukkan format email yang benar').required('Email tidak boleh kosong'),
  phone_number: y
    .string()
    .test('is-number', 'Masukkan format nomor telepon yang benar', (value) => {
      // return true if value is a number
      return !isNaN(value);
    })
    .test(
      'valid-phone-number',
      'No. Telepon tidak perlu menggunakan +62, 62, atau 0 didepan.',
      (value) => {
        return !value.startsWith('+62') && !value.startsWith('62') && !value.startsWith('0');
      }
    )
    .matches(/^\d{10,12}$/, 'No.Telepon harus terdiri dari 10-12 digit angka')
    .required('No. Telepon tidak boleh kosong'),
});

export const EditUser = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailUser, setDetailUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      setDetailUser(await APIUser.getUserById(id));
      setIsLoading(false);
    }

    if (isDialogOpen) {
      fetchUser();
    }
  }, [id, isDialogOpen]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await APIUser.updateUser(id, data);
      dispatch(toggleFetchLatestAllUser());
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
        ...detailUser,
      });
    }
  }, [reset, detailUser, isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger onClick={() => setIsDialogOpen(!isDialogOpen)}>
        <EditIcon className="h-5 w-5 stroke-2 text-primary-100 hover:cursor-pointer hover:text-primary-100/70" />
      </DialogTrigger>
      <DialogContent onClick={() => setIsDialogOpen(!isDialogOpen)} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-primary-100">Edit Pengguna</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <Spinner size="base" className="mx-auto mb-5" />
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)} id="editUser" className="space-y-4">
              <InputField
                placeholder="Masukkan username"
                label="Username"
                autoComplete="off"
                registration={register('username')}
                error={errors.username}
              />
              <InputField
                placeholder="Masukkan nama"
                label="Nama"
                autoComplete="off"
                registration={register('name')}
                error={errors.name}
              />
              <InputField
                type="text"
                placeholder="Masukkan email"
                label="Email"
                autoComplete="off"
                registration={register('email')}
                error={errors.email}
              />
              <InputField
                startIcon={<span className="text-gray-500">+62</span>}
                label="No. Telepon"
                type="tel"
                placeholder="cth : 81234382067"
                autoComplete="off"
                registration={register('phone_number')}
                error={errors.phone_number}
              />
            </form>
            <DialogFooter>
              <DialogClose
                onClick={() => setIsDialogOpen(!isDialogOpen)}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <span>Batal</span>
              </DialogClose>
              <Button isloading={isLoading} form="editUser" type="submit">
                Simpan
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
