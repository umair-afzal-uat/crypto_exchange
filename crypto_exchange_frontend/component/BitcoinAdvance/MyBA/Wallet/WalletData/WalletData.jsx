import GoToBackIcon from "../../../../Base/icon/GoToBackIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLoansData } from "../../slice";
import moment from "moment";
import { getDataUsers } from "../../../../AccountSettings/actions";
import { handleModal } from "../../../../Base/Modal/slice";
import { round } from "../../../../../services/service";
import { getDataSettingUser } from "../../../../AccountSettings/slice"
import Link from "next/link";
const WalletData = () => {
  const { user } = useSelector(getDataSettingUser);
  const { loansData } = useSelector(getLoansData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataUsers());
  }, []);
  return (
    <div className="content-block content-block--padding">
      <div className="content-block__inside">
        <div className="content-block__main content-block__main--padding wallet-info">
          <ul className="wallet-list">
            <WalletItem
              title="Total loaned"
              icon={<img src="images/content/wallet-icon5.svg" alt="" />}
              data={`${round(loansData?.loaned_total?.usd_show, 2)} USD`}
            />
            <WalletItem
              title="Total Value"
              icon={<img src="images/content/wallet-icon.svg" alt="" />}
              data={`${loansData?.loaned_total?.btc_show}  BTC`}
            />
           
          
            <WalletItem
              title="Credit limit"
              icon={<img src="images/content/wallet-icon4.svg" alt="" />}
              data={`${round(loansData?.loaned_total?.usd, 2)}$ / $${round(
                loansData?.credit_limit?.loan_max_usd,
                2
              )}`}
            />
            
            <WalletItem
              title="Available for withdrawal"
              icon={<img src="images/content/wallet-icon2.svg" alt="" />}
              data={`${round(loansData?.balance, 8)} BTC`}
            />
            {/* <WalletItem
              title="Next payment"
              icon={<img src="images/content/wallet-icon6.svg" alt="" />}
              data={
                loansData?.next_payment_date
                  ? `${moment(loansData?.next_payment_date).format(
                      "DD/MM/YYYY"
                    )} `
                  : ""
              }
            >
              <>
                <span className="wallet-item__desc wallet-item__desc--green">
                  {loansData?.next_payment_amount}$
                </span>
                <button
                  disabled={!loansData?.next_payment_id}
                  type="button"
                  onClick={() =>
                    dispatch(
                      handleModal({
                        modal: "PaymentMethod",
                        modalData: {
                          loan_id: loansData?.next_payment_id,
                          is_full: 0,
                        },
                      })
                    )
                  }
                  className="next-btn"
                >
                  <GoToBackIcon />
                </button>
              </>
            </WalletItem> */}
            <li className="wallet-item">
              <div className="wallet-item__img">
                <div className="wallet-item__icon"><img src="images/content/wallet-icon2.svg" alt="" /></div>
              </div>
              <div className="wallet-item__info">
                <span className="wallet-item__title">BTC Address</span>
                <span className="wallet-item__desc">
                <Link href={`https://www.blockchain.com/btc/address/${user.wallet_address}`}>
                  <a className="link link--green">{user.wallet_address}</a>
                </Link>
                </span>
              </div>
            </li>
             {/* <WalletItem
              title="BTC Address"
              icon={<img src="images/content/wallet-icon2.svg" alt="" />}
              data={user.wallet_address}
            /> */}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default WalletData;

const WalletItem = ({ title, icon, data, options, children }) => {
  return (
    <li className="wallet-item">
      <div className="wallet-item__img">
        <div className="wallet-item__icon">{icon}</div>
      </div>
      <div className="wallet-item__info">
        <span className="wallet-item__title">{title}</span>
        <span className="wallet-item__desc">
          {data}
          {children}
        </span>
      </div>
      {options}
    </li>
  );
};
