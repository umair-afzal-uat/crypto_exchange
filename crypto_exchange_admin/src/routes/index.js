import { lazy } from 'react';
const routes = {
  Auth: {
    path: `/`,
    component: lazy(() => import('../pages/LogIn')),
  },
  UserManagement: {
    path: '/user_management',
    component: lazy(() => import('../pages/User')),
  },
  WaitList: {
    path: '/wait_list',
    component: lazy(() => import('../pages/Waitlist')),
  },
  TransactionsManagement: {
    path: '/transactions_management',
    component: lazy(() => import('../pages/Transactions')),
  },
  LoansManagement: {
    path: '/loans_management',
    component: lazy(() => import('../pages/Loans')),
  },
  WithdrawalsManagement: {
    path: '/withdrawals_management',
    component: lazy(() => import('../pages/Withdrawals')),
  },
  FeeManagement: {
    path: '/fee_management',
    component: lazy(() => import('../pages/Fee')),
  },
  Settings: {
    path: '/settings',
    component: lazy(() => import('../pages/Settings')),
  },
  ReferralManagement: {
    path: '/referral_management',
    component: lazy(() => import('../pages/Referral')),
  },
  HotWallets: {
    path: '/hot_wallets',
    component: lazy(() => import('../pages/HotWallets')),
  },
  CompleteProfile: {
    path: '/user_management/complete_profile/:slug',
    component: lazy(() => import('../pages/User/CompleteProfile')),
  },
  LoanInfo: {
    path: '/user_management/loan_info/:slug',
    component: lazy(() => import('../pages/User/LoanInfo')),
  },
  Payments: {
    path: '/user_management/payment_info/:slug',
    component: lazy(() => import('../pages/User/Payments')),
  },
  Payments2: {
    path: '/user_management/payment_info2/:slug',
    component: lazy(() => import('../pages/User/Payments2')),
  },
  Faqs: {
    path: '/Faqs',
    component: lazy(() => import('../pages/Faqs')),
  },
  MissedPayments: {
    path: '/missed-payment',
    component: lazy(() => import('../pages/MissedPayments')),
  },
  LoanDetail: {
    path: '/loan-detail/:id',
    component: lazy(() => import('../pages/MissedPayments/LoanDetail.jsx')),
  },
};

export default routes;
