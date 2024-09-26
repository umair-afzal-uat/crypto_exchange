import Link from "next/link";
const NawMenuItem = ({ title, link }) => {
  return (
    <li className="main-nav__item">
      <Link href={link}>
        <a className="main-nav__link">{title}</a>
      </Link>
    </li>
  );
};
export default NawMenuItem;
