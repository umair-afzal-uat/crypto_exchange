import api from "../../../services/api";
import { getReferralData } from "./slice";
import { errorsMessage } from "../../../services/service";

export const getReferralListUser = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await api.settings.referralList();
      if (status >= 200 && status < 300) {
        dispatch(getReferralData(data));
      }
    } catch (error) {
      errorsMessage(error);
    }
  };
};
