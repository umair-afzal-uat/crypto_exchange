import axios from 'axios';
axios.defaults.baseURL = 'https://admin.crypto.exchange/api/admin';

const api = {
  auth: {
    login: body => axios.post('/login', body),
    confirmLogin: body => axios.put('/confirm_login', body),
    logout: () => axios.post(`/logout`),
    getAdminData: () => axios.get('/test1'),
  },
  user: {
    getUsers: (page = 1, body) =>
      axios.get(`/management/users?page=${page}&paginate=10&name=${body && body.name ? body.name: ""}&email=${body && body.email ? body.email : ""}&checkbox=${body && body.checkbox ? body.checkbox: false}`),
    deleteUser: userId => axios.delete(`/management/users/${userId}/delete`),
    blockUser: userId => axios.put(`/management/users/${userId}/block_switch`),
    addAddress: (userId, body) =>
      axios.put(`/management/users/${userId}/address/change`, body),
    getUser: userId => axios.get(`/management/users/${userId}`),
    sendEmailToAllWaitlistUsers: body => axios.post('/management/mass-email', body),
    deleteAllWaitListUsers: body => axios.post('/management/delete-queue-email', body),
  },
  waitList: {
    getWaitList: (page = 1) =>
      axios.get(`/management/queues?page=${page}&paginate=10&status=pending`),
    approveLoan: id => axios.put(`management/queues/${id}/queue_approve`),
    rejectLoan: (id, data) =>
      axios.put(`/management/queues/${id}/queue_reject`, data),
    setQueuedWaitList: data =>
      axios.put('management/loans_main_settings', data),
    getQueuedWaitList: () =>
      axios.get('/management/loans_main_settings/loan_queued'),
  },
  settings: {
    activateTwoFa: body => axios.post('/settings/2fa/enable', body),
    deactivateTwoFa: body => axios.post('/settings/2fa/disable', body),
    changePassword: body => axios.put('/settings/change_password', body),
    getSecretKey: () => axios.get('/settings/2fa/generate_secret_key'),
  },
  loans: {
    getLoans: (page = 1) =>
      axios.get(`/management/loans?page=${page}&paginate=10&status=active`),
    getLoansListAllUser: (userId) => axios.get(`/management/loans/user/${userId}/all`),
    getLoansListActiveUser: (userId) => axios.get(`/management/loans/user/${userId}/active`),
    getLoansListOldUser: (userId) => axios.get(`/management/loans/user/${userId}/old`),
  },
  fee: {
    getFee: () => axios.get(`/management/fee_settings`),
    changeFee: (id, body) => axios.put(`/management/fee_settings/${id}`, body),
    changeDownPayment: body =>
      axios.put(`/management/loans_main_settings`, body),
    searchPersons: body => axios.post(`/management/users/search`, body),
    addPersonToGroup: body => axios.put(`/management/referral/group`, body),
    setMainPercent: body =>
      axios.put(`/management/referral/main/edit_rate`, body),
    setGroupPercent: body =>
      axios.put(`/management/referral/group/edit_rate`, body),
    getGroupPercent: () => axios.get(`/management/referral/group`),
    getMainPercent: () => axios.get(`/management/referral/main`),
    postStatus: (data) => axios.post(`/management/referral/status`, data),
  },
  transactions: {
    getTransactions: (page = 1) =>
      axios.get(`/management/transactions?page=${page}&paginate=10`),
    confirmTransactions: body =>
      axios.put(`/management/transactions/approve`, body),
    rejectTransactions: body =>
      axios.put(`/management/transactions/reject`, body),
    changeTransaction: body =>
      axios.put(`/management/transactions/change`, body),
    getPaymentInfo: id =>
      axios.get(`/management/transactions/${id}`),
    editPaymentStatus: (body) =>
      axios.post(`/management/transactions/payment-status`, body),
    getMissedTransactions: () =>
      axios.get(`/management/transactions/missed/payments`),
    getLoanDetail: (id) =>
      axios.get(`/management/transactions/missed-loans/${id}`),
  },
  withdrawals: {
    getWithdrawals: (page = 1) =>
      axios.get(`/management/withdrawals?page=${page}&paginate=10`),
    confirmWithdrawals: id =>
      axios.post(`/management/withdrawals/${id}/accept`),
    rejectWithdrawals: (id, body) =>
      axios.post(`/management/withdrawals/${id}/reject`, body),
    editAHWithdrawals: (id, body) =>
      axios.put(`/management/withdrawals/${id}/edit`, body),
    editUpdateStaffName: (body) =>
      axios.post(`/management/withdrawals/staff-name`, body),
  },
  referrals: {
    getReferrals: (page = 1) =>
      axios.get(`/management/referrals?page=${page}&paginate=10`),
  },
  hotWallet: {
    getHotWallet: (page = 1) =>
      axios.get(`/management/hot_wallet?page=${page}`),
    setHotWallets: body =>
      axios.put(`/management/hot_wallet/withdraw_limits`, body),
  },
  faq: {
    getFaqs: (page = 1) =>
      axios.get(`/management/faqs?page=${page}&paginate=10`),
    addFaq: body => axios.post(`/management/faqs/addfaq`, body), 



  },
};

export default api;
