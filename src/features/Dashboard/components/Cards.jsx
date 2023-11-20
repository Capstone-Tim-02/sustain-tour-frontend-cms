import CountUp from 'react-countup';

import { ArrowDownLeftIcon, ArrowUpRightIcon, TotalUserIcon } from '@/components/Icons';

export const Cards = ({ data }) => {
  return (
    <div className="mb-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-[18px] lg:grid-cols-4">
      {/* Total Pengguna */}
      <div className="h-auto rounded-lg bg-white shadow-md sm:h-[170px]">
        <div className="flex items-center space-x-4 rounded-t-lg bg-[#8D8D8D] px-[17px] py-[13px]">
          <TotalUserIcon className="h-5 w-5 text-white" />
          <h2 className="truncate text-base font-bold text-white">Total Pengguna</h2>
        </div>
        <div className="grow flex-col justify-center px-[17px] py-8">
          <h2 className="truncate text-2xl font-bold text-blackDestimate-100">
            <CountUp start={0} end={data?.totalUserCount} duration={2} separator="." />
          </h2>
          <div className="flex items-center">
            <ArrowUpRightIcon className="h-2.5 w-2.5 flex-none text-greenDestimate-100" />
            <span className="ml-1 flex-none text-sm text-greenDestimate-100">10.5%</span>
            <span className="ml-2 truncate text-sm text-greyDestimate-100">+512 Hari Ini</span>
          </div>
        </div>
      </div>

      {/* Total Destinasi */}
      <div className="h-auto rounded-lg bg-white shadow-md sm:h-[170px]">
        <div className="flex items-center space-x-4 rounded-t-lg bg-primary-80 px-[17px] py-[13px]">
          <TotalUserIcon className="h-5 w-5 text-white" />
          <h2 className="truncate text-base font-bold text-white">Total Destinasi</h2>
        </div>
        <div className="grow flex-col justify-center px-[17px] py-8">
          <h2 className="truncate text-2xl font-bold text-blackDestimate-100">
            <CountUp start={0} end={data?.totalWisataCount} duration={2} separator="." />
          </h2>
          <div className="flex items-center">
            <ArrowUpRightIcon className="h-2.5 w-2.5 flex-none text-greenDestimate-100" />
            <span className="ml-1 flex-none text-sm text-greenDestimate-100">2%</span>
            <span className="ml-2 truncate text-sm text-greyDestimate-100">+12 Hari Ini</span>
          </div>
        </div>
      </div>

      {/* Total Pengunjung */}
      <div className="h-auto rounded-lg bg-white shadow-md sm:h-[170px]">
        <div className="flex items-center space-x-4 rounded-t-lg bg-greenDestimate-100 px-[17px] py-[13px]">
          <TotalUserIcon className="h-5 w-5 text-white" />
          <h2 className="truncate text-base font-bold text-white">Total Pengunjung</h2>
        </div>
        <div className="grow flex-col justify-center px-[17px] py-8">
          <h2 className="truncate text-2xl font-bold text-blackDestimate-100">
            <CountUp start={0} end={data?.totalVisitors} duration={2} separator="." />
          </h2>
          <div className="flex items-center">
            <ArrowUpRightIcon className="h-2.5 w-2.5 flex-none text-greenDestimate-100" />
            <span className="ml-1 flex-none text-sm text-greenDestimate-100">10.5%</span>
            <span className="ml-2 truncate text-sm text-greyDestimate-100">+512 Hari Ini</span>
          </div>
        </div>
      </div>

      {/* Total Pemesanan */}
      <div className="h-auto rounded-lg bg-white shadow-md sm:h-[170px]">
        <div className="flex items-center space-x-4 rounded-t-lg bg-redDestimate-200 px-[17px] py-[13px]">
          <TotalUserIcon className="h-5 w-5 text-white" />
          <h2 className="truncate text-base font-bold text-white">Total Pemesanan</h2>
        </div>
        <div className="grow flex-col justify-center px-[17px] py-8">
          <h2 className="truncate text-2xl font-bold text-blackDestimate-100">
            <CountUp start={0} end={data?.totalTicketPurchaseCount} duration={2} separator="." />
          </h2>
          <div className="flex items-center">
            <ArrowDownLeftIcon className="h-2.5 w-2.5 flex-none text-redDestimate-200" />
            <span className="ml-1 flex-none text-sm text-redDestimate-200">2.5%</span>
            <span className="ml-2 truncate text-sm text-greyDestimate-100">-364 Hari Ini</span>
          </div>
        </div>
      </div>
    </div>
  );
};
