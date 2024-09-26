import LogIn from "../../component/Auth/logIn/LogIn";
import ForgotPass from "../../component/Auth/ForgotPass/ForgotPass";
import ForgotMess from "../../component/Auth/forgotMess/ForgotMess";
import ChangePass from "../../component/Auth/ChangePass/ChangePass";
import AuthLayout from "../../component/Layout/AuthLayout/AuthLayout";
import { withTranslation } from "../../services/i18n";
import { useDispatch, useSelector } from "react-redux";
import { getLoginState, setStateLogin } from "../../component/Auth/logIn/slice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LogInPages = () => {
  const [resetToken, setResetToken] = useState(null);
  const { loginState } = useSelector(getLoginState);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (router?.query?.password_reset) {
      setResetToken(router?.query?.password_reset);
      dispatch(setStateLogin("changePass"));
    }
  }, [dispatch, router?.query?.password_reset]);

  return (
    <AuthLayout>
      {loginState === "login" && <LogIn />}
      {loginState === "forgotPass" && <ForgotPass />}
      {loginState === "forgotMess" && <ForgotMess />}
      {loginState === "changePass" && <ChangePass resetToken={resetToken} />}
    </AuthLayout>
  );
};

export default withTranslation(["common"])(LogInPages);
