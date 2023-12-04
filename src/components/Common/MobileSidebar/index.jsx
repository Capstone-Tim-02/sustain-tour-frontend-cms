import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { XIcon } from 'lucide-react';

import avatar from '@/assets/images/avatar.png';
import { Logo, sideNavigation, SignOut } from '@/components/Common';
import {
  fetchGetCurrentUser,
  selectCurrentUser,
  toggleFetchLatestCurrentUser,
} from '@/stores/CurrentUserSlice';
import { clearQuery } from '@/stores/ReactTableSlice';

export const MobileSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const currentSelector = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSelector?.shouldFetchCurrentUser) {
      dispatch(fetchGetCurrentUser());
      dispatch(toggleFetchLatestCurrentUser());
    }
    dispatch(fetchGetCurrentUser());
  }, [dispatch, currentSelector?.shouldFetchCurrentUser]);

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                    <XIcon className="h-6 w-6 text-white" />
                  </button>
                </div>
              </Transition.Child>

              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col overflow-y-auto bg-white pb-2">
                <div className="flex shrink-0 items-center px-4 pt-4">
                  <Logo onClick={() => setSidebarOpen(false)}>
                    <div className="ml-3 w-full font-heading text-lg font-bold text-gray-600">
                      Destimate
                    </div>
                  </Logo>
                </div>

                {/* Navigation */}
                <div className="mt-5 flex flex-grow flex-col overflow-y-auto scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full">
                  <nav className="flex-1 space-y-1 py-2">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 mr-0 space-y-1">
                          {sideNavigation.map((item) => (
                            <li key={item.name}>
                              <NavLink
                                to={item.to}
                                onClick={() => dispatch(clearQuery())}
                                className={({ isActive }) =>
                                  clsx(
                                    isActive
                                      ? 'border-r-4 border-primary-100 bg-primary-10/20 font-semibold text-primary-100'
                                      : 'font-medium text-gray-600 hover:bg-primary-10/20 hover:text-primary-60',
                                    'group flex gap-x-3 p-2 pl-6 text-sm leading-6'
                                  )
                                }
                              >
                                <item.icon className="h-6 w-6 shrink-0" />
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>

                {/* SignOut */}
                <div className="mx-4 flex items-center justify-between border-t border-gray-300 pb-2 pt-4">
                  <img
                    className="inline-block h-12 w-12 rounded-full object-cover"
                    src={currentSelector?.data?.photoProfil || avatar}
                    alt="avatar"
                  />

                  <div className="ml-2 mr-1 flex w-44 grow flex-col">
                    <div className="truncate text-sm font-semibold text-gray-900">
                      {currentSelector?.data?.name || (
                        <div className="mb-2 flex h-3 w-40 animate-pulse rounded-full bg-gray-300" />
                      )}
                    </div>
                    <div className="truncate text-sm text-gray-500">
                      {currentSelector?.data?.email || (
                        <div className="flex h-3 w-40 animate-pulse rounded-full bg-gray-300" />
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <SignOut />
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
