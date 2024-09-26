import axios from "axios";
import constants from "./constants";
axios.defaults.baseURL = constants.URL;
export default {
  signUp: {
    signUpUser: (data) => axios.post(`/register`, data),
  },
  logIn: {
    logInUser: (data) => axios.post(`/login`, data),
    logInConfirm: (data) => axios.put(`/login_confirmation`, data),
    emailConfirm: (data) => axios.put(`/email_confirmation`, data),
    getRefreshToken: () => axios.get(`/token/refresh`),
  },
  forgotPassword: {
    isConfirmPasswordUser: (data) => axios.post(`/password_reset`, data),
    confirmPasswordUsers: (data) => axios.put(`/password_reset`, data),
  },
  users: {
    getIsUserInfo: () => axios.get(``),
    logOutUsers: () => axios.post(`/logout`),
    creditLimits: () => axios.get(`/loan/credit_limit`),
    getPeriods: () => axios.get(`/loan/periods`),
    enable2fa: (data) => axios.post(`/settings/2fa/enable`, data),
    disable2fa: (data) => axios.post(`/settings/2fa/disable`, data),
    generateSecretKey2fa: () => axios.get(`/settings/2fa/generate_secret_key`),
  },
  settings: {
    changePasswordUsers: (data) => axios.put(`/settings/change_password`, data),
    changeDataUsers: (data) => axios.put(`/settings/change_data`, data),
    changeEmailUsers: (data) => axios.post(`/settings/change_email`, data),
    referralList: () => axios.get(`/referrals`),
  },
  loans: {
    isQueued: () => axios.get(`/loan_queued`),
    calcLoansUser: (data) => axios.post(`/loan/calc`, data),
    takeLoanUsers: (data) => axios.post(`/loan/take_loan`, data),
    getDisplayAmountUsers: (data) => axios.post(`/loan/pay/calc`, data),
    getLoansUser: () => axios.get(`/dashboard`),
    getLoansListAllUser: () => axios.get(`/loans/all`),
    getLoansListActiveUser: () => axios.get(`/loans/active`),
    getLoansListOldUser: () => axios.get(`/loans/old`),
    getPaymentSystemsUsers: () => axios.get(`/loan/payment_systems`),
    getLoansDetailUser: (data) => axios.get(`/loan/details/${data}`),
    getTransactionHistoryUsers: (page = 1, data) =>
      axios.post(`/payments?page=${page}&per_page=10`, data),
    getWithdrawalsHistoryUsers: (page = 1, data) =>
      axios.post(`/withdrawals?page=${page}&per_page=10`, data),
    payLoanUser: (data) => axios.post(`/loan/pay`, data),
    withdrawalUser: (data) => axios.post(`/withdrawal`, data),
    deferPayment: (data) => axios.post(`/loan/defer-payment/${data}`),
    deletePayement:(data)=> axios.post(`/myWallet/${data}`)
  },
  contactUs: {
    sendEmail: (data) => axios.post(`/callback`, data),
  },
  faq: {
    getFaqs: () =>
      axios.get(`/faqs`)
  },

};
