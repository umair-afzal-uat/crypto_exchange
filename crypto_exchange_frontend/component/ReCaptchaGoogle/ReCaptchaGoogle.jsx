import ReCaptcha from "react-google-recaptcha";
import constants from "../../services/constants";

const ReCaptchaGoogle = ({ isToken }) => {
  return (
    <ReCaptcha
      sitekey={constants.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      onChange={(value) => isToken(value)}
    />
  );
};
export default ReCaptchaGoogle;
