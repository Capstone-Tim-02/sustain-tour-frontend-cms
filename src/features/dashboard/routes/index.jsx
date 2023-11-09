import { Breadcrumb } from '@/components/Elements';
import { ContentLayout } from '@/components/Layouts';

export const Dashboard = () => {
  return (
    <ContentLayout title="Dashboard">
      <div className="justify-between sm:flex">
        <Breadcrumb>
          <span className="px-2 text-sm font-semibold text-primary-100">Overview</span>
        </Breadcrumb>
      </div>

      <div className="mt-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Dashboard</h1>
          </div>
        </div>
        {/* List */}
      </div>
    </ContentLayout>
  );
};
