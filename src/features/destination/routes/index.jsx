import { Breadcrumb } from '@/components/Elements';
import { ContentLayout } from '@/components/Layouts';

import { DestinationList } from '../components/DestinationList';

export const Destination = () => {
  return (
    <ContentLayout title="Destinasi">
      <div className="justify-between sm:flex">
        <Breadcrumb>
          <span className="px-2 text-sm font-semibold text-primary-100">Destinasi</span>
        </Breadcrumb>
      </div>

      <div className="mt-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">
              Kelola Data Destinasi
            </h1>
          </div>
        </div>
        <DestinationList />
      </div>
    </ContentLayout>
  );
};
