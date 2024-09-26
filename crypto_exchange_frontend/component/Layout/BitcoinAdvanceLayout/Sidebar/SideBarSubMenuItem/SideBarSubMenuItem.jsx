import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";

const SideBarSubMenuItem = ({ title, link }) => {
  const router = useRouter();
  return (
    <Link href={link}>
      <li
        className={classNames("sidebar-nav__subitem", {
          active: router.route === link,
        })}
      >
        <button type="button" className="sidebar-nav__sublink">
          {title}
        </button>
      </li>
    </Link>
  );
};
export default SideBarSubMenuItem;
