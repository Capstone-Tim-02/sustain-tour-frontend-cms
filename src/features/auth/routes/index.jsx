import { AuthLayout } from '@/components/Layouts';

import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  return (
    <AuthLayout title="Masuk">
      <div className="relative flex flex-1 flex-col justify-center px-4 pb-12 sm:px-6 lg:flex-none lg:px-20 lg:pb-0 xl:px-44">
        <div className="absolute mx-auto hidden md:top-2 md:block lg:top-10">
          <img className="-ml-1 mb-12 h-auto w-40" src="/logo-3.png" alt="DESTIMATE" />
        </div>
        <div className="mx-auto w-full max-w-sm md:pt-5 lg:w-96">
          <div>
            <img
              className="-ml-1 mb-16 h-auto w-40 rounded-lg md:hidden"
              src="/logo-3.png"
              alt="DESTIMATE"
            />
            <h2 className="text-3xl font-semibold text-primary-100">Masuk</h2>
            <p className="mt-2 text-base font-normal text-gray-600">
              Selamat Datang! Masukkan info Anda
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
};
