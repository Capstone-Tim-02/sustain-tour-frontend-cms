import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const ButtonAddPromo = () => {
  return (
    <Button className="w-full gap-2 sm:w-auto">
      Tambah Promo
      <PlusIcon className="mr-2 h-4 w-4 bg-primary-80" />
    </Button>
  );
};
