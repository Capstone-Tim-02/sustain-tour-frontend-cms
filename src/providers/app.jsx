import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import clsx from 'clsx';

import store from '@/stores';

export const AppProvider = ({ children }) => {
  const contextClassToast = {
    success: 'bg-success-600',
    error: 'bg-error-600',
    info: 'bg-blue-600',
    warning: 'bg-warning-400',
    default: 'bg-primary-100',
  };

  return (
    <HelmetProvider>
      <ToastContainer
        autoClose={2000}
        toastClassName={({ type }) =>
          clsx(
            'relative flex p-2 mb-3 rounded-md justify-between overflow-hidden cursor-pointer',
            contextClassToast[type]
          )
        }
        bodyClassName={() => 'text-sm font-white font-medium flex p-3'}
        theme="colored"
      />
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    </HelmetProvider>
  );
};
