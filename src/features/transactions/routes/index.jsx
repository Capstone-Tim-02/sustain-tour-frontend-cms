import { Breadcrumb } from '@/components/Elements';
import { ContentLayout } from '@/components/Layouts';

import { TransactionsList } from '../components/TransactionsList';

export const Transactions = () => {
  return (
    <ContentLayout title="Pengguna">
      <div className="justify-between sm:flex">
        <Breadcrumb>
          <span className="px-2 text-sm font-semibold text-primary-100">Transaksi</span>
        </Breadcrumb>
      </div>

      <div className="mt-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl">Data Transaksi</h1>
          </div>
        </div>
        <TransactionsList />
      </div>
    </ContentLayout>
  );
};
