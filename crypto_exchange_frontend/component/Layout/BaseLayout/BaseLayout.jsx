import LandingHeader from "./Header/LandingHeader";
import LandingFooter from "./Footer/LandingFooter";
import Feedback from "../../Feedback/Feedback";
import { withTranslation } from "../../../services/i18n";

const BaseLayout = ({ t, children }) => {
  return (
    <>
      <LandingHeader t={t} />
      {/* <Feedback /> */}
      {children}
      <LandingFooter t={t} />
    </>
  );
};

export default withTranslation(["common"])(BaseLayout);
