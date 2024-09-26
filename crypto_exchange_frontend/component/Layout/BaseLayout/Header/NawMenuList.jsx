import NawMenuItem from "./NawMenuItom";
const NawMenuList = ({ t }) => {
  return (
    <ul className="main-nav__list">
      <NawMenuItem title={t("layout.getBa")} link="/signUp" />
      <NawMenuItem title={t("layout.howItWorks")} link="/howItWorks" />
      <NawMenuItem title={t("layout.aboutUs")} link="/aboutUs" />
      <NawMenuItem title={t("layout.faq")} link="/faq" />
      <NawMenuItem title={t("layout.contactUs")} link="/contactUs" />
    </ul>
  );
};
export default NawMenuList;