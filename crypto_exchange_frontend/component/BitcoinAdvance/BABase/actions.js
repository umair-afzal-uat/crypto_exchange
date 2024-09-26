import api from "../../../services/api";
import {
  getCalcData,
  getPaymentSystems,
  setCreditLimit,
  setLoansData,
  setPeriod,
} from "./slice";
import { errorsMessage } from "../../../services/service";
import { handleModal } from "../../Base/Modal/slice";
import axios from "axios";
import Router from "next/router";
export const getLimit = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.users.creditLimits();
      if (status >= 200 && status < 300) {
        dispatch(setCreditLimit(data));
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};
export const getPeriod = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.users.getPeriods();
      if (status >= 200 && status < 300) {
        const period = data.map((e) =>
          e.period === 5
            ? {
                id: e.id,
                value: e.period,
                label: `${e.id} Payment (Due Week ${e.period})`,
              }
            : {
                id: e.id,
                value: e.period,
                label: `${e.id} Payments (Starts Week 5/Ends Week ${e.period})`,
              }
        );
        dispatch(setPeriod([{ value: null, label: "weeks" }, ...period]));
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};
export const getCalcDataUser = (dataCalc, id) => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.calcLoansUser(dataCalc);
      if (status >= 200 && status < 300) {
        dispatch(getCalcData(data));
        dispatch(setLoansData({ usd:data?.value_usd, btc: data?.value_btc, loan_period_id: id }));
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};
export const takeLoanUser = (dataLoan) => {
  return async (dispatch) => {
    try {
      const { status } = await api.loans.takeLoanUsers(dataLoan);
      if (status >= 200 && status < 300) {
        Router.push("/myWallet");
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};
export const takeLoanUserisQueued = (dataLoan) => {
  return async (dispatch) => {
    try {
      const { status } = await api.loans.takeLoanUsers(dataLoan);
      if (status >= 200 && status < 300) {
        dispatch(
          handleModal({
            modal: "WaitListSuccess",
            modalData: {},
          })
        );
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};
export const isQueuedUser = (dataLoan) => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.isQueued();
      if (status >= 200 && status < 300) {
        data?.loan_queued
          ? dispatch(
              handleModal({
                modal: "JoinWaitList",
                modalData: {
                  loansData: dataLoan,
                },
              })
            )
          : dispatch(takeLoanUser(dataLoan));
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};
export const getPaymentSystemsUser = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.getPaymentSystemsUsers();
      if (status >= 200 && status < 300) {
        dispatch(getPaymentSystems(data));
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};
