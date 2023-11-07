import { LogOutIcon } from 'lucide-react';

import { Button, ConfirmationDialog } from '@/components/Elements';

export const Logout = () => {
  return (
    <ConfirmationDialog
      icon="danger"
      title="Logout"
      body="Are you sure you want to logout?"
      triggerButton={
        <button
          type="button"
          className="mb-auto outline-none focus:ring-2 focus:ring-primary-60 focus:ring-offset-2"
        >
          <LogOutIcon className="h-5 w-5 text-gray-500 hover:text-primary-100" />
        </button>
      }
      confirmButton={<Button variant="danger">Logout</Button>}
    />
  );
};
