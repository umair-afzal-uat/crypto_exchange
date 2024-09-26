import Feedback from "../../Feedback/Feedback";
import BAHeader from "./Header/BAHeader";
import BASidebar from "./Sidebar/BASidebar";
import { withTranslation } from "../../../services/i18n";

const BitcoinAdvanceLayout = ({ t, children }) => {
  return (
    <>
      <BAHeader t={t} />
      <div className="main-section">
        <BASidebar t={t} />
        {/* <Feedback /> */}
        {children}
      </div>
    </>
  );
};

export default withTranslation(["common"])(BitcoinAdvanceLayout);
