import { Link, useParams } from 'react-router-dom';

import { Breadcrumb } from '@/components/Elements';
import { ContentLayout } from '@/components/Layouts';

import { AddPromo } from '../components/AddPromo'; // Import the AddPromo component

export const AddPromoRoute = () => {
  const { id } = useParams();
  return (
    <>
      <ContentLayout title="Add Promo">
        <div className="justify-between sm:flex">
          <Breadcrumb>
            <Link to="/promo">
              <span className="px-2 text-sm font-semibold text-gray-700">Promo</span>
            </Link>
            <span className="px-2 text-sm font-semibold text-primary-100">Add Promo</span>
          </Breadcrumb>
        </div>

        <div className="mt-6">
          <div className="mb-8 flex items-center justify-between">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Add Promo</h1>
            </div>
          </div>
        </div>
        <AddPromo />
      </ContentLayout>
    </>
  );
};
