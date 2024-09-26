import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  referral: [],
};

const referralReducer = createSlice({
  name: "referral",
  initialState,
  reducers: {
    getReferralData(state, action) {
      state.referral = action.payload;
    },
    clearReferralList(state) {
      state.calcData = initialState.calcData;
    },
  },
});

export default referralReducer.reducer;
export const getReferralList = (state) => state.referral;
export const { getReferralData, clearReferralList } = referralReducer.actions;
