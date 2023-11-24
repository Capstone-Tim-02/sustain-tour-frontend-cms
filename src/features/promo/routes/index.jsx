import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { Breadcrumb } from '@/components/Elements';
import { ContentLayout } from '@/components/Layouts';

import { EditPromo } from '../components/EditPromo';
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
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Data Promo</h1>
          </div>
        </div>
        <PromoList />
      </div>
    </ContentLayout>
  );
};

export const EditPromoRoute = () => {
  const navigate = useNavigate();

  return (
    <>
      <ContentLayout title="Edit Promo">
        <div className="justify-between sm:flex">
          <Breadcrumb>
            <Link to="/promo">
              <span className="px-2 text-sm font-semibold text-gray-700">Promo</span>
            </Link>
            <span className="px-2 text-sm font-semibold text-primary-100">Edit Promo</span>
          </Breadcrumb>
        </div>

        <div className="mt-6">
          <div className="mb-8 flex items-center justify-between">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Edit Promo</h1>
            </div>
          </div>
        </div>
        <EditPromo onSuccess={() => navigate('/promo', { replace: true })} />
      </ContentLayout>
    </>
  );
};
