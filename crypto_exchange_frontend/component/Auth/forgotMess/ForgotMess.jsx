import { useDispatch } from "react-redux";
import { setStateLogin } from "../logIn/slice";
import BtnAuth from "../../Base/Btn/BtnAuth/BtnAuth";

const ForgotMess = () => {
  const dispatch = useDispatch();
  return (
    <div className="auth">
      <h1 className="auth__title">Reset Your Password</h1>
      <form className="form auth__form" action="">
        <p className="form__text">
          Soon you will receive an email of instructions on how to
          reset your password.
        </p>
        <BtnAuth
          title="Log In"
          onClick={() => dispatch(setStateLogin("login"))}
        />
      </form>
    </div>
  );
};
export default ForgotMess;
