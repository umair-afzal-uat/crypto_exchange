import Feedback from "../../Feedback/Feedback";
import AuthHeader from "./Header/AuthHeader";
import AuthFooter from "./Footer/AuthFooter";
import { withTranslation } from "../../../services/i18n";

const AuthLayout = ({ t, children }) => {
  return (
    <div className="auth-page">
      {/* <Feedback /> */}
      <AuthHeader t={t} />
      {children}
      <AuthFooter t={t} />
    </div>
  );
};

export default withTranslation(["common"])(AuthLayout);
