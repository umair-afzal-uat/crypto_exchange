import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    faqs: null
};
const faqReducer = createSlice({
    name: "faqs",
    initialState,
    reducers: {
        getFaqsData(state, action) {
            state.faqs = action.payload;
        }
    },
});
export default faqReducer.reducer;
export const getFaqsList = (state) => state.faqs;
export const { getFaqsData } = faqReducer.actions;