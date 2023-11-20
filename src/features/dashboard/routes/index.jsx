import { useEffect, useState } from 'react';

import { APIDashboard } from '@/apis/APIDashboard';
import avatar from '@/assets/images/avatar.png';
import { Breadcrumb, Spinner } from '@/components/Elements';
import { DateRangePickerField } from '@/components/Forms';
import { ContentLayout } from '@/components/Layouts';
import { splitEmission } from '@/utils/format';

import { BarChart } from '../components/BarChart';
import { Cards } from '../components/Cards';
import { DoughnutChart } from '../components/DoughnutChart';

export const Dashboard = () => {
  const [data, setData] = useState(null);

  const [topData, setTopData] = useState({
    topDestination: null,
    topEmission: null,
  });

  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    },
  ]);

  const handleChangeDataRange = (item) => {
    setDateRange(item);
  };

  const handleRemoveDate = () => {
    setDateRange([
      {
        startDate: null,
        endDate: null,
        key: 'selection',
      },
    ]);
  };

  useEffect(() => {
    const fetchData = async () => setData(await APIDashboard.getGraphics(dateRange[0]));

    fetchData();
  }, [dateRange]);

  useEffect(() => {
    const fetchTopData = async () => {
      const topDestination = await APIDashboard.getTopDestinations();
      const topEmission = await APIDashboard.getTopEmissionCarbon();

      setTopData({
        topDestination,
        topEmission,
      });
    };

    fetchTopData();
  }, []);

  return (
    <ContentLayout title="Dashboard">
      <div className="justify-between sm:flex">
        <Breadcrumb>
          <span className="px-2 text-sm font-semibold text-primary-100">Overview</span>
        </Breadcrumb>
      </div>

      <div className="mt-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Overview</h1>
          </div>
        </div>

        <div className="mb-4 flex justify-start">
          <div className="w-full md:max-w-fit">
            <DateRangePickerField
              id="date-range"
              name="date-range"
              placeholder="Select Date"
              value={dateRange}
              onChangeData={(item) => handleChangeDataRange(item)}
              remove={handleRemoveDate}
            />
          </div>
        </div>

        {data === null || topData === null ? (
          <div className="flex h-96 items-center justify-center">
            <Spinner size="lg" className="mx-auto mt-10" />
          </div>
        ) : (
          <>
            {/* Section 1 */}
            <Cards data={data} />

            {/* Section 2 */}
            <div className="mx-auto grid w-full grid-cols-1 gap-3 xl:grid-cols-9">
              {data && <BarChart data={data} />}
              <div className="xl:col-span-3 xl:col-start-7">
                {/* DoughnutChart */}
                {topData && <DoughnutChart topData={topData?.topDestination} />}

                {/* Top Emisi Carbon */}
                <div className="w-full rounded-lg bg-white shadow ring-0">
                  <h1 className="mb-[22px] px-3 pt-[15px] text-lg font-bold text-blackDestimate-100">
                    Top Emisi Karbon
                  </h1>
                  <div className="flex flex-col space-y-4 px-3 pb-[15px]">
                    {topData?.topEmission == null ? (
                      <p className="text-sm font-medium text-black">Tidak ada data</p>
                    ) : (
                      topData?.topEmission?.data?.map((item, index) => (
                        <div className="flex w-full items-center space-x-3" key={index}>
                          <img
                            src={item?.user_profile || avatar}
                            className="h-12 w-12 rounded-full object-cover"
                            alt="avatar"
                          />
                          <div className="flex grow flex-col justify-between sm:flex-row sm:items-center">
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-black">{item?.user_name}</p>
                              <p className="text-xs font-medium text-greyDestimate-100">
                                Total Booked : {item?.purchassed}
                              </p>
                            </div>
                            <p className="mt-2 text-xs font-medium text-primary-100">
                              {splitEmission(item?.total_emition)} CC
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Section 2 */}
      </div>
    </ContentLayout>
  );
};
