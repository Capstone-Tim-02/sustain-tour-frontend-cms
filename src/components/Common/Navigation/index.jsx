import { BadgePercentIcon, LayoutDashboardIcon, UserCogIcon } from 'lucide-react';

import { CategoryIcon, CoinIcon, PaperIcon, RouteIcon, UsersIcon } from '@/components/Icons';

const sideNavigation = [
  { name: 'Overview', to: '/overview', icon: LayoutDashboardIcon },
  { name: 'Admin', to: '/admin', icon: UserCogIcon },
  { name: 'Pengguna', to: '/pengguna', icon: UsersIcon },
  { name: 'Kategori', to: '/kategori', icon: CategoryIcon },
  { name: 'Destinasi', to: '/destinasi', icon: RouteIcon },
  { name: 'Promo', to: '/promo', icon: BadgePercentIcon },
  { name: 'Transaksi', to: '/transaksi', icon: CoinIcon },
  { name: 'Syarat & Ketentuan', to: '/syarat_dan_ketentuan', icon: PaperIcon },
];

export { sideNavigation };
