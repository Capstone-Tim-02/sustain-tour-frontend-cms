import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

import { InputField } from '@/components/Forms';
import { Button } from '@/components/ui/button';

const schema = y.object({
  username: y.string().required('Username harus diisi'),
  password: y.string().required('Kata Sandi harus diisi').min(6, 'Kata Sandi minimal 6 karakter'),
});

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="mt-8">
      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            isRequired
            type="text"
            label="Username"
            placeholder="Masukkan username"
            registration={register('username')}
            error={errors.username}
          />
          <InputField
            isRequired
            type="password"
            label="Kata Sandi"
            id="password"
            placeholder="Masukkan Kata Sandi"
            registration={register('password')}
            error={errors.password}
          />
          <Button variant="tertiary" type="submit" className="w-full">
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
};
