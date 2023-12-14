import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import avatar from '@/assets/images/avatar.png';
import { Logo, sideNavigation, SignOut } from '@/components/Common';
import {
  fetchGetCurrentUser,
  selectCurrentUser,
  toggleFetchLatestCurrentUser,
} from '@/stores/ui-slice';
import { clearQuery } from '@/stores/ui-slice';

export const SidebarNavigation = () => {
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
    <>
      {/* Static sidebar for desktop */}
      <div className="-ml-[280px] flex w-[281px] shrink-0 flex-col border border-gray-200 bg-white shadow-lg lg:static lg:-ml-0">
        {/* Logo */}
        <div className="flex shrink-0 items-center border-r border-gray-200 bg-white pb-5 pl-5 pt-6">
          <Logo>
            <div className="ml-3 w-full font-heading text-lg font-bold text-gray-600">
              Destimate
            </div>
          </Logo>
        </div>

        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white pr-2 scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full">
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
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
                            'group flex gap-x-3 p-2 pl-6 text-base leading-6'
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

        <div className="flex items-center justify-between border-r border-gray-200 bg-white px-4 py-6">
          <img
            className="inline-block h-12 w-12 flex-none rounded-full object-cover"
            src={currentSelector?.data?.photoProfil || avatar}
            alt="avatar"
          />

          <div className="ml-2 mr-1 flex w-44 grow flex-col">
            <div className="truncate text-sm font-medium text-gray-900">
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
    </>
  );
};
