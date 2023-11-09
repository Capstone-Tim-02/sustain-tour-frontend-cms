import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

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

const schema = y.object({
  name: y.string().required('Nama wajib diisi').min(3, 'Minimal 3 karakter'),
  username: y.string().required('Username wajib diisi').min(3, 'Minimal 3 karakter'),
  email: y.string().email('Email tidak valid').required('Email wajib diisi'),
  phone_number: y.string().required('No. Telepon wajib diisi'),
});

export const EditUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log(data);
  };

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
          <Button form="editUser" type="submit">
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
