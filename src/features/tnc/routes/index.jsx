import { Link, useNavigate } from 'react-router-dom';

import { Breadcrumb } from '@/components/Elements';
import { ContentLayout } from '@/components/Layouts';

import { EditTnc } from '../components/EditTnc';
import { TncList } from '../components/TncList';

export const TncRoute = () => {
  return (
    <ContentLayout title="Syarat & Ketentuan">
      <div className="justify-between sm:flex">
        <Breadcrumb>
          <span className="px-2 text-sm font-semibold text-primary-100">Syarat & Ketentuan</span>
        </Breadcrumb>
      </div>

      <div className="mt-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">
              Data Syarat & Ketentuan
            </h1>
          </div>
        </div>
        <TncList />
      </div>
    </ContentLayout>
  );
};

export const EditTncRoute = () => {
  const navigate = useNavigate();
  return (
    <ContentLayout title="Edit Syarat & Ketentuan">
      <div className="justify-between sm:flex">
        <Breadcrumb>
          <Link to="/syarat_dan_ketentuan">
            <span className="px-2 text-sm font-semibold text-gray-700">Syarat & Ketentuan</span>
          </Link>
          <span className="px-2 text-sm font-semibold text-primary-100">
            Edit Syarat & Ketentuan
          </span>
        </Breadcrumb>
      </div>

      <div className="mt-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">
              Edit Syarat & Ketentuan
            </h1>
          </div>
        </div>
        <div className="mt-8 rounded-lg border border-gray-100 bg-white px-5 py-5 sm:px-[58px] sm:py-[57.5px]">
          <EditTnc onSuccess={() => navigate('/syarat_dan_ketentuan', { replace: true })} />
        </div>
      </div>
    </ContentLayout>
  );
};
