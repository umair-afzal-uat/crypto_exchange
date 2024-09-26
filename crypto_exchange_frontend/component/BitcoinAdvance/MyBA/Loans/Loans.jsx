import LoansList from "./LoansList";
import { useEffect, useState } from "react";
import classNames from "classnames";
import MyLoansIcon from "../../../Base/icon/MyLoansIcon";
import LoansEmpty from "./LoansEmpty";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getLoansData } from "../slice";
import Cookies from "js-cookie";
import constants from "../../../../services/constants";
import { getLoansListAllUser } from "../actions";
import { useRouter } from "next/router";const Loans = () => {
  const [active, setActive] = useState("all");
  const { loansListAll } = useSelector(getLoansData);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get(constants.jwtToken)) {
      router.push("/logIn");
    }
  }, []);
  useEffect(() => {
    if (Cookies.get(constants.jwtToken)) {
      dispatch(getLoansListAllUser());
    }
  }, []);
  return (
    <main className="main">
      <h3 className="section-title">
        <div className="section-title__icon">
          <MyLoansIcon />
        </div>
        <span className="section-title__text">My Loans</span>
      </h3>
      <div className="main__content">
        <div className="tabs">
          <div className="main__content-header">
            <ul className="tabs-nav">
              <li
                onClick={() => setActive("all")}
                className={classNames("tabs-nav__item", {
                  active: active === "all",
                })}
              >
                <button className="tabs-nav__btn">All</button>
              </li>
              <li
                onClick={() => setActive("active")}
                className={classNames("tabs-nav__item", {
                  active: active === "active",
                })}
              >
                <button className="tabs-nav__btn">Active</button>
              </li>
              <li
                onClick={() => setActive("archive")}
                className={classNames("tabs-nav__item", {
                  active: active === "archive",
                })}
              >
                <button className="tabs-nav__btn">Archive</button>
              </li>
            </ul>

            {loansListAll?.length ? null : (
              <Link href={"/bitcoinAdvance"}>
                <a className="button button--regular get-loan">Get loan</a>
              </Link>
            )}
          </div>
          <div className="tabs__content">
            {loansListAll?.length ? (
              <LoansList status={active} data={loansListAll} />
            ) : (
              <LoansEmpty />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Loans;