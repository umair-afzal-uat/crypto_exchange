import Link from "next/link";

const AuthFooter = ({ t }) => {
  return (
    <footer className="footer-copy">
      <Link href="/privacyPolicy">
        <a className="policy-link">{t("layout.policy")}</a>
      </Link>
      <span className="copy-text">{t("layout.copy")}</span>
    </footer>
  );
};

export default AuthFooter;
