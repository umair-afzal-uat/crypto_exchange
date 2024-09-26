import api from "../../../services/api";
import { store } from "react-notifications-component";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { handleModal } from "../../Base/Modal/slice";
import swal from 'sweetalert';
import { clearUser } from "./slice";
import signUpPopup from "./signUpPopup";
import { errorsMessage } from "../../../services/service";
export const singUpUsers = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch(handleModal({ modal: "Preloader", modalData: {} }));
      const { status } = await api.signUp.signUpUser(dataUser);
      if (status >= 200 && status < 300) {
        Router.push({pathname:`/logIn`});
        localStorage.removeItem("referral");
        swal({
          title: "Success!",
          text: "A verification link has been sent to your email account.  Check your spam folder in case message has been miscategorized.",
          icon: "success",
        })
      }
    } catch (error) {
      errorsMessage(error);
    } finally {
      dispatch(clearUser());
      dispatch(handleModal({ modal: "", modalData: {} }));
    }
  };
};
