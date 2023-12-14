import { useEffect, useState } from 'react';

import { APIDashboard } from '@/apis';
import { Breadcrumb, Spinner } from '@/components/Elements';
import { DateRangePickerField } from '@/components/Forms';
import { ContentLayout } from '@/components/Layouts';

import { BarChart } from '../components/BarChart';
import { Card } from '../components/Card';
import { PopularDestination } from '../components/PopularDestination';
import { TopCarbonEmission } from '../components/TopCarbonEmission';

export const DashboardRoute = () => {
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
    const fetchData = async () => setData(await APIDashboard.getGraphic(dateRange[0]));

    fetchData();
  }, [dateRange]);

  useEffect(() => {
    const fetchTopData = async () => {
      const topDestination = await APIDashboard.getTopDestination();
      const topEmission = await APIDashboard.getTopEmissionCarbon();

      setTopData({
        topDestination,
        topEmission,
      });
    };

    fetchTopData();
  }, []);

  return (
    <ContentLayout title="Overview">
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
              placeholder="Pilih rentang tanggal"
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
            <Card data={data} />

            {/* Section 2 */}
            <div className="mx-auto grid w-full grid-cols-1 gap-3 xl:grid-cols-9">
              {data && <BarChart data={data} />}
              <div className="xl:col-span-3 xl:col-start-7">
                {/* Popular Destination */}
                {topData && <PopularDestination topData={topData?.topDestination} />}

                {/* Top Carbon Emission */}
                {topData && <TopCarbonEmission topData={topData?.topEmission} />}
              </div>
            </div>
          </>
        )}
      </div>
    </ContentLayout>
  );
};
