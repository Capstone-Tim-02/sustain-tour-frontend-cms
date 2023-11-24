import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const ButtonAddDestination = () => {
  return (
    <Button className="w-full gap-2 sm:w-auto">
      Tambah Destinasi
      <PlusIcon className="mr-2 h-4 w-4 bg-primary-80" />
    </Button>
  );
};
