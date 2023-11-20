import { Breadcrumb } from '@/components/Elements';
import { ContentLayout } from '@/components/Layouts';

import { PromoList } from '../components/PromoList';


export const Promo = () => {
  return (
    <ContentLayout title="Promo">
      <div className="justify-between sm:flex">
        <Breadcrumb>
          <span className="px-2 text-sm font-semibold text-primary-100">Promo</span>
        </Breadcrumb>
      </div>

      <div className="mt-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Kelola Data Promo</h1>
          </div>
        </div>
        <PromoList />
      </div>
    </ContentLayout>
  );
};
