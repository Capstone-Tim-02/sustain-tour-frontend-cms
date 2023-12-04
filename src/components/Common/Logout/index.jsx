import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon } from 'lucide-react';

import { APIAuth } from '@/apis/APIAuth';
import { Spinner } from '@/components/Elements';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const SignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    try {
      setIsLoading(true);
      APIAuth.signOut();
      navigate('/login');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <LogOutIcon className="h-5 w-5 text-gray-500 hover:text-primary-100" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Keluar</AlertDialogTitle>
          <AlertDialogDescription>Apakah kamu yakin ingin Keluar?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            className="bg-primary-80 hover:bg-primary-80/80"
            onClick={() => handleSignOut()}
          >
            {isLoading && <Spinner size="sm" className="mr-3" />}
            Keluar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
