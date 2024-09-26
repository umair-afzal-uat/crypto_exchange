import api from "../../../services/api";
import {
  getDashboardLoansData,
  getLoansDetail,
  getLoansListActive,
  getLoansListAll,
  getLoansListOld,
  getTransactionHistory,
  setLoansDisplayAmount,
  getLoansData,
  getWithdrawalsHistory,
  deletePayement,
} from "./slice";
import { handleModal } from "../../Base/Modal/slice";
import Router from "next/router";
import swal from 'sweetalert';
import { errorsMessage, warningMessage } from "../../../services/service";

export const getLoansDataUser = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.getLoansUser();
      if (status >= 200 && status < 300) {
        dispatch(getDashboardLoansData(data));
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};

export const loanPayUser = (dataPay, method) => {
  return async (dispatch) => {
    try {
      dispatch(handleModal({ modal: "Preloader", modalData: {} }));
      const { data, status } = await api.loans.payLoanUser(dataPay);
      if (status >= 200 && status < 300) {
        dispatch(getLoansDataUser());
        if (
          method === "bank_transfer" ||
          method === "zelle" ||
          method === "cash_app"
        ) {
          // dispatch(handleModal({ modal: "Message", modalData: {} }));
          return;
        }
        if (method === "plisio") {
          dispatch(handleModal({ modal: "", modalData: {} }));
          Router.push(data?.url);
          return;
        }
        
        // alert(method);
        if (
          method != "cash_app"
        ) {
          Router.push(`/myWallet`);
          dispatch(handleModal({ modal: "", modalData: {} }));
        }

      }
    } catch (error) {
      const { response } = error;
      if (response?.status === 400) {
        if(response.data.errors[0] == "input_amount_is_higher_than_loan_left_amount"){
          dispatch(
            handleModal({
              modal: "ErrorAuth",
              modalData: { message: "Your first payment is being processed and your account will be updated shortly.  If you are seeing this and have not completed your first payment please contact customer service in the live chat for assistance." ,delay:10000},
            })
          );
        }else{
          dispatch(
            handleModal({
              modal: "ErrorAuth",
              modalData: { message: "You enter invalid data!" },
            })
          );
        }
        
        return;
      }
      errorsMessage(error);
    }
  };
};

export const getLoansListAllUser = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.getLoansListAllUser();
      if (status >= 200 && status < 300) {
        dispatch(getLoansListAll(data));
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};

export const getLoansListActiveUser = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.getLoansListActiveUser();
      if (status >= 200 && status < 300) {
        dispatch(getLoansListActive(data));
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};

export const getLoansListOldUser = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.getLoansListOldUser();
      if (status >= 200 && status < 300) {
        dispatch(getLoansListOld(data));
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};

export const getLoansDetailUser = (dataId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.getLoansDetailUser(dataId);
      if (status >= 200 && status < 300) {
        dispatch(getLoansDetail(data));
      }
    } catch (error) {
      dispatch(
        handleModal({
          modal: "ErrorAuth",
          modalData: { message: "Server error" },
        })
      );
    }
  };
};

export const getLoansDisplayAmount = (dataId) => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.getDisplayAmountUsers(dataId);
      if (status >= 200 && status < 300) {
        dispatch(setLoansDisplayAmount(data?.amount));
      }
    } catch (error) {
      dispatch(
        handleModal({
          modal: "ErrorAuth",
          modalData: { message: "Server error" },
        })
      );
    }
  };
};

export const getWithdrawalUser = (dataWithdrawal) => {
  const { address } = dataWithdrawal;
  return async (dispatch) => {
    try {
      const { status } = await api.loans.withdrawalUser(dataWithdrawal);
      if (status >= 200 && status < 300) {
        dispatch(handleModal({ modal: "WithdrawalSuccess", modalData: {} }));
      }
    } catch (error) {
      dispatch(
        handleModal({
          modal: "ErrorAuth",
          modalData: { message: "Not Enough money!", delay: 500000 },
        })
      );
    }
  };
};

export const getTransactionHistoryUser = (page, value, value_to) => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.getTransactionHistoryUsers(
        page,
        {
          search_data: {
            date: {
              value,
              value_to,
            },
          },
        }
      );
      if (status >= 200 && status < 300) {
        dispatch(getTransactionHistory(data));
      }
    } catch (error) {
      dispatch(
        handleModal({
          modal: "ErrorAuth",
          modalData: { message: "Server error, invalid data" },
        })
      );
    }
  };
};

export const getWithdrawalsHistoryUser = (page, value, value_to) => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.loans.getWithdrawalsHistoryUsers(
        page,
        {
          search_data: {
            date: {
              value,
              value_to,
            },
          },
        }
      );
      if (status >= 200 && status < 300) {
        dispatch(getWithdrawalsHistory(data));
      }
    } catch (error) {
      dispatch(
        handleModal({
          modal: "ErrorAuth",
          modalData: { message: "Server error, invalid data" },
        })
      );
    }
  };
};

export const deferPayment = (loan_id) => {
  return async (dispatch) => {
    try {
      const { data,status } = await api.loans.deferPayment(loan_id);
      if (status >= 200 && status < 300) {
        if(data.length == 0 ){
          warningMessage('Payment can not be defered');
        }
        else{
          dispatch(getDashboardLoansData(data));
          swal({
            title: "Payment Deferred",
            text: "Your payment has been deferred.  It is now due no later than your final payment date.  Thank you.",
            icon: "warning",
          })
        }
      }
    } catch (error) {
      errorsMessage(error);
    }
  }; 
}
  export const DeleteLoan = (id) => {
    return async (dispatch) => {
      try {
        const { data ,status} = await api.loans.deletePayement(id);
        if (status >= 200 && status < 300) {
          if(data.length == 0 ){
            warningMessage(' Server error');
          }
          else{
            dispatch(getDashboardLoansData(data));
            warningMessage('Loan Deleted');
          }
        }
      } catch (error) {
        errorsMessage(error);
      }
    }; 
  }
export const deferPaymentDetail = (loan_id) => {
  return async (dispatch) => {
    try {
      const { data,status } = await api.loans.deferPayment(loan_id);
      if (status >= 200 && status < 300) {
        if(data.length == 0 ){
          warningMessage('Payment can not be defered');
        }
        else{
          try {
            const { data, status } = await api.loans.getLoansDetailUser(loan_id);
            if (status >= 200 && status < 300) {
              dispatch(getLoansDetail(data));
            }
          } catch (error) {
            dispatch(
              handleModal({
                modal: "ErrorAuth",
                modalData: { message: "Server error" },
              })
            );
          }
          warningMessage('Payment defered');
        }
      }
    } catch (error) {
      errorsMessage(error);
    }
  }; 
}
