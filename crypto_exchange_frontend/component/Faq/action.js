import api from "../../services/api";
import { getFaqsData } from '../../component/Faq/slice'
import { handleModal } from "../Base/Modal/slice";
import Router from "next/router";
import { errorsMessage, warningMessage } from "../../services/service";
export const getFaqs = () => {
    return async (dispatch) => {
        try {
            const { data, status } = await api.faq.getFaqs();
            if (status >= 200 && status < 300) {
                dispatch(getFaqsData(data));
            }
        } catch (error) {
            errorsMessage(error);
        }
    };
};