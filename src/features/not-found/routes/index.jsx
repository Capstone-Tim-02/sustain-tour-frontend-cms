import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

import notFoundImage from '@/assets/images/not-found.png';

export const NotFoundRoute = () => {
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-wrap-reverse items-center gap-5 rounded-lg bg-[#E1E1E1]/[40%] p-10 md:flex-nowrap">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 font-sans">
              <h1 className="text-xl font-bold md:text-3xl ">Ooops...</h1>
              <h2 className="text-sm font-medium md:text-base">
                Maaf, halaman yang Anda cari tidak dapat ditemukan.
              </h2>
              <p className="font-sans text-xs font-light md:text-sm">
                Ups! Sepertinya Anda tersesat di hutan yang belum dijelajahi. Kami tengah melakukan
                perbaikan. Kembali ke beranda Destimate atau mulai petualangan baru.
              </p>
            </div>
            <Link
              to="/"
              className="flex w-32 items-center justify-center rounded-md bg-primary-80 p-3 font-sans text-sm font-normal text-white hover:bg-primary-40"
            >
              <span>Kembali</span>
              <ChevronRightIcon className="ml-3 h-5 w-5" />
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src={notFoundImage}
              alt="not-found"
              className="sm:3/4 h-5/6 w-11/12 sm:h-3/4 md:h-full md:w-[550px] lg:ml-6 lg:block lg:w-[620px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
