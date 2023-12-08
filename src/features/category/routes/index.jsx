import { Breadcrumb } from '@/components/Elements';
import { ContentLayout } from '@/components/Layouts';

import { CategoryList } from '../components/CategoryList';

export const CategoryRoute = () => {
  return (
    <ContentLayout title="Kategori">
      <div className="justify-between sm:flex">
        <Breadcrumb>
          <span className="px-2 text-sm font-semibold text-primary-100">Kategori</span>
        </Breadcrumb>
      </div>

      <div className="mt-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Data Kategori</h1>
          </div>
        </div>
        <CategoryList />
      </div>
    </ContentLayout>
  );
};
