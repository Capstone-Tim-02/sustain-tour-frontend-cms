import { Breadcrumb } from '@/components/Elements';
import { ContentLayout } from '@/components/Layouts';

import { AdminsList } from '../components/AdminsList';

export const Admins = () => {
  return (
    <ContentLayout title="Admin">
      <div className="justify-between sm:flex">
        <Breadcrumb>
          <span className="px-2 text-sm font-semibold text-primary-100">Admin</span>
        </Breadcrumb>
      </div>

      <div className="mt-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Data Admin</h1>
          </div>
        </div>
        <AdminsList />
      </div>
    </ContentLayout>
  );
};
