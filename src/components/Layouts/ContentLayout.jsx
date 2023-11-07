import { useState } from 'react';
import { MenuIcon } from 'lucide-react';

import { Logo, SidebarNavigation } from '@/components/Common';
import { MobileSidebar } from '@/components/Common/MobileSidebar';
import { Head } from '@/components/Head';

export const ContentLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Head title={title} />
      <div className="relative flex h-screen overflow-hidden bg-[#EEEFF8]">
        {/* Mobile sidebar */}
        <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Sidebar Navigation for Desktop */}
        <SidebarNavigation />

        <div className="flex w-0 flex-1 flex-col">
          <div className="relative z-10 flex h-16 shrink-0 items-center justify-between bg-white px-5 shadow lg:hidden">
            {/* Logo */}
            <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
              <Logo>
                <h4 className="ml-3 font-heading text-lg font-bold text-gray-600">Destimate</h4>
              </Logo>
            </div>

            {/* Menu Icon */}
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Content */}
          <main className="relative flex-1 overflow-y-auto overflow-x-hidden focus:outline-none">
            <div className="pb-16 pt-6 sm:pt-8">
              <div className="max-w-full px-4 sm:px-6 md:ml-3 md:px-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
