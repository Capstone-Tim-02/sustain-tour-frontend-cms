import { BadgePercentIcon, LayoutDashboardIcon } from 'lucide-react';

import {
  CategoryIcon,
  CoinIcon,
  PaperIcon,
  RouteIcon,
  TicketIcon,
  UsersIcon,
} from '@/components/Icons';

const sideNavigation = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboardIcon },
  { name: 'Pengguna', to: '/users', icon: UsersIcon },
  { name: 'Kategori', to: '/category', icon: CategoryIcon },
  { name: 'Destinasi', to: '/destinations', icon: RouteIcon },
  { name: 'Promo', to: '/promo', icon: BadgePercentIcon },
  { name: 'Tiket', to: '/ticket', icon: TicketIcon },
  { name: 'Transaksi', to: '/transactions', icon: CoinIcon },
  { name: 'Syarat & Ketentuan', to: '/terms_and_condition', icon: PaperIcon },
];

export { sideNavigation };
