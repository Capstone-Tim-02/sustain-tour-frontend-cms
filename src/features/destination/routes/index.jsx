import { Link, useNavigate } from 'react-router-dom';

import { Breadcrumb } from '@/components/Elements';
import { ContentLayout } from '@/components/Layouts';

import { AddDestination } from '../components/AddDestination';
import { DestinationList } from '../components/DestinationList';
import { EditDestination } from '../components/EditDestinations'

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
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Data Destinasi</h1>
          </div>
        </div>
        <DestinationList />
      </div>
    </ContentLayout>
  );
};

export const AddDestinationRoute = () => {
  const navigate = useNavigate();
  return (
    <ContentLayout title="Tambah Destinasi">
      <div className="justify-between sm:flex">
        <Breadcrumb>
          <Link to="/destinasi">
            <span className="px-2 text-sm font-semibold text-gray-700">Destinasi</span>
          </Link>
          <span className="px-2 text-sm font-semibold text-primary-100">Tambah Destinasi</span>
        </Breadcrumb>
      </div>

      <div className="mt-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Tambah Destinasi</h1>
          </div>
        </div>
      </div>
      <AddDestination onSuccess={() => navigate('/destinasi', { replace: true })} />
    </ContentLayout>
  );
};

export const EditDestinationRoute = () => {
  const navigate = useNavigate();
  return (
    <ContentLayout title="Edit Destinasi">
      <div className="justify-between sm:flex">
        <Breadcrumb>
          <Link to="/destinasi">
            <span className="px-2 text-sm font-semibold text-gray-700">Destinasi</span>
          </Link>
          <span className="px-2 text-sm font-semibold text-primary-100">Edit Destinasi</span>
        </Breadcrumb>
      </div>

      <div className="mt-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Edit Destinasi</h1>
          </div>
        </div>
      </div>
      <EditDestination onSuccess={() => navigate('/destinasi', { replace: true })} />
    </ContentLayout>
  );
};
