import BaseLayout from "../component/Layout/BaseLayout/BaseLayout";
import Home from "../component/Home/Home";
import { withTranslation } from "/services/i18n";

const BasePage = ({ t }) => {
  return (
    <BaseLayout t={t}>
      <Home t={t} />
    </BaseLayout>
  );
};

export default withTranslation(["common", "homePage"])(BasePage);
