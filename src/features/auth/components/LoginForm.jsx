import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

import { APIAuth } from '@/apis/APIAuth';
import { Spinner } from '@/components/Elements';
import { InputField } from '@/components/Forms';
import { Button } from '@/components/ui/button';

const schema = y.object({
  username: y.string().required('Username tidak boleh kosong!'),
  password: y
    .string()
    .required('Kata Sandi tidak boleh kosong!')
    .min(6, 'Kata Sandi minimal 6 karakter'),
});

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await APIAuth.signInWithCredentials(data);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
            type="text"
            label="Username"
            placeholder="Masukkan username"
            registration={register('username')}
            error={errors.username}
          />
          <InputField
            type="password"
            label="Kata Sandi"
            id="password"
            placeholder="Masukkan Kata Sandi"
            registration={register('password')}
            error={errors.password}
          />
          <Button disabled={isLoading} variant="tertiary" type="submit" className="w-full">
            {isLoading && <Spinner size="sm" className="mr-3" />}
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
};
