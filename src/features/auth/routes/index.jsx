import { AuthLayout } from '@/components/Layouts';

import { LoginForm } from '../components/LoginForm';

export const LoginRoute = () => {
  return (
    <AuthLayout title="Masuk">
      <div className="relative flex flex-1 flex-col justify-center px-4 pb-12 sm:px-6 lg:flex-none lg:px-20 lg:pb-0 xl:px-44">
        <div className="mx-auto w-full max-w-sm md:pt-5 lg:w-96">
          <h2 className="text-3xl font-semibold text-primary-100">Masuk</h2>
          <p className="mt-2 text-base font-normal text-gray-600">
            Selamat Datang! Masukkan info Anda
          </p>
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
};
