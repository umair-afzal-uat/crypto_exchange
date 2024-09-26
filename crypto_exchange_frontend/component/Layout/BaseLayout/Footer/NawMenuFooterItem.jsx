import Link from "next/link";

const NawMenuFooterItem = ({ title, link }) => {
  return (
    <li className="footer-nav__item">
      <Link href={link}>
        <a className="footer-nav__link">{title}</a>
      </Link>
    </li>
  );
};
export default NawMenuFooterItem;
