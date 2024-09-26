import CopyIcon from "../../Base/icon/CopyIcon";
import TableHeaderItem from "../../Base/Table/TableHeaderItem";
import AffiliateProgramList from "./AffiliateProgramList";
import AffiliateNotificationIcon from "../../Base/icon/AffiliateNotificationIcon";
import AffiliateNotificationCloseIcon from "../../Base/icon/AffiliateNotificationCloseIcon";
import AffiliateProgramIcon from "../../Base/icon/AffiliateProgramIcon";
import { useEffect, useState } from "react";
import { getDataUsers } from "../../AccountSettings/actions";
import { useDispatch, useSelector } from "react-redux";
import { getDataSettingUser } from "../../AccountSettings/slice";
import { getReferralListUser } from "./actions";
import { getReferralList } from "./slice";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import constants from "../../../services/constants";

const AffiliateProgram = () => {
  const [active, setActive] = useState(false);
  const [homeRout, setHomeRout] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector(getDataSettingUser);
  const { referral } = useSelector(getReferralList);
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get(constants.jwtToken)) {
      router.push("/logIn");
    }
  }, []);

  useEffect(() => {
    dispatch(getReferralListUser());
  }, []);

  useEffect(() => {
    if (window && window?.location && window?.location?.href) {
      setHomeRout(window.location.href.replace("affiliateProgram", ""));
    }
  }, []);

  useEffect(() => {
    dispatch(getDataUsers());
  }, []);
  useEffect(() => {
    if (!active) {
      return;
    }
    const timer = setTimeout(() => setActive(false), 1500);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <main className="main">
      {active && (
        <div className="push-notify">
          <div className="push-notify__img">
            <AffiliateNotificationIcon />
          </div>
          <span className="push-notify__text">
            After registration, the invited user will be added to the list of
            Referrals
          </span>
          <button
            onClick={() => setActive(false)}
            className="push-notify__close"
            type="button"
          >
            <AffiliateNotificationCloseIcon />
          </button>
        </div>
      )}

      <h3 className="section-title">
        <div className="section-title__icon">
          <AffiliateProgramIcon />
        </div>
        <span className="section-title__text">Affiliate Program</span>
      </h3>
      <div className="main__content">
        <div
          className="content-block content-block--padding refferals-block"
          style={{
            backgroundImage: `url('images/content/refferal-bg.png')`,
          }}
        >
          <div className="content-block__inside refferals-block__wrap">
            <div className="content-block__main content-block__main--padding">
              <div className="refferals-link">
                <span className="refferals-link__text">
                  {homeRout && user
                    ? `${homeRout}signUp?referral=${user?.invite_key}`
                    : ""}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      homeRout && user
                        ? `${homeRout}signUp?referral=${user?.invite_key}`
                        : ""
                    );
                    setActive(true);
                  }}
                  className="refferals-link__btn"
                  type="button"
                >
                  <CopyIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
        {referral?.length > 0 && (
          <div className="content-block content-block--padding">
            <div className="content-block__inside">
              <div className="content-block__main content-block__main--padding">
                <div className="content-block__header content-block__header--border-none">
                  <h3 className="content-block__title content-block__title--medium">
                    My Referrals
                  </h3>
                </div>
                <div className="content-block__main content-block__main--padding">
                  <div className="table-block">
                    <div className="table-wrapper">
                      <table className="table">
                        <thead className="table-header">
                          <tr className="tr">
                            <TableHeaderItem title="Users" />
                            <TableHeaderItem title="Advanced Amount" />
                            <TableHeaderItem title="Commission (2.5%)" />
                            {/* <TableHeaderItem title="Start Credit Date" /> */}
                            <TableHeaderItem title="Reward Date" />
                          </tr>
                        </thead>
                        <tbody className="table-body">
                          {referral?.map((e) => (
                            <AffiliateProgramList key={e.id} data={e} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default AffiliateProgram;
