import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { Breadcrumb } from '@/components/Elements';
import { ContentLayout } from '@/components/Layouts';

import { AddPromo } from '../components/AddPromo';
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
        <div className="mb-5 flex items-center justify-between">
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
          <div className="mb-5 flex items-center justify-between">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Edit Promo</h1>
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-lg border border-gray-100 bg-white px-5 py-5 shadow sm:px-[58px] sm:py-[57.5px]">
          <EditPromo onSuccess={() => navigate('/promo', { replace: true })} />
        </div>
      </ContentLayout>
    </>
  );
};

export const AddPromoRoute = () => {
  const navigate = useNavigate();

  return (
    <>
      <ContentLayout title="Tambah Promo">
        <div className="justify-between sm:flex">
          <Breadcrumb>
            <Link to="/promo">
              <span className="px-2 text-sm font-semibold text-gray-700">Promo</span>
            </Link>
            <span className="px-2 text-sm font-semibold text-primary-100">Tambah Promo</span>
          </Breadcrumb>
        </div>

        <div className="mt-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Tambah Promo</h1>
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-lg border border-gray-100 bg-white px-5 py-5 shadow sm:px-[58px] sm:py-[57.5px]">
          <AddPromo onSuccess={() => navigate('/promo', { replace: true })} />
        </div>
      </ContentLayout>
    </>
  );
};
