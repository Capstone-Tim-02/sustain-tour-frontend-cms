import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

import { APIUsers } from '@/apis/APIUsers';
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
import { toggleFetchLatestUsers } from '@/stores/features/UsersSlice';

const schema = y.object({
  name: y.string().required('Nama wajib diisi').min(3, 'Minimal 3 karakter'),
  username: y.string().required('Username wajib diisi').min(3, 'Minimal 3 karakter'),
  email: y.string().email('Email tidak valid').required('Email wajib diisi'),
  phone_number: y
    .string()
    .test('is-number', 'No. Telepon harus berupa angka', (value) => {
      // return true if value is a number
      return !isNaN(value);
    })
    .required('No. Telepon wajib diisi'),
});

export const EditUser = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailUser, setDetailUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      setDetailUser(await APIUsers.getUser(id));
    }
    fetchUser();
  }, [id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await APIUsers.updateUser(id, data);
      dispatch(toggleFetchLatestUsers());
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reset({
      ...detailUser,
    });
  }, [reset, detailUser]);

  return (
    <Dialog>
      <DialogTrigger>
        <EditIcon className="h-5 w-5 stroke-2 text-primary-100 hover:cursor-pointer hover:text-primary-100/70" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4 text-primary-100">Edit Pengguna</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} id="editUser" className="space-y-3">
          <InputField
            isRequired
            placeholder="Masukkan username"
            label="Username"
            autoComplete="off"
            registration={register('username')}
            error={errors.username}
          />
          <InputField
            isRequired
            placeholder="Masukkan nama"
            label="Nama"
            autoComplete="off"
            registration={register('name')}
            error={errors.name}
          />
          <InputField
            isRequired
            type="email"
            placeholder="Masukkan email"
            label="Email"
            autoComplete="off"
            registration={register('email')}
            error={errors.email}
          />
          <InputField
            startIcon={<span className="text-gray-500">+62</span>}
            isRequired
            label="No. Telepon"
            type="tel"
            placeholder="cth : 81234382067"
            autoComplete="off"
            registration={register('phone_number')}
            error={errors.phone_number}
          />
        </form>
        <DialogFooter>
          <Button disabled={isLoading} form="editUser" type="submit">
            {isLoading && <Spinner size="sm" className="mr-3" />} Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
