import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';
import * as y from 'yup';

import { APIAuth } from '@/apis/APIAuth';
import { InputField } from '@/components/Forms';
import { Button } from '@/components/ui/button';

const schema = y.object({
  username: y
    .string()
    .required('Username tidak boleh kosong')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh terdiri dari huruf, angka, dan underscore'),
  password: y
    .string()
    .required('Kata Sandi tidak boleh kosong')
    .min(6, 'Kata Sandi minimal 6 karakter'),
});

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

          <div className="relative">
            <InputField
              type={showPassword ? 'text' : 'password'}
              label="Kata Sandi"
              id="password"
              placeholder="Masukkan Kata Sandi"
              registration={register('password')}
              error={errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-14 -translate-y-1/2 transform sm:top-12"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-600 hover:text-gray-600/80" />
              ) : (
                <Eye className="h-5 w-5 text-gray-600 hover:text-gray-600/80" />
              )}
            </button>
          </div>
          <Button isloading={isLoading} variant="tertiary" type="submit" className="w-full">
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
};
