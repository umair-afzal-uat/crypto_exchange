import SignUp from "../../component/Auth/SignUp/SignUp";
import AuthLayout from "../../component/Layout/AuthLayout/AuthLayout";
import { withTranslation } from "/services/i18n";

const SingUpPage = () => {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
};

export default withTranslation(["common"])(SingUpPage);
