import avatar from '@/assets/images/avatar.png';
import { splitEmission } from '@/utils/format';

export const TopCarbonEmission = ({ topData }) => {
  return (
    <div className="w-full rounded-lg bg-white p-2.5 shadow ring-0">
      <h1 className="mb-6 text-lg font-bold text-blackDestimate-100">Top Emisi Karbon</h1>

      <div className="flex flex-col space-y-4">
        {topData?.data == null ? (
          <p className="text-center text-sm font-medium text-black">Tidak ada data</p>
        ) : (
          topData?.data?.map((item, index) => (
            <div className="flex w-full items-center space-x-[13px]" key={index}>
              {/* Number */}
              <p className="text-sm text-black">{index + 1}</p>

              {/* Image */}
              <img
                src={item?.user_profile || avatar}
                className="h-10 w-10 flex-none rounded-full object-cover"
                alt="avatar"
              />

              {/* Users */}
              <div className="flex grow flex-col justify-between sm:flex-row sm:items-center xl:gap-x-5">
                <div className="grow">
                  <p className="text-sm font-medium text-black">{item?.user_name || '-'}</p>
                  <p className="text-xs font-medium text-greyDestimate-100">
                    Total Pemesanan : {item?.purchassed || '-'}
                  </p>
                </div>
                <p className="mt-2 flex-none text-xs font-medium text-primary-100 sm:mt-0">
                  {splitEmission(item?.total_emition || '-')} CC
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
