import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

import unauthorized from '@/assets/images/unauthorized.png';
import { Button } from '@/components/ui/button';

export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-full px-5 md:px-20">
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-wrap-reverse items-center gap-5 rounded-lg bg-[#E1E1E1]/[40%] p-10 md:flex-nowrap">
          <div className="flex flex-col gap-5 md:gap-16">
            <div className="flex flex-col font-sans">
              <h1 className="mb-3 text-xl font-bold sm:mb-3 md:mb-[22px] md:text-2xl lg:text-3xl">
                Ooops...
              </h1>
              <h2 className="mb-4 text-xl font-bold sm:mb-4 md:mb-[22px] md:text-3xl lg:text-4xl">
                401 Unauthorized
              </h2>
              <h2 className="text-sm text-black md:text-lg">
                Ups! Sepertinya Anda tidak memiliki akses untuk melihat laman ini.
              </h2>
            </div>
            <Button
              onClick={() => navigate('/login')}
              className="flex w-32 items-center justify-center rounded-md bg-primary-80 p-3 font-sans text-sm font-normal text-white hover:bg-primary-40"
            >
              <span>Kembali</span>
              <ChevronRightIcon className="ml-3 h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-center">
            <img
              src={unauthorized}
              alt="unauthorized"
              className="w-7/12 sm:w-2/4 md:w-[420px] lg:ml-6 lg:w-[480px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
