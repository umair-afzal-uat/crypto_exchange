import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { setMenu } from "../../Header/slice";
import { useDispatch } from "react-redux";

const SideBarMenuItem = ({ title, icon, link, children, submenu = false }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Link href={link}>
      <li
        onClick={() => dispatch(setMenu(false))}
        className={classNames(
          "sidebar-nav__item",
          {
            active: router.route === link,
          },
          {
            active: router.route === "/myLoans" && submenu,
          }
        )}
      >
        <button type="button" className="sidebar-nav__link">
          <div className="sidebar-nav__icon">{icon}</div>
          <span className="sidebar-nav__text">{title}</span>
        </button>
        {router.route === "/myWallet" && children}
        {router.route === "/myLoans" && children}
      </li>
    </Link>
  );
};
export default SideBarMenuItem;
