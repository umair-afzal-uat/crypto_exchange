import { errorsMessage } from "../../services/service";
import api from "../../services/api";
import { handleModal } from "../Base/Modal/slice";
import notifications from "../Notifications/Notifications";

export const sendEmailUsers = (dataEmail) => {
  return async (dispatch) => {
    try {
      dispatch(handleModal({ modal: "Preloader", modalData: {} }));
      const { status } = await api.contactUs.sendEmail(dataEmail);
      if (status >= 200 && status < 300) {
        notifications(
          "success",
          "Success",
          "Your email has been successfully sent"
        );
      }
    } catch (error) {
      errorsMessage(error);
    } finally {
      dispatch(handleModal({ modal: "", modalData: {} }));
    }
  };
};
