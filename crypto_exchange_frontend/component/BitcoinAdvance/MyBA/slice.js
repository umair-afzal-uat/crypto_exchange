import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loansData: {
    loans: [],
    total_value: 0,
    balance: 0,
    paid_total: 0,
    credit_limit: {
      loan_max_usd: 0,
      loan_max_btc: 0,
    },
    loaned_total: {
      btc: 0,
      usd: 0,
    },
    next_payment: null,
    next_payment_amount: 0,
    next_payment_date: null,
  },
  loansDisplayAmount: null,
  loansListAll: null,
  loansListActive: null,
  loansLisOld: null,
  loansDetail: null,
  transactionHistory: null,
  withdrawalHistory: null,
};
const loansReducer = createSlice({
  name: "loans",
  initialState,
  reducers: {
    getDashboardLoansData(state, action) {
      state.loansData = action.payload;
    },
    getLoansListAll(state, action) {
      state.loansListAll = action.payload;
    },
    getLoansListActive(state, action) {
      state.loansListActive = action.payload;
    },
    getLoansListOld(state, action) {
      state.loansLisOld = action.payload;
    },
    getLoansDetail(state, action) {
      state.loansDetail = action.payload;
    },
    getTransactionHistory(state, action) {
      state.transactionHistory = action.payload;
    },
    getWithdrawalsHistory(state, action) {
      state.withdrawalHistory = action.payload;
    },
    setLoansDisplayAmount(state, action) {
      state.loansDisplayAmount = action.payload;
    },
    clearLoansDisplayAmount(state) {
      state.loansDisplayAmount = initialState.loansDisplayAmount;
    },
    clearLoansList(state) {
      state.loansListAll = initialState.loansListAll;
      state.loansListActive = initialState.loansListActive;
      state.loansLisOld = initialState.loansLisOld;
      state.loansData = initialState.loansData;
      state.transactionHistory = initialState.transactionHistory;
    },
  },
});

export default loansReducer.reducer;
export const getLoansData = (state) => state.loans;
export const {
  getDashboardLoansData,
  getLoansListAll,
  getLoansListActive,
  getLoansListOld,
  getLoansDetail,
  getTransactionHistory,
  getWithdrawalsHistory,
  setLoansDisplayAmount,
  clearLoansList,
} = loansReducer.actions;
