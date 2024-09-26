import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  creditLimits: {
    loan_max_usd: 10000,
    loan_min_usd: 1000,
    loan_max_btc: 0.2428655,
  },
  periods: [],
  loansData: { btc: 0, loan_period_id: 0 },
  calcData: null,
  paymentSystems: null,
};
const paymentReducer = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setCreditLimit(state, action) {
      state.creditLimits = { ...state.creditLimits, ...action.payload };
    },
    setLoansData(state, action) {
      state.loansData = { ...state.loansData, ...action.payload };
    },
    setPeriod(state, action) {
      state.periods = action.payload;
    },
    clearDataPayment(state) {
      state.creditLimits = initialState.creditLimits;
    },
    getCalcData(state, action) {
      state.calcData = action.payload;
    },
    clearCalcData(state) {
      state.calcData = initialState.calcData;
    },
    getPaymentSystems(state, action) {
      state.paymentSystems = action.payload;
    },
  },
});

export default paymentReducer.reducer;
export const getStateCredit = (state) => state.payment;
export const {
  clearDataPayment,
  setCreditLimit,
  setPeriod,
  getCalcData,
  clearCalcData,
  setLoansData,
  getPaymentSystems,
} = paymentReducer.actions;
