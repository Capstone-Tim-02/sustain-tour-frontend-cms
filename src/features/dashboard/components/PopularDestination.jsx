import noPicture1 from '@/assets/images/no-picture-1.png';
import { UserIcon } from '@/components/Icons';
import { convertNumberToThousand } from '@/utils/format';

export const PopularDestination = ({ topData }) => {
  return (
    <div className="mb-2.5">
      <div className="w-full rounded-lg bg-white p-2.5 shadow ring-0">
        <h1 className="mb-6 text-lg font-bold text-blackDestimate-100">Destinasi Terpopuler</h1>

        <div className="flex flex-col space-y-4">
          {topData?.data == null ? (
            <p className="text-center text-sm font-medium text-black">Tidak ada data</p>
          ) : (
            topData?.data?.map((item, index) => (
              <div className="flex w-full items-center space-x-4" key={index}>
                {/* Number */}
                <p className="text-sm text-black">{index + 1}</p>

                {/* Image */}
                <img
                  src={item?.photo_wisata1 || noPicture1}
                  className="h-12 w-12 flex-none rounded-sm object-cover"
                  alt="wisata"
                />

                {/* Destinations */}
                <div className="flex grow flex-col justify-between sm:flex-row sm:items-center xl:gap-x-5">
                  <div className="grow">
                    <p className="text-sm font-medium text-black">
                      {item?.destination_title || '-'}
                    </p>
                    <p className="text-xs font-medium text-greyDestimate-100">
                      {item?.kota || '-'}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-none items-center gap-x-1 sm:mt-0">
                    <UserIcon className="h-2 w-2 text-primary-100" />
                    <p className="text-xs font-medium text-primary-100">
                      {convertNumberToThousand(item?.total_ticket || '-')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
