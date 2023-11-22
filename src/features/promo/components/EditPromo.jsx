import { useState } from 'react';

import { EditIcon } from '@/components/Icons';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

export const EditPromo = ({ id }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog>
      <DialogTrigger onClick={() => setIsDialogOpen(!isDialogOpen)}>
        <EditIcon className="h-5 w-5 stroke-2 text-primary-100 hover:cursor-pointer hover:text-primary-100/70" />
      </DialogTrigger>
    </Dialog>
  );
};
